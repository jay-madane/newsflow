// FAQ.jsx

import React from "react";
import "./faq.css"; // Import your CSS file for styling
import faqData from "../data/faqData"; // Import faqData from external file

const FAQ = () => {
  return (
    <div className="container mt-5">
      {/* <h2>Frequently Asked Questions (FAQs)</h2> */}

      <div className="accordion" id="faqAccordion">
        {faqData.map((faq, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header" id={`faqHeading${index}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faqCollapse${index}`}
                aria-expanded="false"
                aria-controls={`faqCollapse${index}`}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`faqCollapse${index}`}
              className="accordion-collapse collapse"
              aria-labelledby={`faqHeading${index}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
