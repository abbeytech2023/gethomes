import { useState } from "react";

export default function ImageSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="relative w-full max-w-4xl overflow-hidden shadow-lg aspect-video rounded-2xl">
        {slides[currentIndex].type === "image" ? (
          <img
            src={slides[currentIndex].src}
            alt="slider"
            className="object-cover w-full h-full transition-all duration-700"
          />
        ) : (
          <iframe
            src={slides[currentIndex].src}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        )}

        {/* Prev Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute px-2 py-1 text-sm text-white -translate-y-1/2 rounded-full left-2 sm:left-4 top-1/2 bg-black/50 sm:px-3 sm:text-lg"
          >
            ❮
          </button>
        )}

        {/* Next Button */}
        {currentIndex < slides.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute px-2 py-1 text-sm text-white -translate-y-1/2 rounded-full right-2 sm:right-4 top-1/2 bg-black/50 sm:px-3 sm:text-lg"
          >
            ❯
          </button>
        )}
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-3">
        {slides.map((_, index) => (
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
}
