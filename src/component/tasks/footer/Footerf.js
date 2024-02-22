import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBitbucket,
  faLinkedin,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const Footerf = ({ isTogled }) => {
  return (
    <div className={`footer container-footer ${isTogled ? "dark-nav" : ""}`}>
      <div className="container-git-bit">
        <div>
          houda.zaafrani@gmail.com
        </div>
        <div className="icons-footer">
          <Link to="https://github.com/Houda-zaafrani">
            <FontAwesomeIcon
              icon={faSquareGithub}
              className="icons-img-footer"
            />
          </Link>
          <Link to="https://www.linkedin.com/in/houda-zaafrani-78215691/">
            <FontAwesomeIcon icon={faLinkedin} className="icons-img-footer" />
          </Link>
          <Link to ="https://bitbucket.org/buzz-movie/workspace/overview/</div>">
            <FontAwesomeIcon icon={faBitbucket} className="icons-img-footer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footerf;
