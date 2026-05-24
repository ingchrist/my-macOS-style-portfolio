import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atelierDuneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import MacWindow from "./MacWindow";
import "./note.scss";

const Note = ({
  windowName,
  windowState,
  setwindowState,
  activeWindow,
  setActiveWindow,
}) => {
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    fetch("/note.txt")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load note.txt");
        return res.text();
      })
      .then((text) => setMarkdown(text))
      .catch(() => setLoadError("Unable to load note"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <MacWindow
      windowName={windowName}
      windowState={windowState}
      setwindowState={setwindowState}
      activeWindow={activeWindow}
      setActiveWindow={setActiveWindow}
    >
      <div className="note-window">
        {!isLoading && !loadError ? (
          <SyntaxHighlighter
            language="typescript"
            style={atelierDuneDark}
            customStyle={{
              padding: "0",
              margin: "0",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            {markdown}
          </SyntaxHighlighter>
        ) : isLoading ? (
          <div className="loading-state">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="loading-state">
            <p>{loadError}</p>
          </div>
        )}
      </div>
    </MacWindow>
  );
};

export default Note;
