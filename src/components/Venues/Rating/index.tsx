import React from "react";

interface RatingProps {
  rating: number; // Rating value (0-5)
  maxRating?: number; // Optional max rating, default is 5
}

const Rating: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span key={i} className="text-yellow-500">
        {i <= rating ? "★" : "☆"}
      </span>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default Rating;
