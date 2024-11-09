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
        Crafted By <a href="https://github.com/jay-madane">Jay Madane</a> | <a href="https://github.com/Aniket2683">Aniket Jaiswal</a>
      </div>
    </div>
  );
}

export default Footer;
