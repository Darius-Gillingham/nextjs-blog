/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ensure this is a client-side component

import React, { useState } from "react";
import { applets } from "./data/applets"; // Import applets data
import dynamic from "next/dynamic"; // For dynamic component imports
import { experienceData } from "./data/experienceData"; // Import experience data
import "./globals.css";
import CoordinateForm from "./components/CoordinateForm";
import GraphVisualizer from "./components/GraphVisualizer";

// Map link values to dynamically imported components
const componentMap: Record<string, React.ComponentType<any>> = {
  Calculator: dynamic(() => import("@/app/components/Calculator")),
  TimeManager: dynamic(() => import("@/app/components/TimeManager")),
  Experience: dynamic(() => import("@/app/components/Experience")),
  CoordinateForm: dynamic(() => import("@/app/components/CoordinateForm")),
  GraphVisualizer: dynamic(() => import("@/app/components/GraphVisualizer")),
};

export default function Layout() {
  const [content, setContent] = useState<string | null>(null); // Track selected section
  const [appletComponent, setAppletComponent] = useState<React.ReactNode | null>(null);

  const sections = ["Data Visualizations", "Games", "Tools", "Experience"];

  const handleAppletClick = (link: string) => {
    console.log("Selected applet link:", link); // Debugging line
    
    if (content === "Experience") {
      const Component = componentMap["Experience"];
      if (Component) {
        const experience = experienceData[link as keyof typeof experienceData];
        if (experience) {
          setAppletComponent(
            <Component
              key={link}
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
      setAppletComponent(React.createElement(componentMap[link]));
    } else {
      console.error("Component not found for link:", link);
      setAppletComponent(null); // Reset if no valid link is found
    }
  };

  const resetContent = () => {
    setContent(null); // Reset content to null (welcome page)
    setAppletComponent(null); // Reset applet component
  };

  return (
    <html lang="en">
      <body className="antialiased bg-gray-900 text-white">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-gray-900 p-6 shadow-lg z-10 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-center">   Darius's Portfolio</h1>
          {/* Image-based button to reset content */}
          <button onClick={resetContent} className="ml-4 p-2 rounded-full hover:scale-105 transition-transform">
            <img
              src="/assets/HomeLogo.jpg"
              alt="Home"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
          </button>
        </header>
  
        {/* Section selection grid */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-10 mt-24">
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
            <div>
              <p className="text-center">
                Welcome. My name is Darius Gillingham, I'm a 3rd year computer
                science student at University of the Fraser. This is my portfolio
                website to showcase my projects built in a NextJS react framework.
                Above you can see a series of tabs that will bring you to data
                visualizations, games, tools, and my work experience.
              </p>
              {/* Add the images here */}
              <div className="mt-10 flex justify-center gap-6">
                <img
                  src="/assets/me1.jpg"
                  alt="Me 1"
                  className="rounded-lg shadow-lg w-1/3"
                />
                <img
                  src="/assets/me2.jpg"
                  alt="Me 2"
                  className="rounded-lg shadow-lg w-1/3"
                />
              </div>
            </div>
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
