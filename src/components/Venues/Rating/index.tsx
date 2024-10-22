import React from "react";

interface RatingProps {
  rating: number;
  maxRating?: number;
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
