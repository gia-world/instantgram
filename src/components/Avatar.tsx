type AvatarSize = "small" | "medium" | "large" | "xlarge";

type Props = {
  image?: string | null;
  size?: AvatarSize;
  // colorBorder?: boolean;
  highlight?: boolean;
};

export default function Avatar({
  image,
  size = "large",
  // colorBorder = false,
  highlight = false,
}: Props) {
  // const containerSizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";
  // const imageSizeStyle =
  //   size === "small" ? "h-8 w-8 p-[0.1rem]" : "h-16 w-16 p-[0.2rem]";

  // const avatarContent = (
  //   // next Image 태그를 외부 url 로 사용하려면 해당 도메인을 config에 추가해줘야 하는데 어떤 경로에서 올 지 알 수 없으므로
  //   // eslint-disable-next-line @next/next/no-img-element
  //   <img
  //     className={`rounded-full bg-white object-cover ${imageSizeStyle}`}
  //     src={image ?? undefined}
  //     alt="user image"
  //     referrerPolicy="no-referrer"
  //   />
  // );

  // return colorBorder ? (
  //   <ColorBorder
  //     shape="circle"
  //     classname={`flex justify-center items-center ${containerSizeStyle}`}
  //   >
  //     {avatarContent}
  //   </ColorBorder>
  // ) : (
  //   <div className={containerSizeStyle}>{avatarContent}</div>
  // );

  // * 엘리 버젼
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* next Image 태그를 외부 url 로 사용하려면 해당 도메인을 config에 추가해줘야 하는데 어떤 경로에서 올 지 알 수 없으므로 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`rounded-full bg-white object-cover ${
          getImageSizeStyle(size).image
        }`}
        src={image ?? undefined}
        alt="user image"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = "rounded-full flex justify-center items-center";
  const highlightStyle = highlight
    ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
    : "";
  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case "small":
      return { container: "w-9 h-9", image: "w-[34px] h-[34px] p-[0.1rem]" };
    case "medium":
      return { container: "w-11 h-11", image: "w-[42px] h-[42px] p-[0.1rem]" };
    case "large":
      return { container: "w-[68px] h-[68px]", image: "w-16 h-16 p-[0.2rem] " };
    case "xlarge":
      return {
        container: "w-[142px] h-[142px]",
        image: "w-[138px] h-[138px] p-[0.3rem]",
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
