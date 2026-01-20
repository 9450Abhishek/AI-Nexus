import { useState, useRef } from "react";
import axios from "axios";

function ChatAvatar() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // position state
  const [position, setPosition] = useState({ x: 30, y: 30 });
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const sendMessage = async () => {
    if (!message.trim()) return alert("Please enter a message");
    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post(
        "http://localhost:5050/api/generate-content",
        { prompt: message }
      );
      setResponse(res.data.content || "No response from AI");
    } catch (err) {
      alert("Error generating AI response");
    } finally {
      setLoading(false);
    }
  };

  // Drag handlers
  const onMouseDown = (e) => {
    offsetRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    setPosition({
      x: e.clientX - offsetRef.current.x,
      y: e.clientY - offsetRef.current.y,
    });
  };

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  /* ---------- STYLES ---------- */

  const buttonStyle = {
    position: "fixed",
    left: position.x,
    bottom: position.y,
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "#fff",
    border: "none",
    cursor: "grab",
    fontSize: "24px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
    zIndex: 1000,
  };

  const chatStyle = {
    position: "fixed",
    left: position.x,
    bottom: position.y + 75,
    width: "300px",
    background: "#fff",
    borderRadius: "16px",
    padding: "14px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "8px",
  };

  const sendBtnStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: loading ? "#9ca3af" : "#2563eb",
    color: "#fff",
    fontWeight: "600",
    cursor: loading ? "not-allowed" : "pointer",
  };

  const responseStyle = {
    marginTop: "8px",
    fontSize: "14px",
    background: "#f3f4f6",
    padding: "8px",
    borderRadius: "8px",
    maxHeight: "120px",
    overflowY: "auto",
    whiteSpace: "pre-wrap",
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        ref={dragRef}
        style={buttonStyle}
        onMouseDown={onMouseDown}
        onClick={() => setOpen(!open)}
      >
        🤖
      </button>

      {/* Chat Box */}
      {open && (
        <div style={chatStyle}>
          <h4 style={{ textAlign: "center", marginBottom: "8px" }}>
            AI Assistant
          </h4>

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={inputStyle}
          />

          <button
            style={sendBtnStyle}
            disabled={loading}
            onClick={sendMessage}
          >
            {loading ? "Thinking..." : "Send"}
          </button>

          <div style={responseStyle}>{response}</div>
        </div>
      )}
    </>
  );
}

export default ChatAvatar;
