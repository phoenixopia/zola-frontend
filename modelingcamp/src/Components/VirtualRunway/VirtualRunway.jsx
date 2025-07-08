import React, { useState, useEffect, useRef } from "react";

const VirtualRunway = () => {
  const [models, setModels] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [speed, setSpeed] = useState(40); // made speed stateful
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/settings");
        const data = await res.json();
        setModels(data.filter(item => /\.(jpe?g|png|gif|webp|svg)$/i.test(item.imageUrl)));
      } catch (err) {
        console.error("Error fetching gallery:", err);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setTotalWidth(containerRef.current.scrollWidth / 2);
    }
  }, [models]);

  useEffect(() => {
    let lastTimestamp = null;

    const step = (timestamp) => {
      if (lastTimestamp !== null && !isPaused) {
        const delta = timestamp - lastTimestamp;
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
  }, [isPaused, totalWidth, speed]);

  const getImageSrc = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `http://localhost:5000/${url}`;
  };

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        padding: "40px 0",
        background: "linear-gradient(to right, #111, #222)",
        position: "relative",
      }}
    >
      <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>
        Virtual Runway Gallery
      </h2>

      {/* Speed Control Slider */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label style={{ color: "#fff", marginRight: "10px" }}>Speed: {speed} px/sec</label>
        <input
          type="range"
          min="10"
          max="200"
          step="1"
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          style={{ width: "200px" }}
        />
      </div>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{
          display: "flex",
          transform: `translateX(-${offset}px)`,
          transition: "transform 0.05s linear",
        }}
      >
        {[...models, ...models].map((model, index) => (
          <div
            key={index}
            style={{
              flexShrink: 0,
              marginRight: "40px",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.15)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={getImageSrc(model.imageUrl)}
              alt="Model"
              style={{
                display: "block",
                height: "100%",
                width: "auto",
                maxHeight: "400px",
                objectFit: "contain",
                background: "#000",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualRunway;
