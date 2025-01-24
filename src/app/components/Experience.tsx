/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from "react";

interface ExperienceProps {
  title: string;
  imageSrc: string;
  description: string;
  contacts: string[];
}

const useTypewriter = (text: string, speed: number, reset: boolean) => {
  const [typedText, setTypedText] = useState('');
  const typingInterval = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);  // Track the current character index

  useEffect(() => {
    // Reset and clear previous typing state if reset is true
    if (reset) {
      setTypedText('');
      indexRef.current = 0; // Reset the index to start from the beginning
      if (typingInterval.current) {
        clearInterval(typingInterval.current);
      }
    }

    // If text is empty, stop typing
    if (!text) {
      return;
    }

    // Begin typing text if it's not already typing
    const startTyping = () => {
      typingInterval.current = setInterval(() => {
        setTypedText((prev) => prev + text[indexRef.current]);
        indexRef.current += 1;

        // Stop typing when text is fully typed
        if (indexRef.current === text.length) {
          clearInterval(typingInterval.current!);
        }
      }, speed);
    };

    startTyping();

    return () => {
      // Clean up interval on component unmount
      if (typingInterval.current) {
        clearInterval(typingInterval.current);
      }
    };
  }, [text, speed, reset]);

  return typedText;
};

const Experience: React.FC<ExperienceProps> = ({ title, imageSrc, description, contacts }) => {
  const [resetKey, setResetKey] = useState(false);

  // Trigger reset when text changes
  useEffect(() => {
    setResetKey((prev) => !prev); // Toggle reset on text changes
  }, [title, description, contacts]);

  // Ensure text is initialized properly and avoid undefined
  const safeTitle = title || '';
  const safeDescription = description || '';
  const safeContacts = contacts && contacts.length > 0 ? contacts.join(" | ") : '';

  // Apply typewriter effect with reset logic
  const typedTitle = useTypewriter(safeTitle, 100, resetKey);
  const typedDescription = useTypewriter(safeDescription, 120, resetKey);
  const typedContacts = useTypewriter(safeContacts, 150, resetKey);

  return (
    <div className="experience">
      {/* Display the full text above the typewriter effect */}
      <div className="text-display">
        <h3 className="text-xl font-bold">{safeTitle}</h3>
        <p>{safeDescription}</p>
        <div className="contact-info">
          <h4>Contact Information:</h4>
          <p>{safeContacts}</p>
        </div>
      </div>

      {/* Typewriter Effect */}
      <div className="typewriter-effect mt-4">
        <h3 className="text-xl font-bold">{typedTitle}</h3>
        <img src={imageSrc} alt={title} className="rounded-lg mt-2" />
        <p className="mt-4">{typedDescription}</p>
        <div className="contact-info mt-4">
          <h4>Contact Information:</h4>
          <p>{typedContacts}</p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
