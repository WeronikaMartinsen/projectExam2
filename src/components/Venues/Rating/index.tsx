import React from "react";

interface RatingProps {
  rating: number;
  size?: string;
  onClick?: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  size = "text-2xl",
  onClick,
}) => {
  return (
    <div className="flex">
      {Array.from({ length: rating }, (_, i) => (
        <span
          key={i}
          className={`text-accent ${size} cursor-pointer`}
          onClick={() => onClick && onClick(i + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
