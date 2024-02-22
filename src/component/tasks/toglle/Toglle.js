import React from 'react'
import "./toglle.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
const Toglle = ({ isTogled, toggleButton }) => {
  return (
    <div className={`toglle-div ${isTogled ? "dark-toglle" : ""}`}>
      {isTogled ? (
        <FontAwesomeIcon
          icon={faSun}
          onClick={toggleButton}
          className="toglle-sun"
        />
      ) : (
        <FontAwesomeIcon
          icon={faMoon}
          onClick={toggleButton}
          className="toglle-moon"
        />
      )}
    </div>
  );
};

export default Toglle
