import React, { useState } from "react";
import dynamic from "next/dynamic";
import { alertData } from "../../assets/animations";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

type GenericTypes = {
  text?: string;
  width: number;
  height: number;
  data: any;
  style?: React.CSSProperties;
  isSidenav?: boolean;
}

export function LottieAnim({ text, width, height, data, style, isSidenav }: GenericTypes) {
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
      style={style && style}
    >
      <Lottie
        loop
        animationData={data}
        play={play}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      {isSidenav ? <span style={{ fontSize: "12px" }}>{text && text}</span> : <>{text && text}</>}
    </span>
  );
}

export const AlertIcon = () => <Lottie loop animationData={alertData} style={{ width: "2rem", height: "2rem", display: "inline-block" }} className="pr-2" />
