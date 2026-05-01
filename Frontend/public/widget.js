(function () {
  // Find the script tag that loaded this script to extract attributes
  const currentScript =
    document.currentScript ||
    document.querySelector('script[id="support-desk-widget"]') ||
    document.querySelector('script[src*="widget.js"]');

  if (!currentScript) {
    console.error('[SupportDesk] Could not find the widget script tag.');
    return;
  }

  const apiKey = currentScript.getAttribute('data-api-key');

  if (!apiKey) {
    console.error('[SupportDesk] Missing data-api-key attribute on script tag.');
    return;
  }

  // Derive the base URL from the script source (e.g., http://localhost:5173)
  const scriptSrc = currentScript.src;
  const baseUrl = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

  // Create the main container
  const container = document.createElement('div');
  container.id = 'support-desk-widget-container';
  container.style.position = 'fixed';
  container.style.bottom = '20px';
  container.style.right = '20px';
  container.style.zIndex = '999999';
  container.style.display = 'flex';
  container.style.flexDirection = 'column';
  container.style.alignItems = 'flex-end';
  container.style.fontFamily = 'sans-serif';

  // Create the iframe
  const iframe = document.createElement('iframe');
  // Pass the API key to our react app
  iframe.src = `${baseUrl}/embed/chat?apiKey=${encodeURIComponent(apiKey)}`;
  iframe.style.border = 'none';
  iframe.style.width = '350px';
  iframe.style.height = '600px';
  iframe.style.maxHeight = 'calc(100vh - 100px)';
  iframe.style.backgroundColor = 'transparent';
  iframe.style.borderRadius = '12px';
  iframe.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
  iframe.style.display = 'none'; // Hidden by default
  iframe.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  iframe.style.opacity = '0';
  iframe.style.transform = 'translateY(10px) scale(0.95)';
  iframe.style.marginBottom = '16px';
  iframe.allow = 'autoplay';

  // Create the toggle button
  const button = document.createElement('button');
  button.style.width = '60px';
  button.style.height = '60px';
  button.style.borderRadius = '50%';
  button.style.backgroundColor = '#111111'; // Default color (React app could message us to change this)
  button.style.color = '#ffffff';
  button.style.border = 'none';
  button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  button.style.cursor = 'pointer';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.transition = 'transform 0.2s ease';

  // Basic SVG for chat bubble
  const chatIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

  button.innerHTML = chatIcon;

  // Toggle Logic
  let isOpen = false;
  button.addEventListener('click', () => {
    isOpen = !isOpen;
    
    // Notify the React app inside the iframe
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(JSON.stringify({ type: 'SUPPORT_DESK_TOGGLE', isOpen }), '*');
    }

    if (isOpen) {
      iframe.style.display = 'block';
      // Small timeout to allow display:block to apply before animating opacity
      setTimeout(() => {
        iframe.style.opacity = '1';
        iframe.style.transform = 'translateY(0) scale(1)';
      }, 10);
      button.innerHTML = closeIcon;
      button.style.transform = 'scale(0.9)';
      setTimeout(() => (button.style.transform = 'scale(1)'), 150);
    } else {
      iframe.style.opacity = '0';
      iframe.style.transform = 'translateY(10px) scale(0.95)';
      button.innerHTML = chatIcon;
      button.style.transform = 'scale(0.9)';
      setTimeout(() => {
        iframe.style.display = 'none';
        button.style.transform = 'scale(1)';
      }, 200);
    }
  });

  // Listen for messages from the React iframe (e.g., to change button color)
  window.addEventListener('message', (event) => {
    // Basic security check (should ideally match baseUrl)
    if (event.origin !== baseUrl) return;

    try {
      const data = JSON.parse(event.data);
      if (data.type === 'SUPPORT_DESK_CONFIG') {
        if (data.color) button.style.backgroundColor = data.color;
        
        // Handle positioning if sent by config
        if (data.position) {
            container.style.bottom = '20px';
            if (data.position.includes('left')) {
                container.style.right = 'auto';
                container.style.left = '20px';
                container.style.alignItems = 'flex-start';
            } else {
                container.style.right = '20px';
                container.style.left = 'auto';
                container.style.alignItems = 'flex-end';
            }
        }
      }
    } catch (e) {
      // Ignore non-JSON messages
    }
  });

  // Assemble
  container.appendChild(iframe);
  container.appendChild(button);
  document.body.appendChild(container);
})();
