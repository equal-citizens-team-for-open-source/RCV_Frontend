import React from "react";

import copywriting from "../copywriting/frontPage";
import "./HeroHeader.sass";

const HeroHeader = () => (
  <div className="hero-header">
    <div className="hero-header__container">
      <div className="hero-header__title">
        <span className="hero-header__title__ranked">1. Ranked</span>
        <br />
        <span className="hero-header__title__choice">2. Choice</span>
        <br />
        <span className="hero-header__title__voting">3. Voting</span>
      </div>
      <div className="hero-header__copy">
        <h1>{copywriting.EN.title}</h1>
        <h2>{copywriting.EN.subtitle}</h2>
        <h3>{copywriting.EN.ourMission.header}</h3>
        <h4>{copywriting.EN.ourMission.copy}</h4>
        <h3>{copywriting.EN.ourVision.header}ß</h3>
        <h4>{copywriting.EN.ourVision.copy}</h4>
        <button>{copywriting.EN.callToAction.toUpperCase()}</button>
      </div>
    </div>
  </div>
);

export default HeroHeader;
