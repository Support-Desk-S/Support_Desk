# ⚡ SupportDesk — AI Customer Support Platform

> **🌐 Live App:** [https://support-desk-one-lilac.vercel.app/](https://support-desk-one-lilac.vercel.app/)

SupportDesk is a **multi-tenant, AI-powered customer support platform**. Companies (tenants) onboard onto the platform, create embeddable chat widgets for their websites, and let the AI automatically resolve customer queries using their knowledge base — only routing to human agents when necessary.

---

## ✨ What It Does

| Feature | Description |
|---|---|
| 🤖 **AI-First Support** | Mistral LLM + Pinecone vector search resolves queries automatically |
| 🎫 **Smart Ticketing** | Tickets created automatically, assigned to agents by load (< 5 tickets) |
| 🔌 **Embeddable Widget** | One `<script>` tag adds chat to any website |
| 🏢 **Multi-Tenant** | Fully isolated data — each company has its own workspace |
| 🔗 **API Integrations** | AI can call tenant's own APIs (e.g. order tracking) before escalating |
| 👥 **Agent Management** | Admins approve agents, manage roles, reassign tickets |
| 📚 **Knowledge Base** | Upload PDFs — the AI learns from them per tenant |

---

## 🏛️ High-Level Architecture

```mermaid
flowchart TB
    subgraph Tenants["Tenant Companies (Customers of SupportDesk)"]
        T1[Company A Website]
        T2[Company B Website]
    end

    subgraph Widget["Embeddable Widget"]
        W[widget.js\n+ iframe /embed/chat]
    end

    subgraph Frontend["Frontend — Vercel"]
        LP[Landing Page]
        DP[Dashboard]
        TK[Tickets]
        AG[Agents]
        WG[Widgets]
        AI[AI Context]
        CW[Chat Widget Page\n/embed/chat]
    end

    subgraph Backend["Backend — Express API"]
        Auth[Auth Routes]
        Admin[Admin Routes]
        PUB[Public Routes\nAPI Key Auth]
        AIR[AI Pipeline\nMistral LLM]
        TE[Tool Executor\nTenant APIs]
    end

    subgraph DBs["Databases"]
        MDB[(MongoDB\nUsers, Tickets,\nWidgets, Messages)]
        PC[(Pinecone\nVector DB\nKnowledge Base)]
    end

    T1 --> Widget
    T2 --> Widget
    Widget --> CW
    CW --> PUB
    PUB --> AIR
    AIR --> PC
    AIR --> TE
    TE --> T1
    Frontend --> Auth
    Frontend --> Admin
    Auth --> MDB
    Admin --> MDB
    AIR --> MDB
```

---

## 👤 User Roles & Permissions

```mermaid
flowchart TD
    A[User] --> B{Role}
    B --> C[Admin]
    B --> D[Agent]

    C --> C1[✅ Dashboard - stats + tickets]
    C --> C2[✅ All Tickets - view, assign, close]
    C --> C3[✅ Agents - approve + manage]
    C --> C4[✅ Widgets - create, configure, get API key]
    C --> C5[✅ AI Context - upload knowledge base docs]
    C --> C6[✅ Integrations - configure tenant APIs]

    D --> D1[✅ Dashboard - own ticket view]
    D --> D2[✅ Tickets - view, reply, resolve]
    D --> D3[❌ Agents - blocked]
    D --> D4[❌ Widgets - blocked]
    D --> D5[❌ AI Context - blocked]
```

---

## 🔄 Complete Customer Support Journey

This is the end-to-end flow from a customer typing a message to getting a resolution:

```mermaid
sequenceDiagram
    participant C as Customer (End User)
    participant W as Widget (iframe)
    participant API as Backend /api/public/chat
    participant AI as AI Pipeline
    participant Pinecone
    participant TE as Tool Executor
    participant ExtAPI as Tenant's Own API
    participant DB as MongoDB
    participant Agent as Human Agent

    C->>W: Types a message + email
    W->>API: POST /api/public/chat { apiKey, message, email }

    API->>API: Validate API key → resolve tenantId

    API->>AI: processCustomerMessage(message, email, tenantId)

    AI->>AI: Keyword Guard\n(track, status, refund etc.)
    AI->>AI: Intent Detection — GENERAL or PERSONAL?

    alt PERSONAL or action query
        AI->>TE: tryTenantAPIs(tenantId, message)
        TE->>TE: Ask Mistral: which tool to use?
        TE->>ExtAPI: Call tenant API endpoint
        ExtAPI-->>TE: API response data
        TE->>TE: Ask Mistral: summarize for customer
        TE-->>AI: {success: true, response: "friendly answer"}
        AI-->>C: ✅ Answered via Tenant API
    else GENERAL query
        AI->>AI: Extract keywords via Mistral
        AI->>Pinecone: Query vector DB (filter by tenantId)
        Pinecone-->>AI: Top 3 similar documents

        alt Score >= 0.65 (high confidence)
            AI->>AI: Generate answer using KB context
            AI-->>C: ✅ Answered from Knowledge Base
        else Not confident / no match
            AI->>TE: tryTenantAPIs as fallback
            alt API resolves it
                TE-->>AI: API answer
                AI-->>C: ✅ Answered via Tenant API
            else API can't help either
                AI->>DB: getAvailableAgent (tickets < 5)
                alt Agent available
                    AI->>DB: Create Ticket (status=assigned)
                    AI-->>C: "Connected you with [Agent Name]"
                    Agent->>C: Replies in ticket thread
                else No agent available
                    AI->>DB: Create Ticket (status=open)
                    AI-->>C: "Ticket #XYZ created, team notified"
                end
            end
        end
    end
```

---

## 🧰 Tenant Onboarding Flow

```mermaid
flowchart TD
    A[Admin visits /auth] --> B[Register new company]
    B --> C[POST /api/auth/tenant/register\nname, slug, email, password]
    C --> D[Tenant created in MongoDB]
    D --> E[Admin user created + auto-approved]
    E --> F[JWT cookie set]
    F --> G[Redirect to /:slug/dashboard]

    G --> H[Admin invites agents]
    H --> I[Agent registers at /auth\nwith tenantId]
    I --> J[Agent created with isApproved=false]
    J --> K[Admin approves in /agents page]
    K --> L[Agent can now log in]
```

---

## 📡 Monorepo Structure

```
Support_Desk/
├── Backend/            ← Node.js + Express REST API
│   ├── src/
│   │   ├── models/     ← MongoDB Mongoose schemas
│   │   ├── controllers/← Request handlers
│   │   ├── service/    ← Business logic (AI, auth, admin...)
│   │   ├── routes/     ← API route definitions
│   │   ├── middleware/  ← Auth, role checks
│   │   ├── dao/        ← DB query helpers
│   │   └── utils/      ← Helpers (encryption, embeddings, errors)
│   └── README.md       ← Backend documentation ← You are here
│
└── Frontend/           ← React + Vite SPA
    ├── public/
    │   └── widget.js   ← Embeddable script for 3rd-party sites
    ├── src/
    │   ├── app/        ← Root router + route guards
    │   ├── features/   ← Page-level feature modules
    │   ├── shared/     ← Reusable components + layout
    │   └── lib/        ← Axios instance
    └── README.md       ← Frontend documentation
```

---

## 🔐 Security Model

```mermaid
flowchart LR
    A[Every Request] --> B[CORS whitelist\nlocalhost + vercel app]

    subgraph Dashboard["Admin / Agent Dashboard"]
        B --> C[httpOnly JWT Cookie\nautomatically sent]
        C --> D[authMiddleware verifies JWT]
        D --> E{Role?}
        E --> F[admin → full access]
        E --> G[agent → limited access]
    end

    subgraph WidgetAPI["Widget / Customer Chat"]
        B --> H[data-api-key in request header]
        H --> I[Validated against ChatWidget.apiKey in DB]
        I --> J[Tenant resolved from widget]
        J --> K[AI pipeline runs per tenant]
    end

    subgraph DB["Data Isolation"]
        F & G --> L[Every query filtered by tenantId]
        K --> L
        L --> M[(MongoDB — fully isolated per tenant)]
    end
```

---

## 🌐 Deployment

| Layer | Platform | Details |
|---|---|---|
| **Frontend** | Vercel | Auto-deploys on push. `vercel.json` rewrites all routes to `index.html` for SPA |
| **Backend** | Any Node host (Railway / Render / VPS) | `npm run dev` via nodemon in development |
| **Database** | MongoDB Atlas | Cloud-hosted, connection via `MONGO_URI` env var |
| **Vector DB** | Pinecone | Serverless index, filtered by `tenantId` metadata |
| **LLM** | Mistral AI API | `mistral-large-latest` model |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Pinecone account (free tier works)
- Mistral AI API key

### 1. Clone & Install

```bash
git clone <your-repo-url>

# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 2. Configure Environment

**Backend `.env`:**
```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
MISTRAL_KEY=sk-...
PINECONE_API_KEY=...
PINECONE_INDEX=support-desk
ENCRYPTION_KEY=32_hex_chars...
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5000
```

### 3. Run

```bash
# Terminal 1 — Backend
cd Backend && npm run dev

# Terminal 2 — Frontend
cd Frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. First-Time Setup

1. Go to `/auth` → **Register new company**
2. Fill in company name, slug (e.g. `acme`), support email, admin password
3. You'll land on `/{slug}/dashboard`
4. Go to **Widgets** → Create a widget → Copy the API key
5. Go to **AI Context** → Upload a PDF with your company's FAQ
6. Embed the widget script on any HTML page and test it!

---

## 📎 Quick Links

- 📖 [Frontend README](./Frontend/README.md)
- ⚙️ [Backend README](./Backend/README.md)
- 🌐 [Live App](https://support-desk-one-lilac.vercel.app/)
