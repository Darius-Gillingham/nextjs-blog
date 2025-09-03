"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { applets } from "./data/applets";
import chatbot from "./data/chatbot.json";
import Applet from "@/app/components/Applet";

type ChatEntry = {
  trigger: string;
  response: string;
};

export default function Home(): JSX.Element {
  const [content, setContent] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatLog, setChatLog] = useState<string[]>([]);

  const sections: string[] = [
    "Data Visualizations",
    "Games",
    "Tools",
    "Experience",
  ];

  const sendMessage = (): void => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim();
    setChatLog((prev) => [...prev, `You: ${userMessage}`]);

    const normalized = userMessage.toLowerCase();
    const match = (chatbot as ChatEntry[]).find((entry) =>
      normalized.includes(entry.trigger)
    );

    const aiResponse = match
      ? match.response
      : "I'm not sure how to answer that yet. Try asking something like 'what is this'.";

    setChatLog((prev) => [...prev, `AI: ${aiResponse}`]);
    setChatInput("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setChatInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      {/* Section selection */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
        {sections.map((section: string) => (
          <div
            key={section}
            onClick={() => setContent(section)}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer text-center text-white"
          >
            {section}
          </div>
        ))}
      </section>

      {/* Conditional rendering */}
      <section className="mt-8 p-6">
        {content ? (
          <div>
            <h2 className="text-2xl font-semibold">{content}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {applets[content as keyof typeof applets].map((applet, index) => (
                <Applet
                  key={index}
                  title={applet.title}
                  description={applet.description}
                  image={applet.image}
                  link={applet.link}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-center mb-4">
              Ask the Assistant
            </h2>
            <div className="bg-gray-900 text-white p-4 rounded-md h-64 overflow-y-auto shadow-inner mb-4">
              {chatLog.map((msg, i) => (
                <div key={i} className="mb-2 whitespace-pre-wrap">
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                className="flex-1 p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
