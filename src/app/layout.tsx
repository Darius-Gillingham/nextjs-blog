/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ensure this is a client-side component

import React, { useState } from "react";
import { applets } from "./data/applets"; // Import applets data
import dynamic from "next/dynamic"; // For dynamic component imports
import { experienceData } from "./data/experienceData"; // Import experience data
import "./globals.css";

// Map link values to dynamically imported components
const componentMap: Record<string, React.ComponentType<any>> = {
  Calculator: dynamic(() => import("@/app/components/Calculator")),
  TimeManager: dynamic(() => import("@/app/components/TimeManager")),
  Experience: dynamic(() => import("@/app/components/Experience")),
};

export default function Layout() {
  const [content, setContent] = useState<string | null>(null); // Track selected section
  const [appletComponent, setAppletComponent] = useState<React.ReactNode | null>(null);

  // Section categories
  const sections = ["Data Visualizations", "Games", "Tools", "Experience"];

  const handleAppletClick = (link: string) => {
    console.log("Selected applet link:", link); // Debugging line
  
    if (content === "Experience") {
      const Component = componentMap["Experience"];
      if (Component) {
        const experience = experienceData[link as keyof typeof experienceData];
        if (experience) {
          // Use link as a key to ensure the component remounts
          setAppletComponent(
            <Component
              key={link}  // Force remount of the Experience component on new selection
              title={experience.title}
              imageSrc={experience.imageSrc}
              description={experience.description}
              contacts={experience.contacts}
            />
          );
        } else {
          console.error("Experience data not found for link:", link);
        }
      } else {
        console.error("Component not found for Experience");
      }
    } else if (componentMap[link]) {
      setAppletComponent(React.createElement(componentMap[link])); // Render the component as JSX
    } else {
      console.error("Component not found for link:", link);
      setAppletComponent(null); // Reset if no valid link is found
    }
  };
  
  
  

  return (
    <html lang="en">
      <body className="antialiased bg-gray-900 text-white">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-gray-900 p-6 shadow-lg z-10">
          <h1 className="text-3xl font-bold text-center">Darius Portfolio</h1>
        </header>

        {/* Section selection grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20">
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

        {/* Dynamic Content Below Header */}
        <main className="pt-32 p-6">
          {content ? (
            <div>
              <h2 className="text-2xl font-semibold">{content}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
                {applets[content as keyof typeof applets].map((applet, index) => (
                  <div
                    key={index}
                    onClick={() => handleAppletClick(applet.link)}
                    className="bg-gray-700 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                  >
                    <h3 className="text-xl font-bold">{applet.title}</h3>
                    <p>{applet.description}</p>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={applet.image}
                      alt={applet.title}
                      className="rounded-lg mt-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center">Click on a section to view details.</p>
          )}

          {/* Render the selected applet component */}
          {appletComponent && (
            <section className="mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
              {appletComponent}
            </section>
          )}
        </main>
      </body>
    </html>
  );
}
