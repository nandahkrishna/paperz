// components/iphone-mockup.tsx
"use client";
import Image from "next/image";
import React from "react";

const imgDims = {
  width: 1419,
  height: 2796,
};

const scaleFactor = 0.2;

// Create a wrapper component that will handle the animation
export const IphoneMockup = () => (
  <Image
    src="/iphone15-screenshot.png"
    alt="Callory Analytics Dashboard"
    width={Math.round(imgDims.width * scaleFactor)}
    height={Math.round(imgDims.height * scaleFactor)}
  />
);
