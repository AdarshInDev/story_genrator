import axios from "axios";
import React, { useState } from "react";
import "./index.css"; // Include a CSS file to style the tags, inputs, and loading/error indicators

const GenerateStory = () => {
  const [inputText, setInputText] = useState("");
  const [wordsList, setWordsList] = useState([]);
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes, split words by comma
  const handleInputChange = (event) => {
    const value = event.target.value;

    if (value.endsWith(",")) {
      const word = value.slice(0, -1).trim();
      if (word) {
        setWordsList([...wordsList, word]);
      }
      setInputText(""); // Clear the input field after splitting the word
    } else {
      setInputText(value);
    }
  };

  // Remove a word from the list
  const removeWord = (index) => {
    const updatedWords = wordsList.filter((_, i) => i !== index);
    setWordsList(updatedWords);
  };

  // Generate the story from the list of words
  const generateStory = async () => {
    setLoading(true);
    setError("");
    try {
      const prompt = `Create a short, unique story using these words, and please genrate the story in simple english: ${wordsList.join(
        ", "
      )}`;

      // const response = await axios({
      //   url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAnfwbIDXTHWDGEnLwa0tAojPr7Xp2s8bI",
      //   method: "post",
      //   data: {
      //     prompt: prompt,
      //     max_tokens: 150,
      //     temperature: 0.7,
      //   },
      //   headers: {
      //     Authorization: "Bearer AIzaSyAnfwbIDXTHWDGEnLwa0tAojPr7Xp2s8bI",
      //   },
      // });
      let response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAnfwbIDXTHWDGEnLwa0tAojPr7Xp2s8bI",
        { contents: [{ parts: [{ text: prompt }] }] }
      );

      console.log(
        "response is coming :",
        response.data.candidates[0].content.parts[0].text
      );
      setStory(response.data.candidates[0].content.parts[0].text); // Adjust based on the expected response structure
    } catch (error) {
      console.error("Error generating story:", error);
      setError(
        "An error occurred while generating the story. Please try again.: " +
          error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="story-generator-container">
      <h2>Unique Story Generator</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter words separated by commas..."
          value={inputText}
          onChange={handleInputChange}
        />
      </div>
      <div className="tags-container">
        {wordsList.map((word, index) => (
          <div key={index} className="tag">
            {word}
            <button
              onClick={() => removeWord(index)}
              className="remove-tag-button"
            >
              x
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={generateStory}
        disabled={wordsList.length === 0 || loading}
      >
        {loading ? "Generating..." : "Generate Story"}
      </button>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div>
        <h3>Your Story:</h3>
        <p className={story ? "show" : ""}>{story}</p>
      </div>
    </div>
  );
};

export default GenerateStory;

// let response = await axios.post(
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyAnfwbIDXTHWDGEnLwa0tAojPr7Xp2s8bI",
//   { contents: [{ parts: [{ text: prompt }] }] }
// );

// console.log(
//   "response is coming :",
//   response.data.candidates[0].content.parts[0].text
// );
