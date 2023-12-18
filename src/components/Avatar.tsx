import React from "react";
import ColorBorder from "./ui/ColorBorder";

type Props = { image?: string | null };

export default function Avatar({ image }: Props) {
  return (
    <ColorBorder shape="circle" classname="w-9 h-9">
      {/* next Image 태그를 외부 url 로 사용하려면 해당 도메인을 config에 추가해줘야 하는데 어떤 경로에서 올 지 알 수 없으므로 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full"
        src={image ?? undefined}
        alt="user image"
        referrerPolicy="no-referrer"
      />
    </ColorBorder>
  );
}
