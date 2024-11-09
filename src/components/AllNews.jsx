// AllNews.js
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import "./allNews.css";
import NewsFilter from "./NewsFilter";

function AllNews() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [tonality, setTonality] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      const accessToken = Cookies.get("accessToken");

      try {
        const response = await fetch(
          "https://newsflowservices.vercel.app/api/v1/news/allNews",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Expected JSON but received HTML or other format");
        }

        const data = await response.json();

        if (Array.isArray(data.data)) {
          setNewsList(data.data);
        } else {
          throw new Error("Expected data to be an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleImageError = (event) => {
    event.target.src =
      "https://via.placeholder.com/280x168?text=Image+Not+Available"; // Placeholder image
  };

  const getTonalityClass = (tonality) => {
    if (tonality.toLowerCase() === "positive") return "positive";
    if (tonality.toLowerCase() === "negative") return "negative";
    return "neutral";
  };

  // Apply filters
  const filteredNewsList = newsList.filter((newsItem) => {
    const matchesTonality = tonality ? newsItem.tonality === tonality : true;
    const matchesLanguage = language ? newsItem.language === language : true;
    return matchesTonality && matchesLanguage;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="all-news-container">

      {/* Filter component */}
      <NewsFilter
        tonality={tonality}
        setTonality={setTonality}
        language={language}
        setLanguage={setLanguage}
      />

      {filteredNewsList.map((newsItem) => (
        <div key={newsItem._id} className="news-card">
          <iframe
            src={`https://news.google.com${newsItem.img.replace("/api", "")}`}
            alt={newsItem.title}
            className="news-image"
            onError={handleImageError}
          />
          <div className="news-content">
            <h3 className="news-title">{newsItem.title}</h3>
            <p className="news-description">{newsItem.content}</p>
            <p className="news-publication-date">
              <span className="news-label">Published on:</span>{" "}
              {new Date(newsItem.publicationDate).toLocaleDateString()}
            </p>
            <p className="news-tonality">
              <span className="news-label">Tonality:</span>{" "}
              <span
                className={`tonality-value ${getTonalityClass(
                  newsItem.tonality
                )}`}
              >
                {newsItem.tonality}
              </span>
            </p>
            <a
              href={newsItem.link}
              className="news-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read more
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllNews;
