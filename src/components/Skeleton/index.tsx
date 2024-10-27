import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface LoadingSkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width,
  height,
  variant,
}) => {
  const style = {
    width,
    height,
  };

  return (
    <span className={`skeleton ${variant}`} style={style}>
      <Skeleton style={style} />
    </span>
  );
};

export default LoadingSkeleton;
