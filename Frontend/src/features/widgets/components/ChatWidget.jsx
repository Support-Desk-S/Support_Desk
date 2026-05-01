import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, AlertCircle, RefreshCw, Loader2, Sparkles } from 'lucide-react';
import {
  getWidgetConfigApi,
  sendInitialMessageApi,
  sendFollowupMessageApi,
  getTicketMessagesApi,
  getCustomerTicketsApi
} from '../services/widgetApi';

const ChatWidget = ({ apiKey }) => {
  const [config, setConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [error, setError] = useState('');

  // Chat State
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  
  // Ticket State
  const [customerEmail, setCustomerEmail] = useState(() => localStorage.getItem('sd_widget_email') || '');
  const [emailPrompted, setEmailPrompted] = useState(false);
  const [ticketId, setTicketId] = useState(() => localStorage.getItem('sd_widget_ticket') || null);
  
  // Widget Visibility State
  const [isOpen, setIsOpen] = useState(false);

  // Tabs State
  const [activeTab, setActiveTab] = useState('current');
  const [previousTickets, setPreviousTickets] = useState([]);
  
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  // Initialize
  useEffect(() => {
    const init = async () => {
      try {
        const res = await getWidgetConfigApi(apiKey);
        const cfg = res.data.data;
        setConfig(cfg);
        
        // Notify parent iframe container of primary color
        window.parent.postMessage(
          JSON.stringify({ type: 'SUPPORT_DESK_CONFIG', color: cfg.primaryColor, position: cfg.position }),
          '*'
        );

        setMessages([
          { _id: 'welcome', sender: 'ai', message: cfg.welcomeMessage, createdAt: new Date().toISOString() }
        ]);
      } catch (err) {
        setError('Failed to load widget configuration. Invalid API Key.');
      } finally {
        setLoadingConfig(false);
      }
    };
    init();
  }, [apiKey]);

  // Scroll to bottom
  useEffect(() => {
    if (activeTab === 'current') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, emailPrompted, activeTab]);

  // Fetch previous tickets
  useEffect(() => {
    if (customerEmail && isOpen && apiKey) {
      getCustomerTicketsApi(apiKey, customerEmail).then((res) => {
        const tickets = res.data.data;
        setPreviousTickets(tickets);
        
        // Auto-clear resolved ticket if they just opened the widget
        // Wait, only do this if they haven't actively selected a resolved ticket to view.
        // Actually, let's just let the UI handle it (Show "Start New Chat" button if resolved)
      }).catch(err => console.error("Failed to fetch previous tickets", err));
    }
  }, [customerEmail, isOpen, apiKey]);

  // Listen for widget visibility toggle
  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'SUPPORT_DESK_TOGGLE') {
          setIsOpen(data.isOpen);
        }
      } catch (e) {
        // Ignore non-JSON messages
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Polling for ticket messages
  useEffect(() => {
    if (!ticketId || !config || !isOpen) return;

    const fetchMessages = async () => {
      try {
        const res = await getTicketMessagesApi(apiKey, ticketId);
        // Map messages (they might be more than we have locally)
        const msgs = res.data.data.messages || [];
        setMessages((prev) => {
          const prevWithoutWelcome = prev.filter(m => m._id !== 'welcome');
          
          if (msgs.length !== prevWithoutWelcome.length) {
            return [{ _id: 'welcome', sender: 'ai', message: config.welcomeMessage, createdAt: new Date().toISOString() }, ...msgs];
          }

          // Also check if the last message text is different or sender is different (catches optimistic UI updates resolving to real backend msgs)
          const lastMsg = msgs[msgs.length - 1];
          const lastPrevMsg = prevWithoutWelcome[prevWithoutWelcome.length - 1];
          if (lastMsg && lastPrevMsg && (lastMsg.sender !== lastPrevMsg.sender || lastMsg.message !== lastPrevMsg.message || lastMsg._id !== lastPrevMsg._id)) {
             return [{ _id: 'welcome', sender: 'ai', message: config.welcomeMessage, createdAt: new Date().toISOString() }, ...msgs];
          }

          return prev;
        });
      } catch (err) {
        console.error("Polling error", err);
      }
    };

    fetchMessages(); // Fetch immediately once
    pollRef.current = setInterval(fetchMessages, 5000);
    return () => clearInterval(pollRef.current);
  }, [ticketId, apiKey, config, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || sending) return;

    const text = input.trim();
    setInput('');
    
    // Optimistic UI
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { _id: tempId, sender: 'customer', message: text, createdAt: new Date().toISOString() }]);

    // Case 1: We don't have an email at all, prompt for it
    if (!customerEmail && !emailPrompted) {
      setEmailPrompted(true);
      setMessages(prev => [
        ...prev,
        { _id: 'email-prompt', sender: 'ai', message: 'Before I can help you with that, could you please provide your email address so we can reach you if we get disconnected?', createdAt: new Date().toISOString() }
      ]);
      sessionStorage.setItem('pendingQuery', text);
      return;
    }

    // Case 2: We are waiting for email input
    if (!customerEmail && emailPrompted) {
      if (!text.includes('@') || !text.includes('.')) {
        setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: 'That doesn\'t look like a valid email. Please try again.', createdAt: new Date().toISOString() }]);
        return;
      }
      setCustomerEmail(text);
      localStorage.setItem('sd_widget_email', text);
      setEmailPrompted(false);
      
      const pendingQuery = sessionStorage.getItem('pendingQuery') || text;
      sessionStorage.removeItem('pendingQuery');

      setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: 'Thanks! Let me check on that for you...', createdAt: new Date().toISOString() }]);
      
      try {
        setSending(true);
        const res = await sendInitialMessageApi(apiKey, { message: pendingQuery, customerEmail: text });
        const { isTicketCreated, ticketId: newTicketId, response } = res.data.data;
        
        setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: response, createdAt: new Date().toISOString() }]);

        if (isTicketCreated && newTicketId) {
          setTicketId(newTicketId);
          localStorage.setItem('sd_widget_ticket', newTicketId);
        }
      } catch (err) {
        setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: 'Sorry, we encountered an error processing your request. Please try again later.', createdAt: new Date().toISOString() }]);
      } finally {
        setSending(false);
      }
      return;
    }

    // Case 3: We have an email, but no ticket yet (New Chat)
    if (customerEmail && !ticketId) {
      setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: 'Let me check on that for you...', createdAt: new Date().toISOString() }]);
      try {
        setSending(true);
        const res = await sendInitialMessageApi(apiKey, { message: text, customerEmail });
        const { isTicketCreated, ticketId: newTicketId, response } = res.data.data;
        
        setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: response, createdAt: new Date().toISOString() }]);

        if (isTicketCreated && newTicketId) {
          setTicketId(newTicketId);
          localStorage.setItem('sd_widget_ticket', newTicketId);
        }
      } catch (err) {
        setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: 'Sorry, we encountered an error processing your request. Please try again later.', createdAt: new Date().toISOString() }]);
      } finally {
        setSending(false);
      }
      return;
    }

    // Case 4: Normal follow-up message if ticket is created
    if (ticketId) {
      try {
        setSending(true);
        await sendFollowupMessageApi(apiKey, ticketId, text);
        // Polling will pick it up, but we already optimistically added it
      } catch (err) {
        setMessages(prev => [...prev, { _id: Date.now().toString(), sender: 'ai', message: 'Failed to send message. Please try again.', createdAt: new Date().toISOString() }]);
      } finally {
        setSending(false);
      }
    }
  };

  if (loadingConfig) {
    return (
      <div className="flex h-full items-center justify-center bg-white rounded-xl shadow-2xl border border-gray-100">
        <Loader2 className="animate-spin text-gray-400" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-white p-6 rounded-xl shadow-2xl border border-gray-100 text-center gap-3">
        <AlertCircle size={40} className="text-red-400" />
        <p className="text-sm text-gray-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-xl overflow-hidden font-sans border border-gray-200">
      {/* Header */}
      <div 
        className="px-5 py-4 text-white shrink-0 shadow-sm"
        style={{ backgroundColor: config.primaryColor }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">{config.title || 'Chat Support'}</h2>
            <p className="text-xs opacity-90 mt-0.5">{config.subtitle || 'We typically reply in a few minutes'}</p>
          </div>
        </div>
        
        {/* Tabs */}
        {customerEmail && (
          <div className="flex gap-4 mt-3 text-sm font-medium border-b border-white/20">
            <button 
              onClick={() => setActiveTab('current')} 
              className={`pb-1 border-b-2 transition-colors ${activeTab === 'current' ? 'border-white text-white' : 'border-transparent text-white/70 hover:text-white'}`}
            >
              Current Chat
            </button>
            <button 
              onClick={() => setActiveTab('previous')} 
              className={`pb-1 border-b-2 transition-colors ${activeTab === 'previous' ? 'border-white text-white' : 'border-transparent text-white/70 hover:text-white'}`}
            >
              Previous Chats
            </button>
          </div>
        )}
      </div>

      {activeTab === 'current' ? (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-[#f9fafb] space-y-4">
            {messages.map((msg, idx) => {
          const isCustomer = msg.sender === 'customer';
          return (
            <div key={msg._id || idx} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'} gap-2`}>
              {!isCustomer && (
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-sm"
                  style={{ backgroundColor: msg.sender === 'ai' ? '#f3f4f6' : config.primaryColor, color: msg.sender === 'ai' ? config.primaryColor : '#fff' }}
                >
                  {msg.sender === 'ai' ? <Sparkles size={14} /> : <Bot size={14} />}
                </div>
              )}
              
              <div 
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
                  isCustomer 
                    ? 'rounded-tr-sm text-white' 
                    : 'rounded-tl-sm bg-white text-gray-800 border border-gray-100'
                }`}
                style={isCustomer ? { backgroundColor: config.primaryColor } : {}}
              >
                {msg.message.split('\n').map((line, i) => <p key={i} className="min-h-[14px]">{line}</p>)}
              </div>
            </div>
          );
        })}
          <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            {ticketId && previousTickets.find(t => t._id === ticketId)?.status === 'resolved' ? (
              <div className="text-center pb-2">
                <p className="text-xs text-gray-500 mb-2">This chat has been resolved.</p>
                <button
                  onClick={() => {
                    setTicketId(null);
                    localStorage.removeItem('sd_widget_ticket');
                    setMessages([
                      { _id: 'welcome', sender: 'ai', message: config?.welcomeMessage || 'How can I help you today?', createdAt: new Date().toISOString() }
                    ]);
                  }}
                  className="px-4 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full transition-colors"
                >
                  Start New Chat
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={emailPrompted && !customerEmail ? "Enter your email..." : "Type your message..."}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-[13.5px] focus:outline-none focus:border-gray-300 focus:bg-white transition-colors"
                  disabled={sending}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || sending}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-sm"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} className="ml-0.5" />}
                </button>
              </form>
            )}
            <div className="text-center mt-2">
               <a href="#" className="text-[10px] text-gray-400 hover:text-gray-500 transition-colors">Powered by SupportDesk</a>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 bg-[#f9fafb] space-y-3">
          {previousTickets.length === 0 ? (
            <div className="text-center text-sm text-gray-500 mt-10">No previous chats found.</div>
          ) : (
            previousTickets.map(ticket => (
              <div 
                key={ticket._id} 
                className={`bg-white p-3 rounded-lg border cursor-pointer hover:border-gray-300 transition-colors ${ticketId === ticket._id ? 'border-blue-400' : 'border-gray-200'}`}
                onClick={() => {
                  setTicketId(ticket._id);
                  localStorage.setItem('sd_widget_ticket', ticket._id);
                  setActiveTab('current');
                  
                  // Optimistically clear messages so they refetch for the new ticket
                  // Fetch will happen because ticketId changed and polling useEffect runs
                  setMessages([{ _id: 'welcome', sender: 'ai', message: config?.welcomeMessage || 'Loading...', createdAt: new Date().toISOString() }]);
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{ticket.subject || 'Support Ticket'}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 ${ticket.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
