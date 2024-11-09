// NewsFilter.js
import React from "react";
import "./newsFilter.css"

function NewsFilter({ tonality, setTonality, language, setLanguage }) {
  const handleTonalityChange = (event) => setTonality(event.target.value);
  const handleLanguageChange = (event) => setLanguage(event.target.value);

  return (
    <div className="news-filter">
      <label>
        Tonality:
        <select value={tonality} onChange={handleTonalityChange}>
          <option value="">All</option>
          <option value="positive">Positive</option>
          <option value="negative">Negative</option>
          <option value="neutral">Neutral</option>
        </select>
      </label>
      <label>
        Language:
        <select value={language} onChange={handleLanguageChange}>
          <option value="">All</option>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="kn">Kannada</option>
          <option value="te">Telugu</option>
          <option value="bn">Bengali</option>
          <option value="ml">Malayalam</option>
          <option value="mr">Marathi</option>
        </select>
      </label>
    </div>
  );
}

export default NewsFilter;
