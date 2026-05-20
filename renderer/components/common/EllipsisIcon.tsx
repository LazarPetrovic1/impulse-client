import dynamic from "next/dynamic";
import { ellipsis } from "../../assets/animations";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

export function EllipsisIcon({ text, width, height }: { text?: string; width: number; height: number; }) {
  return (
    <span
      className={"position-absolute"}
      style={{
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <Lottie
        loop
        play
        animationData={ellipsis}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {text && text}
    </span>
  );
}