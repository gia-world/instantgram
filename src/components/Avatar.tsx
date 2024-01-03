import React from "react";
import ColorBorder from "./ui/ColorBorder";

type Props = {
  image?: string | null;
  size?: "small" | "normal";
  colorBorder?: boolean;
};

export default function Avatar({
  image,
  size = "normal",
  colorBorder = false,
}: Props) {
  const containerSizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";
  const avatarContent = (
    // next Image 태그를 외부 url 로 사용하려면 해당 도메인을 config에 추가해줘야 하는데 어떤 경로에서 올 지 알 수 없으므로
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`rounded-full bg-white ${
        size === "small" ? "p-[0.1rem]" : "p-[0.2rem]"
      }`}
      src={image ?? undefined}
      alt="user image"
      referrerPolicy="no-referrer"
    />
  );

  return colorBorder ? (
    <ColorBorder shape="circle" classname={containerSizeStyle}>
      {avatarContent}
    </ColorBorder>
  ) : (
    <div className={containerSizeStyle}>{avatarContent}</div>
  );

  // * 엘리 버젼
  // return (
  //   <div className={getContainerStyle(size, colorBorder)}>
  //     {/* eslint-disable-next-line @next/next/no-img-element */}
  //     <img
  //       className={`rounded-full bg-white ${getImageSizeStyle(size)}`}
  //       src={image ?? undefined}
  //       alt="user image"
  //       referrerPolicy="no-referrer"
  //     />
  //   </div>
  // );
}

// function getContainerStyle(size: string, highlight: boolean): string {
//   const baseStyle = "rounded-full";
//   const highlightStyle = highlight ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300" : "";
//   const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";
//   return `${baseStyle} ${sizeStyle} ${highlightStyle}`;
// }
// function getImageSizeStyle(size: string): string {
//   return size === "small"
//     ? "w-[34px] h-[34px] p-[0.1rem]"
//     : "w-16 h-16 p-[0.2rem]";
// }
