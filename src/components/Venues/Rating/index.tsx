import React from "react";

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: string;
  onClick?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = "text-2xl",
  onClick,
}) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    stars.push(
      <span
        key={i}
        className={`text-accent ${size} cursor-pointer`}
        onClick={() => onClick && onClick(i)}
      >
        {i <= rating ? "★" : "☆"}
      </span>
    );
  }

  return <div className="flex">{stars}</div>;
};

export default Rating;
