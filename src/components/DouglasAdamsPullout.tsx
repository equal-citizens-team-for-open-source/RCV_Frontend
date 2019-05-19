import React from "react";
import copywriting from "../copywriting/frontPage";
import VeryImportantLizard from "../img/VeryImportantLizard.svg";
import "./DouglasAdamsPullout.sass";

const DouglasAdamsPullout = () => (
  <div className="pullout">
    <div>
      <img
        className="pullout__figure"
        src={VeryImportantLizard}
        alt={
          "Very Important Lizard Gives A Speech -- by anarres: http:/foofurple.org"
        }
      />
      <div>The Wrong Lizard Problem:</div>
      <div>
        {copywriting.EN.pullout.copy.map((line: string) => (
          <div className="pullout__line">{line}</div>
        ))}
        <div className="pullout__credit">
          --{" "}
          <span className="pullout__credit__author">
            {copywriting.EN.pullout.author}
          </span>
          :{" "}
          <span className="pullout__credit__book">
            {copywriting.EN.pullout.book}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default DouglasAdamsPullout;
