import { ReactNode } from "react";
import { Virtualizer } from "@tanstack/react-virtual";

interface VirtualContainerProps {
  virtualizer: Virtualizer<Window, Element>;
  children: ReactNode;
}

function VirtualContainer({ virtualizer, children }: VirtualContainerProps) {
  return (
    <div
      style={{
        height: `${virtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${
            virtualizer.getVirtualItems()[0]?.start ?? 0
          }px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default VirtualContainer;
