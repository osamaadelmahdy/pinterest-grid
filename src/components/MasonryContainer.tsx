import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function MasonryContainer({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonryContainer;
