import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const ChatGPTVoice = () => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Voice recognition started");
      };
      recognition.onend = () => {
        if (isListening) {
          recognition.start();
          console.log("Restarting recognition");
        } else {
          setIsListening(false);
          console.log("Voice recognition stopped");
        }
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Transcript received:", transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [...messages, userMessage],
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
      speak(botMessage.content);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        console.log("Stopping recognition");
      } else {
        recognitionRef.current.start();
        console.log("Starting recognition");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleListening}
          className="p-4 bg-blue-500 text-white rounded-full"
        >
          {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>
      <div className="mt-4 w-full max-w-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded ${
              msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatGPTVoice;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const ChatGPTVoice = () => {
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        console.log("Voice recognition started");
      };
      recognition.onend = () => {
        setIsListening(false);
        console.log("Voice recognition stopped");
      };
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Transcript received:", transcript);
        handleSendMessage(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      alert("Speech recognition is not supported in this browser.");
    }
  }, []);

  const handleSendMessage = async (input) => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [...messages, userMessage],
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
      speak(botMessage.content);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        console.log("Stopping recognition");
      } else {
        recognitionRef.current.start();
        console.log("Starting recognition");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleListening}
          className="p-4 bg-blue-500 text-white rounded-full"
        >
          {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
        </button>
      </div>
      <div className="mt-4 w-full max-w-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded ${
              msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatGPTVoice;
