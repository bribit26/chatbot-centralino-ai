import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, ChevronRight } from 'lucide-react';

const SUGGESTIONS = [
  "Quali sono le caratteristiche di AI-Voice?",
  "Che procedure si possono automatizzare?",
  "Quali sono i vantaggi per un'azienda?",
  "Come si integra con il CRM?"
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Ciao! Sono l\'assistente virtuale di AI-Voice. Come posso aiutarti a scoprire il nostro centralino con intelligenza artificiale oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('https://chatbot-centralino-ai.vercel.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.slice(-10) }) // Only send last 10 messages
      });

      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setMessages([...newMessages, { role: 'model', text: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { role: 'model', text: 'Scusa, si è verificato un errore di connessione. Riprova più tardi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <div className="ai-voice-widget-container">
      {/* Chat Window */}
      <div className={`ai-voice-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="ai-voice-header">
          <div className="ai-voice-header-info">
            <div className="ai-voice-avatar">
              <Bot size={24} color="#fff" />
            </div>
            <div>
              <h3 className="ai-voice-title">AI-Voice</h3>
              <p className="ai-voice-subtitle">Chiedimi qualsiasi cosa</p>
            </div>
          </div>
          <button className="ai-voice-close-btn" onClick={toggleChat} aria-label="Chiudi chat">
            <X size={20} />
          </button>
        </div>

        <div className="ai-voice-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`ai-voice-message-wrapper ${msg.role}`}>
              {msg.role === 'model' && (
                <div className="ai-voice-msg-avatar">
                  <Bot size={16} />
                </div>
              )}
              <div className={`ai-voice-message ${msg.role}`}>
                {/* Convert markdown links to HTML safely for basic CTA links */}
                <span dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                }} />
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="ai-voice-message-wrapper model">
              <div className="ai-voice-msg-avatar">
                <Bot size={16} />
              </div>
              <div className="ai-voice-message model typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions - only show if there are few messages */}
        {messages.length < 3 && !isLoading && (
          <div className="ai-voice-suggestions">
            <p className="ai-voice-suggestions-title">Puoi chiedermi:</p>
            <div className="ai-voice-suggestions-list">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button 
                  key={idx} 
                  className="ai-voice-suggestion-btn"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion} <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="ai-voice-input-area">
          <input
            type="text"
            className="ai-voice-input"
            placeholder="Scrivi qui il tuo messaggio..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
          />
          <button 
            className="ai-voice-send-btn" 
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Tooltip / Fumetto */}
      <div className={`ai-voice-tooltip ${isOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        Posso aiutarti? 👋
      </div>

      {/* Floating Button */}
      <button className={`ai-voice-fab ${isOpen ? 'active' : ''}`} onClick={toggleChat} aria-label="Apri chat">
        <div className="fab-icon-container">
          <Sparkles className="icon-sparkles" size={26} />
          <X className="icon-close" size={26} />
        </div>
      </button>
    </div>
  );
}
