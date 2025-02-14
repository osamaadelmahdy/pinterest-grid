import { useInView } from "react-intersection-observer";

function LoadMoreBtn({
  onClick,
  isLoading,
}: {
  onClick: () => void;
  isLoading: boolean;
}) {
  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        onClick();
      }
    },
  });
  return (
    <div ref={ref} className="loading">
      <button onClick={onClick}>
        {isLoading ? "Loading more..." : "Load more"}
      </button>
    </div>
  );
}

export default LoadMoreBtn;
