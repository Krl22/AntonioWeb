import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FaMoon,
  FaSun,
  FaTrash,
  FaDownload,
  FaMicrophone,
  FaMicrophoneSlash,
} from "react-icons/fa";

const ChatGPTClone = () => {
  const [messages, setMessages] = useState([]); // Stores chat history
  const [input, setInput] = useState(""); // User input
  const [isLoading, setIsLoading] = useState(false); // Loading state for bot response
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
  const [isListening, setIsListening] = useState(false); // Voice recognition toggle

  const chatRef = useRef(null); // Reference for auto-scrolling
  const recognitionRef = useRef(null); // Reference for speech recognition

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: updatedMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const clearChat = () => setMessages([]);

  const downloadChat = () => {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat_history.json";
    link.click();
  };

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-300">
        <h1 className="text-xl font-bold">ChatGPT Clone</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            onClick={clearChat}
            className="p-2 bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FaTrash />
          </button>
          <button
            onClick={downloadChat}
            className="p-2 bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <FaDownload />
          </button>
          <button
            onClick={toggleListening}
            className="p-2 bg-gray-200 rounded-full dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-gray-500">Typing...</div>
        )}
        <div ref={chatRef}></div>
      </main>

      {/* Input Area */}
      <footer className="flex items-center p-4 border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </footer>
    </div>
  );
};

export default ChatGPTClone;
