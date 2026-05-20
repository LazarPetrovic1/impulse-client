// @ts-nocheck
import React, { useState, useContext } from "react";
import editData from "../../assets/animations/generic/edit.json";
import dynamic from "next/dynamic";
import { useTheme } from "styled-components";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });

type Types = {
  text?: boolean;
  width: number;
  height: number;
}

export function EditIcon({ text, width, height }: Types) {
  const theme = useTheme()
  const [play, setPlay] = useState(false);
  return (
    <span
      onMouseEnter={() => setPlay(true)}
      onMouseLeave={() => setPlay(false)}
      style={{ color: theme.colors.textPrimary }}
    >
      <Lottie
        loop
        animationData={editData}
        play={play}
        style={{ width, height, display: "inline-block" }}
        className={text ? "pr-2" : ""}
      />
      Edit
    </span>
  );
}
