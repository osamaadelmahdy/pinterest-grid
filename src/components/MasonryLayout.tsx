import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function MasonryLayout({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry
        itemStyle={{
          gap: "20px",
        }}
      >
        {children}
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonryLayout;
