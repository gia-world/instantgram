import ReactDOM from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // 서버사이드 렌더링일 때는 처리 x
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal") as Element;
  return ReactDOM.createPortal(children, node);
}
