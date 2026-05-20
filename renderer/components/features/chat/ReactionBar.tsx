import { Dispatch, SetStateAction } from "react";

export const ReactionBar = ({ onReact } : { onReact: (emoji: string) => void }) => {
  return (
    <div className="reaction-bar">
      {["👍", "😂", "🔥", "❤️"].map((e) => (
        <span style={{ cursor: "pointer", userSelect: "none", fontSize: "0.75rem" }} key={e} onClick={() => onReact(e)}>{e}</span>
      ))}
      <span onClick={() => onReact("➕")}>+</span>
    </div>
  );
};