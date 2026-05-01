import React from 'react';
import { useSearchParams } from 'react-router';
import ChatWidget from '../components/ChatWidget';

const ChatWidgetPage = () => {
  const [searchParams] = useSearchParams();
  const apiKey = searchParams.get('apiKey');

  // We set h-screen w-screen to fill the iframe entirely.
  // The iframe itself is rounded and styled by the injected widget.js
  return (
    <div className="h-screen w-screen bg-transparent overflow-hidden">
      {apiKey ? (
        <ChatWidget apiKey={apiKey} />
      ) : (
        <div className="flex h-full items-center justify-center bg-white rounded-xl shadow-2xl border border-gray-100 p-6 text-center">
          <p className="text-sm text-gray-500">API Key is missing.</p>
        </div>
      )}
    </div>
  );
};

export default ChatWidgetPage;
