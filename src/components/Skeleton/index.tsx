// LoadingSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => (
  <div className="flex flex-col space-y-4">
    <Skeleton height={40} />
    <Skeleton count={5} height={50} />
    <Skeleton height={40} />
  </div>
);

export default LoadingSkeleton;
