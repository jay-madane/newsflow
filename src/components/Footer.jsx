import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div id="footer" className="footer">
      <div className="copyright">
        &copy; Copyright{" "}
        <strong>
          <span>JSPM's RSCOE</span>
        </strong>
        . All Rights Reserved
      </div>
      <div className="credits">
        Made By <a href="#">Jay Madane | Aniket Jaiswal</a>
      </div>
    </div>
  );
}

export default Footer;
