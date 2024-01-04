import React from "react";
import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function PostModal({ onClose, children }: Props) {
  return (
    <section
      className="fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center bg-neutral-900/70"
      onClick={(e) => {
        console.log(e.target, e.currentTarget);
        if (e.target === e.currentTarget) {
          // target: 이벤트 버블링의 결과로 실제 이벤트가 발생한 요소
          // currentTarget: 이벤트 핸들러가 실제로 등록된(부착된) 요소. 즉, 이벤트가 실제로 등록되어 처리되는 요소 -> <section>
          // 자식 요소를 클릭하면 target이 해당 자식요소가 되므로 다르므로 onClose() 실행x
          onClose();
        }
      }}
    >
      <button
        onClick={() => onClose()}
        className="fixed right-0 top-0 p-8 text-white"
      >
        <CloseIcon />
      </button>
      <div className="h-3/5 w-4/5 max-w-7xl bg-white">{children}</div>
    </section>
  );
}
