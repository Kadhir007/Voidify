import React from "react";
import { AiFillGithub } from "react-icons/ai";
import "./about.css";
import youtube from "../../asserts/youtube.png";

const About = () => {
  return (
    <div className="about">
      <div className="about-container">
        {/* <h1 className="about-heading">
          Disclaimer: Voidify - Music Player App
        </h1> */}
        <p className="about-para">
          Welcome to Voidify! Please note that Voidify does not condone or
          encourage any form of copyright infringement. The app has been
          developed solely for educational purposes to explore and learn about
          music player Web development.
          <br /> <br /> Remember, supporting artists and creators is vital for the
          continued growth and enrichment of the music industry. If you enjoy
          any songs played through Voidify, we encourage you to support the
          artists by legally obtaining their music through authorized platforms.
          <br />
          <span
            style={{
              fontStyle: "italic",
              display: "flex",
              color: "black",
              opacity: "0.3",
            }}
          >
            *happyVishal/jpg*
          </span>
        </p>
        <div
          className="button-container"
          style={{ display: "flex", marginLeft: "10px" }}
        >
          <button
            className="github"
            style={{ textAlign: "center", display: "flex" }}
            onClick={() =>
              window.open("https://github.com/Kadhir007/Voidify", "_blank")
            }
            
            
          >
            <AiFillGithub style={{ height: "21px", width: "21px" }} />
            <p style={{ paddingLeft: "5px" }}>source code</p>
          </button>
          <button
            className="github"
            style={{ textAlign: "center", display: "flex" }}
            onClick={() =>
              window.open("https://me-tube-kad.netlify.app/", "_blank")
            }
          >
            <img
              src={youtube}
              alt="youtube/png"
              style={{ width: "19px", height: "19px" }}
            />
            <p style={{ paddingLeft: "5px" }}>me-Tube</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
