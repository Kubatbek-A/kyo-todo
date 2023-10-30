import { ReactNode, useRef, useState } from "react";
import externalPromise, { ExternalPromise } from "@/helpers/externalPromise";
import CheckBeforeAction from "../CheckBeforeAction/CheckBeforeAction";
import Modal from "../../UI/CustomModal/Modal";
import Confirm from "../Confirm/Confirm";

export default function ConfirmBeforeClick({
  children,
  ModalContent = Confirm,
  className,
}: {
  children: ReactNode;
  ModalContent?: (props: {
    onConfirm: () => void;
    onCancel: () => void;
    title?: string;
  }) => JSX.Element;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const lastPromise = useRef<ExternalPromise<boolean>>();

  function confirm() {
    lastPromise.current?.resolve(true);
    setIsOpen(false);
  }

  function cancel() {
    lastPromise.current?.resolve(false);
    setIsOpen(false);
  }

  return (
    <>
      <Modal isVisible={isOpen} onClose={cancel}>
        <ModalContent onConfirm={confirm} onCancel={cancel}></ModalContent>
      </Modal>
      <CheckBeforeAction
        onClickCapture={() => {
          const promise = externalPromise<boolean>();

          setIsOpen(true);

          if (lastPromise.current) {
            lastPromise.current.resolve(false);
          }

          lastPromise.current = promise;

          return promise.promise;
        }}
        className={className}
      >
        {children}
      </CheckBeforeAction>
    </>
  );
}
