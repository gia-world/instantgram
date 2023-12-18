import React from "react";
import ColorBorder from "./ColorBorder";

type Props = {
  text: string;
  onClick: () => void;
  size?: "small" | "big";
};

export default function ColorButton({ text, onClick, size }: Props) {
  console.log(size);
  return (
    <ColorBorder size={size}>
      <button
        onClick={onClick}
        className={`bg-white rounded-sm  hover:opacity-90 transition-opacity ${
          size === "big" ? "p-4 text-2xl" : "text-base px-[0.2rem]"
        }`}
      >
        {text}
      </button>
    </ColorBorder>
  );
}
