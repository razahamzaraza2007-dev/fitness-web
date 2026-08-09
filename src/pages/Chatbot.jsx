import React, { useState, useRef, useEffect } from 'react';
import './Dashboard.css';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "HAY! I'm your CrossArena AI Coach ⚡. How can I assist with your workouts or diet today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    const updatedMessages = [...messages, { sender: 'user', text: userMessage }];
    
    setInput('');
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("VITE_GEMINI_API_KEY is missing in your .env file!");
      }

      // Format full chat history for Gemini API (excluding initial system greet)
      const formattedContents = updatedMessages
        .slice(1)
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }],
        }));

      // Fixed endpoint to use gemini-1.5-flash
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            system_instruction: {
              parts: [
                {
                  text: 'You are the CrossArena AI Fitness Coach. You give short, high-energy, direct advice about CrossFit, weight training, nutrition, and recovery. Keep responses concise and structured.',
                },
              ],
            },
            contents: formattedContents,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || `API Request failed with status ${response.status}`);
      }

      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not process that request. Try again!';

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `⚠️ Error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content-wrapper" style={{ maxWidth: '800px' }}>
        
        <div className="dashboard-header">
          <div>
            <h1 className="header-title">
              CROSSARENA <span className="cyan-text">AI COACH</span> 🤖
            </h1>
            <p className="header-sub">Ask anything about your workouts, calories, or training plans.</p>
          </div>
        </div>

        {/* Chat Window Box */}
        <div
          className="flat-card"
          style={{
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Messages Area */}
          <div
            style={{
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              paddingRight: '10px',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  backgroundColor: msg.sender === 'user' ? '#00e5ff' : '#0c0d0e',
                  color: msg.sender === 'user' ? '#000000' : '#ffffff',
                  padding: '12px 18px',
                  borderRadius: '8px',
                  border: msg.sender === 'user' ? 'none' : '1px solid #232832',
                  fontWeight: msg.sender === 'user' ? '600' : 'normal',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  color: '#00e5ff',
                  fontStyle: 'italic',
                  fontSize: '0.9rem',
                }}
              >
                ⚡ AI Coach is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px',
              borderTop: '1px solid #232832',
              paddingTop: '15px',
            }}
          >
            <input
              type="text"
              placeholder="Ask Coach AI (e.g. Give me a chest workout)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: '#0c0d0e',
                border: '1px solid #232832',
                color: '#ffffff',
                padding: '12px 15px',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <button
              type="submit"
              className="btn-cyan-solid"
              disabled={loading}
              style={{ padding: '12px 20px', cursor: 'pointer' }}
            >
              SEND
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}