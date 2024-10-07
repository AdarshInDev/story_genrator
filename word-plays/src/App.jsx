import React, { useState } from "react";
import "./index.css"; // Include CSS to give it a unique look

const TextToolApp = () => {
  const [inputText, setInputText] = useState("");
  const [codeWord, setCodeWord] = useState("");
  const [transformedText, setTransformedText] = useState("");
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    paragraphs: 0,
    sentences: 0,
    lines: 0,
  });
  const [isTransformed, setIsTransformed] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false); // State for copy success animation

  // The "Cryptic Encode" Function
  const makeCrypticCode = () => {
    let secret = "";
    let keys = inputText
      .split("")
      .map((c, i) =>
        String.fromCharCode(c.charCodeAt(0) + (i % 2 === 0 ? 3 : -5))
      );
    secret = keys.reverse().join("🌀");
    setCodeWord(secret);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    setInputText(text);
    updateStats(text);
  };

  const updateStats = (text) => {
    setStats({
      words: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
      characters: text.length,
      paragraphs: text.split(/\n\s*\n/).length,
      sentences: text.split(/[.!?]/).filter(Boolean).length,
      lines: text.split("\n").length,
    });
  };

  const reverseText = () => {
    setTransformedText(inputText.split("").reverse().join(""));
    setIsTransformed(true);
  };

  const camelCaseText = () => {
    setTransformedText(
      inputText
        .split(/\s+/)
        .map((word, idx) =>
          idx === 0
            ? word.toLowerCase()
            : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("")
    );
    setIsTransformed(true);
  };

  const capitalizeText = () => {
    setTransformedText(
      inputText
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
    setIsTransformed(true);
  };

  const alternateCase = () => {
    setTransformedText(
      inputText
        .split("")
        .map((char, idx) =>
          idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
        )
        .join("")
    );
    setIsTransformed(true);
  };

  const toUpperCase = () => {
    setTransformedText(inputText.toUpperCase());
    setIsTransformed(true);
  };

  const toLowerCase = () => {
    setTransformedText(inputText.toLowerCase());
    setIsTransformed(true);
  };

  const revertInput = () => {
    setIsTransformed(false);
    setTransformedText(""); // Clear transformed text when reverting
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(transformedText || inputText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    });
  };

  const applyFormatting = (formatType) => {
    let formattedText = inputText;
    if (formatType === "bold") {
      formattedText = `<b>${formattedText}</b>`;
    } else if (formatType === "italic") {
      formattedText = `<i>${formattedText}</i>`;
    } else if (formatType === "underline") {
      formattedText = `<u>${formattedText}</u>`;
    }
    
    // Instead of setting inputText to formattedText, 
    // just set transformedText to retain original input in the textbox.
    setTransformedText(formattedText);
  };

  return (
    <div className="app-container">
      <textarea
        value={inputText}
        onChange={handleTextChange}
        placeholder="Enter text here..."
      ></textarea>

      <div className="statistics">
        <div className="stat-box">Words: {stats.words}</div>
        <div className="stat-box">Characters: {stats.characters}</div>
        <div className="stat-box">Paragraphs: {stats.paragraphs}</div>
        <div className="stat-box">Sentences: {stats.sentences}</div>
        <div className="stat-box">Lines: {stats.lines}</div>
      </div>

      <div className="button-container">
        <button onClick={reverseText}>Reverse</button>
        <button onClick={camelCaseText}>CamelCase</button>
        <button onClick={capitalizeText}>Capitalize</button>
        <button onClick={alternateCase}>Alternate Case</button>
        <button onClick={toUpperCase}>Uppercase</button>
        <button onClick={toLowerCase}>Lowercase</button>
        <button onClick={makeCrypticCode}>Generate Code Word</button>
        <button onClick={revertInput}>
          {isTransformed ? "Revert to Input" : "Input Text"}
        </button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <button onClick={() => applyFormatting("bold")}>Bold</button>
        <button onClick={() => applyFormatting("italic")}>Italic</button>
        <button onClick={() => applyFormatting("underline")}>Underline</button>
      </div>

      <div className="output-section">
        <h3>{isTransformed ? "Transformed Text:" : "Original Input:"}</h3>
        <div className="output-box">
          <p
            dangerouslySetInnerHTML={{
              __html: isTransformed ? transformedText : inputText,
            }}
          ></p>
        </div>

        <h3>Unique Code Word:</h3>
        <p>{codeWord}</p>
      </div>

      {copySuccess && (
        <div className="copy-notification">Copied to clipboard!</div>
      )}

      <div className="decode-method">
        <h3>How to Decode:</h3>
        <p>
          Reverse the transformation steps used: Split by the 🌀 emoji, convert
          each character using opposite shifts.
        </p>
      </div>
    </div>
  );
};

export default TextToolApp;
