/* eslint-disable @next/next/no-img-element */
import React from "react";

interface ExperienceProps {
  title: string;
  imageSrc: string;
  description: string;
  contacts: string[];
}

const Experience: React.FC<ExperienceProps> = ({
  title,
  imageSrc,
  description,
  contacts,
}) => {
  // Ensure text is initialized properly and avoid undefined
  const safeTitle = title || "";
  const safeDescription = description || "";
  const safeContacts = contacts || [];

  // Split description into separate paragraphs at newlines
  const descriptionParagraphs = safeDescription.split('\n');

  return (
    <div className="experience">
      <div className="text-display mt-4">
        <h3 className="text-xl font-bold">{safeTitle}</h3>
        <img src={imageSrc} alt={title} className="rounded-lg mt-2" />
        
        <div className="mt-4">
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="contact-info mt-4">
          <h4>Contact Information:</h4>
          {safeContacts.map((contact, index) => (
            <p key={index}>{contact}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;

