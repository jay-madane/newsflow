import React from "react";
import { Link } from "react-router-dom";
import TypeWriterComponent from "typewriter-effect"; // Correct import path
import "./landingHero.css"; // Import the custom CSS file

const LandingHero = () => {
  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center">
      <div>
        <h1 className="landing-title">NewsFlow for</h1>
        <div className="typewriter-text">
          <TypeWriterComponent
            options={{
              strings: [
                "Multilingual News Monitoring.",
                "News Classification.",
                "News Sentiment Analysis.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <p className=" landing-text mt-4">
        Processing news using AI with cutting-edge models for accuracy.
      </p>
      <div className="d-flex flex-column align-items-center">
        <Link to="/login">
          <button className="btn btn-gradient font-semibold" id="start">
            Start Here
          </button>
        </Link>
      </div>
      <p className="landing- text mt-4">
        All features are free momentarily. No subscription required.
      </p>
    </div>
  );
};

export default LandingHero;
