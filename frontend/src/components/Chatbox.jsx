import React, { useState, useEffect } from 'react';
import { FiSend, FiMinus, FiX, FiLoader } from 'react-icons/fi';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios'; // Assuming axios is being used

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', isBot: true }
  ]);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 

  const toggleChat = () => {
    if (isOpen) {
      setTimeout(() => {
        setIsButtonVisible(true);
      }, 400);
    } else {
      setIsButtonVisible(false);
    }
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const fetchBotResponse = async (messages) => {
    try {
      const response = await fetch('http://localhost:8080/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return 'Sorry, I am having trouble right now.';
    }
  };

  const handleSendMessage = async () => {
    if (userMessage.trim() !== '') {
      const newMessages = [...messages, { text: userMessage, isBot: false }];
      setMessages(newMessages);
      setUserMessage('');

      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let botResponse = await fetchBotResponse(newMessages);

      botResponse = botResponse.replace(/->/g, '•');
      setIsLoading(false);
      setMessages([...newMessages, { text: botResponse, isBot: true }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');

        const config = {
          headers: {
            'x-auth-token': token,
          },
        };

        const res = await axios.get('http://localhost:5000/api/auth/profile', config);
        setUserData(res.data); 
        setLoading(false); 
      } catch (err) {
        console.error('Error fetching profile:', err);
        setLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const chatContainer = document.querySelector('.message-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (userData?.role === 'Patient') {
      setIsButtonVisible(true);
    } else {
      setIsButtonVisible(false);
    }
  }, [userData]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isButtonVisible && (
        <CSSTransition in={isButtonVisible} timeout={400} classNames="fade">
          <div
            className="w-16 h-16 bg-teal-500 hover:bg-teal-600 transition duration-500 ease-in-out rounded-full flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-105"
            onClick={toggleChat}
          >
            <span className="text-white font-bold text-2xl">+</span>
          </div>
        </CSSTransition>
      )}

      <CSSTransition in={isOpen} timeout={300} classNames="slide" unmountOnExit onExited={() => setIsButtonVisible(true)}>
        <div className="w-96 h-[30rem] bg-white rounded-lg shadow-xl flex flex-col transition-all duration-500 ease-in-out transform origin-bottom">
          <div className="bg-teal-700 p-4 flex justify-between items-center text-white rounded-t-lg">
            <span className="font-semibold text-lg">MediBot</span>
            <div className="flex space-x-2">
              <button onClick={toggleChat} className="hover:text-teal-300 transition-all">
                <FiMinus size={18} />
              </button>
              <button onClick={toggleChat} className="hover:text-teal-300 transition-all">
                <FiX size={18} />
              </button>
            </div>
          </div>

          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 message-container">
            <div className="flex flex-col space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isBot ? 'self-start' : 'self-end'} transition-opacity duration-500 opacity-0 animate-fadeIn`}
                >
                  <div
                    className={`p-3 rounded-lg shadow-md break-words max-w-xs ${
                      msg.isBot ? 'bg-gray-200' : 'bg-teal-500 text-white'
                    }`}
                    style={{ wordBreak: 'break-word' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="self-start flex items-center space-x-2 text-gray-500">
                  <FiLoader className="animate-spin-slow" size={20} />
                  <span>Medi is typing...</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center p-4 bg-gray-100 rounded-b-lg border-t border-gray-300">
            <input
              type="text"
              value={userMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-teal-500 text-white font-bold py-3 px-5 rounded-lg shadow-lg hover:bg-teal-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>
      </CSSTransition>

      <style jsx global>{`
        .slide-enter {
          opacity: 0;
          transform: translateY(100%);
        }
        .slide-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }
        .slide-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-exit-active {
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 300ms, transform 300ms;
        }

        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s forwards;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-spin-slow {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .break-words {
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
