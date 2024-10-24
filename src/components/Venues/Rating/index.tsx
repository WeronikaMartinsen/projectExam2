import React from "react";

interface RatingProps {
  rating: number;
  maxRating?: number;
  onClick?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5, onClick }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={`text-accent text-xl cursor-pointer`} // Make the stars bigger with text-2xl
        onClick={() => onClick && onClick(i)} // Handle clicks to set the rating
      >
        {i <= rating ? "★" : "☆"}
      </span>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default Rating;
