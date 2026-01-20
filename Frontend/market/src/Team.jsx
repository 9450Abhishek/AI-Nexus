import { useState } from "react";
import Alice from "./assets/team/abhishek.jpg";
import David from "./assets/team/raj.png";

function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  const team = [
    {
      name: "Abhishek Chaurasiya",
      role: " Frontend & AI Specialist",
      photo: Alice,
      info:
        "Expert in Artificial Intelligence, Machine Learning, and data-driven systems. Passionate about building intelligent solutions.",
    },
    
{
      name: "Raj Kumar Chaurasiya",
      role: "Backend Engineer ",
      photo: David,
      info:
        "Backend developer experienced in Node.js, MongoDB, APIs, and scalable architectures.",
    },
  ];

  /* ================== STYLES ================== */

  const containerStyle = {
    padding: "70px 25px",
    maxWidth: "1100px",
    margin: "60px auto",
    textAlign: "center",
    background:
      "linear-gradient(145deg, #020617, #020617), radial-gradient(circle at top, #2563eb, transparent 60%)",
    backgroundBlendMode: "overlay",
    color: "#fff",
    borderRadius: "28px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
  };

  const titleStyle = {
    fontSize: "3.2rem",
    fontWeight: "900",
    marginBottom: "50px",
    background: "linear-gradient(90deg, #38bdf8, #818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "35px",
  };

  const cardStyle = {
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(16px)",
    padding: "35px 25px",
    borderRadius: "22px",
    transition: "0.4s",
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.18)",
  };

  const imageWrapperStyle = {
    width: "120px",
    height: "120px",
    margin: "0 auto 18px",
    borderRadius: "50%",
    padding: "4px",
    background: "linear-gradient(135deg, #38bdf8, #6366f1)",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const nameStyle = {
    fontSize: "1.5rem",
    fontWeight: "800",
    marginTop: "10px",
  };

  const roleStyle = {
    fontSize: "1.1rem",
    fontStyle: "italic",
    color: "#c7d2fe",
  };

  /* ================== MODAL STYLES ================== */

  const overlayStyle = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  };

  const modalStyle = {
    background: "linear-gradient(135deg, #020617, #1e293b)",
    padding: "35px",
    borderRadius: "25px",
    width: "90%",
    maxWidth: "450px",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 30px 70px rgba(0,0,0,0.8)",
    animation: "scaleIn 0.3s ease",
  };

  const closeBtnStyle = {
    marginTop: "20px",
    padding: "10px 25px",
    borderRadius: "20px",
    border: "none",
    background: "linear-gradient(90deg, #38bdf8, #6366f1)",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
  };

  return (
    <>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Meet Our Expert Team</h2>

        <div style={gridStyle}>
          {team.map((member, index) => (
            <div
              key={index}
              style={cardStyle}
              onClick={() => setSelectedMember(member)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(-10px) scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform =
                  "translateY(0) scale(1)")
              }
            >
              <div style={imageWrapperStyle}>
                <img src={member.photo} alt={member.name} style={imageStyle} />
              </div>
              <div style={nameStyle}>{member.name}</div>
              <div style={roleStyle}>{member.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ================== POPUP MODAL ================== */}
      {selectedMember && (
        <div style={overlayStyle} onClick={() => setSelectedMember(null)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={imageWrapperStyle}>
              <img
                src={selectedMember.photo}
                alt={selectedMember.name}
                style={imageStyle}
              />
            </div>
            <h2>{selectedMember.name}</h2>
            <p style={{ color: "#93c5fd", fontStyle: "italic" }}>
              {selectedMember.role}
            </p>
            <p style={{ marginTop: "15px", lineHeight: "1.6" }}>
              {selectedMember.info}
            </p>
            <button
              style={closeBtnStyle}
              onClick={() => setSelectedMember(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Team;
