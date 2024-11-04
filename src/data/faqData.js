// FAQ data array
const faqData = [
  {
    question: "What is the Press Information Bureau (PIB)?",
    answer:
      "The PIB is the nodal agency of the Government of India responsible for disseminating information on government policies, programs, initiatives, and achievements to the media.",
  },
  {
    question: "What is the purpose of the automated feedback system?",
    answer:
      "The automated feedback system aims to monitor regional media sites across multiple languages to categorize news stories related to the Government of India as favorable, neutral, or unfavorable (negative).",
  },
  {
    question: "How does the feedback system work?",
    answer:
      "The system crawls approximately 200 regional media websites, scans e-papers using OCR, categorizes news stories based on predefined tags, and provides real-time notifications for negative stories to concerned PIB officers.",
  },
  {
    question: "What languages and newspapers does the system cover?",
    answer:
      "The system covers regional languages including Punjabi, Gujarati, Marathi, Telugu, Kannada, Malayalam, Tamil, Odia, Bengali, Assamese, and Manipuri. It scans select newspapers across these languages for news related to the Government of India.",
  },
  {
    question: "What are the benefits of the feedback system?",
    answer:
      "The system ensures timely feedback to the government by monitoring media reactions, facilitates efficient categorization of news stories, and enhances responsiveness to public sentiment.",
  },
  {
    question: "How are negative stories handled?",
    answer:
      "Negative stories pertaining to government departments are flagged in real-time and notified to relevant PIB officers via SMS, Android notifications, or other means for immediate action.",
  },
  {
    question: "What is OCR and how is it used in the system?",
    answer:
      "Optical Character Recognition (OCR) technology is used to automatically scan and extract text from e-papers of select newspapers. This allows the system to process news clippings related to the Government of India.",
  },
  {
    question: "How are news clippings processed and categorized?",
    answer:
      "News clippings are cut and electronically pasted into a predefined template, mentioning newspaper details, publication page numbers, editions, and categorized into relevant government departments and tonality (positive, negative, neutral).",
  },
  {
    question: "Is the system accessible via a dashboard?",
    answer:
      "Yes, the system includes a dashboard where users can view newspaper titles, categorized stories, and monitor real-time notifications of negative news stories.",
  },
  {
    question: "How does the system ensure accuracy and reliability?",
    answer:
      "The system utilizes AI/ML algorithms to enhance accuracy in categorizing news stories. It undergoes regular updates and maintenance to ensure reliability in providing timely feedback to the government.",
  },
];
export default faqData;
