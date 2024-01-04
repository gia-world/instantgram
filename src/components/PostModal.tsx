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
          /*
          target: 이벤트 버블링의 결과로 실제 이벤트가 발생한 요소

currentTarget: 이벤트 핸들러가 실제로 등록된(부착된) 요소. 즉, 이벤트가 실제로 등록되어 처리되는 요소

이 코드에서 onClick 이벤트는 <section> 요소에 등록되어 있습니다. 이벤트가 발생하면 클릭이 실제로 이벤트를 발생시킨 요소(target)와 이벤트 핸들러가 등록된 요소(<section>, currentTarget)를 비교합니다.

위 코드는 이벤트 핸들러가 실제로 <section>에서 발생한 클릭이 아닌 다른 자식 요소에서 발생한 클릭일 때만 onClose() 함수를 호출하도록 처리하고 있습니다. 즉, 자식 요소를 클릭하면 target과 currentTarget이 다르므로 onClose()가 실행되지 않습니다. 이를 통해 <section> 자체가 클릭되었을 때만 onClose()가 실행되도록 하는 것입니다.
          */
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
      {children}
    </section>
  );
}
