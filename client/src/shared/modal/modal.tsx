import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import "./modal.scss";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="modal__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <h2 id="modal-title" className="modal__title">
          {title}
        </h2>

        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        {children}
      </section>
    </div>,
    document.body,
  );
}

export default Modal;
