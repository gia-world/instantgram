import React from "react";

type Props = {
  size?: "small" | "big";
  shape?: "squre" | "circle";
  children: React.ReactNode;
  classname?: string;
};

export default function ColorBorder({
  size = "small",
  shape = "squre",
  classname,
  children,
}: Props) {
  return (
    <div
      className={`bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300  ${
        size === "big" ? "p-[0.3rem]" : "p-[0.15rem]"
      } ${shape === "circle" ? "rounded-full" : "rounded-md"} ${classname}`}
    >
      {children}
    </div>
  );
}
