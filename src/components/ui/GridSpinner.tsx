// import { GridLoader } from "react-spinners";
import dynamic from "next/dynamic";

//lazy하게 로딩하게끔 다이나믹 임포트
const GridLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.GridLoader),
  {
    ssr: false,
  },
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = "#36d7b7" }: Props) {
  return <GridLoader color={color} />;
}
