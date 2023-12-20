import React from "react";
import ColorBorder from "./ColorBorder";

type Props = {
  text: string;
  onClick: () => void;
  size?: "small" | "big";
};

export default function ColorButton({ text, onClick, size }: Props) {
  return (
    <ColorBorder size={size}>
      <button
        onClick={onClick}
        className={`rounded-sm bg-white  transition-opacity hover:opacity-90 ${
          size === "big" ? "p-4 text-2xl" : "px-[0.2rem] text-base"
        }`}
      >
        {text}
      </button>
    </ColorBorder>
  );
}
