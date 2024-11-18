import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: string;
  type?: "list" | "card" | "search" | "button"; // Add type prop
  count?: number; // Number of skeletons to render (useful for lists)
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width,
  height,
  variant,
  type,
  count = 1, // Default to 1 skeleton
}) => {
  if (type === "list") {
    // Render skeletons for a list
    return (
      <ul className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <li key={index}>
            <Skeleton width="100%" height="150px" />
          </li>
        ))}
      </ul>
    );
  }

  if (type === "card") {
    // Render a card-like skeleton
    return (
      <div className="flex flex-col space-y-4 p-4 border rounded shadow-sm">
        <Skeleton width="100%" height="200px" />
        <Skeleton width="70%" height="20px" />
        <Skeleton width="50%" height="20px" />
      </div>
    );
  }

  if (type === "search") {
    // Render a skeleton for a search bar
    return <Skeleton width="100%" height="50px" />;
  }

  if (type === "button") {
    // Render a skeleton for a button
    return <Skeleton width="150px" height="40px" />;
  }

  // Default skeleton (custom dimensions)
  return (
    <span className={`skeleton ${variant}`} style={{ width, height }}>
      <Skeleton width={width} height={height} count={count} />
    </span>
  );
};

export default LoadingSkeleton;
