import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const images = [
  "https://res.cloudinary.com/djc8opvcg/image/upload/v1786338161/S_mark/hero_banner/Hero_Banner_01_miv45f.webp",
  "https://res.cloudinary.com/djc8opvcg/image/upload/v1786338162/S_mark/hero_banner/Hero_banner_02_xfaymc.webp",
  "https://res.cloudinary.com/djc8opvcg/image/upload/v1786338170/S_mark/hero_banner/Hero_banner_03_qoz0me.png",
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        height: { xs: "35vh", sm: "45vh", md: "500px" },
        minHeight: { xs: 260, sm: 360 },
        maxHeight: 600,
        width: "100%",
        bgcolor: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {images.map((img, index) => {
        const isActive = currentIndex === index;
        return (
          <Box
            key={`${img}-${index}`}
            component="img"
            src={img}
            alt={`Hero ${index}`}
            loading={index === 0 ? "eager" : "lazy"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: { xs: "contain", md: "cover" },
              position: "absolute",
              top: 0,
              left: 0,
              opacity: isActive ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
            }}
          />
        );
      })}
    </Box>
  );
}