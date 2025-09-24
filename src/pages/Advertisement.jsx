import React, { useState, useEffect } from "react";

const ImageSlider = () => {
  const images = [
    "https://via.placeholder.com/1200x600?text=Image+1",
    "https://via.placeholder.com/1200x600?text=Image+2",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto switch every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="flex flex-col items-center w-full px-2 mt-32">
      <div className="relative w-full max-w-4xl overflow-hidden shadow-lg aspect-video rounded-2xl">
        <img
          src={images[currentIndex]}
          alt="slider"
          className="object-cover w-full h-full transition-all duration-700"
        />

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          className="absolute px-2 py-1 text-sm text-white -translate-y-1/2 rounded-full left-2 sm:left-4 top-1/2 bg-black/50 sm:px-3 sm:text-lg"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute px-2 py-1 text-sm text-white -translate-y-1/2 rounded-full right-2 sm:right-4 top-1/2 bg-black/50 sm:px-3 sm:text-lg"
        >
          ❯
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-3">
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
              currentIndex === index ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
