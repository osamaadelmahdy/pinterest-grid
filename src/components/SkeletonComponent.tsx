import ImageSkeleton from "./ImageSkeleton";

function SkeletonComponent() {
  return [...Array(12)].map((_, index) => <ImageSkeleton key={index} />);
}

export default SkeletonComponent;
