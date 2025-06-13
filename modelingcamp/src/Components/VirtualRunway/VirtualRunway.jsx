import React, { useState, useEffect, useRef } from "react";

const models = [
  {
    id: 1,
    name: "Anna Smith",
    image: "/images/Zola.JPG",
  },
  {
    id: 2,
    name: "David Lee",
    image: "/images/Zola.JPG",
  },
  {
    id: 3,
    name: "Maya Chen",
    image: "/images/Zola.JPG",
  },
  {
    id: 4,
    name: "Liam Johnson",
    image: "/images/Zola.JPG",
  },
  {
    id: 5,
    name: "Sophia Patel",
    image: "/images/Zola.JPG",
  },
];

const VirtualRunway = () => {
  const [speed, setSpeed] = useState(50); // pixels per second
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [offset, setOffset] = useState(0);

  // Total width is calculated after mount
  const [totalWidth, setTotalWidth] = useState(0);

  useEffect(() => {
    // Calculate total width of the runway content
    if (containerRef.current) {
      setTotalWidth(containerRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    let lastTimestamp = null;

    const step = (timestamp) => {
      if (lastTimestamp !== null && !isPaused) {
        const delta = timestamp - lastTimestamp;
        // Move offset by speed * delta(ms)/1000 (pixels)
        setOffset((prev) => {
          let nextOffset = prev + (speed * delta) / 1000;
          if (nextOffset > totalWidth) nextOffset -= totalWidth;
          return nextOffset;
        });
      }
      lastTimestamp = timestamp;
      animationRef.current = requestAnimationFrame(step);
    };

    animationRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationRef.current);
  }, [speed, isPaused, totalWidth]);

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        border: "2px solid #333",
        borderRadius: "8px",
        background: "#111",
        color: "#fff",
        padding: "20px 0",
        position: "relative",
        userSelect: "none",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        Gallery
      </h2>

      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.1s linear",
        }}
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Duplicate the models list twice for infinite scroll */}
        {[...models, ...models].map((model, index) => (
          <div
            key={index}
            style={{
              display: "inline-block",
              width: 150,
              marginRight: 40,
              textAlign: "center",
              cursor: "pointer",
              userSelect: "none",
              filter: isPaused ? "brightness(1)" : "brightness(0.7)",
              transition: "filter 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(1.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(0.7)";
            }}
            title={model.name}
          >
            <img
              src={model.image}
              alt={model.name}
              style={{
                width: "100%",
                borderRadius: "10px",
                border: "3px solid white",
                boxShadow: "0 0 15px rgba(255,255,255,0.3)",
              }}
            />
            <p
              style={{
                marginTop: 8,
                fontWeight: "bold",
                fontSize: "1rem",
                userSelect: "text",
              }}
            >
              {model.name}
            </p>
          </div>
        ))}
      </div>

      {/* Speed control */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 20,
          background: "rgba(0,0,0,0.5)",
          padding: "5px 12px",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 14,
        }}
      >
        <label htmlFor="speedControl" style={{ color: "#fff" }}>
          Speed:
        </label>
        <input
          id="speedControl"
          type="range"
          min="10"
          max="200"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default VirtualRunway;
