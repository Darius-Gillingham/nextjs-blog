import React from "react";
import Image from "next/image";

type AppletProps = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const Applet: React.FC<AppletProps> = ({ title, description, image, link }) => {
  return (
    <div className="applet">
      <a href={link} className="applet-link">
        <div className="applet-content">
          <h2 className="applet-title">{title}</h2>
          <div className="applet-image">
            <Image src={image} alt={title} width={500} height={300} />
          </div>
          <p className="applet-description">{description}</p>
        </div>
      </a>
    </div>
  );
};

export default Applet;
