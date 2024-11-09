import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Card from "./Card";

function Cards() {
  const [cards, setCards] = useState([]);

  const fetchData = () => {
    const accessToken = Cookies.get("accessToken");

    fetch("https://newsflowservices.vercel.app/api/v1/news/insertDailyAvg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        /* Add necessary payload here if needed */
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          const formattedCards = data.data.map((item) => ({
            name:
              item.tonality.charAt(0).toUpperCase() + item.tonality.slice(1),
            amount: parseFloat(item.percentage.toFixed(3)), // Limit to 3 decimal places
            percentage: parseFloat(item.percentage.toFixed(3)), // Limit to 3 decimal places
            icon:
              item.tonality === "positive"
                ? "bi bi-emoji-smile"
                : item.tonality === "negative"
                ? "bi bi-emoji-frown"
                : "bi bi-emoji-neutral",
          }));
          setCards(formattedCards);
        } else {
          console.log("Unexpected response format:", data);
        }
      })
      .catch((e) => console.log("Fetch error:", e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {cards.length > 0 &&
        cards.map((card, index) => <Card key={index} card={card} />)}
    </>
  );
}

export default Cards;
