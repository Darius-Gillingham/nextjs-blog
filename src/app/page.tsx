"use client"; // Ensure this is a client-side component

import { useState } from "react";
import { applets } from "./data/applets"; // Import the applets data
import Applet from "@/app/components/Applet"; // Assuming Applet is still used for displaying applet details

export default function Home() {
  const [content, setContent] = useState<string | null>(null);

  // Section categories
  const sections = [
    "Data Visualizations",
    "Games",
    "Tools",
    "Experience",
  ];

  return (
    <div>
      {/* Navigation */}

      {/* Section selection grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
        {sections.map((section) => (
          <div
            key={section}
            onClick={() => setContent(section)}
            className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer text-center text-white"
          >
            {section}
          </div>
        ))}
      </section>

      {/* Display content based on selection */}
      <section className="mt-8 p-6">
        {content ? (
          <div>
            <h2 className="text-2xl font-semibold">{content}</h2>
            {/* Display applets for the selected section */}
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
          <p className="text-center">Click on a section to view details.</p>
        )}
      </section>
    </div>
  );
}
