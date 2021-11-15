import React from "react";

interface ModalProps {
  title: string;
  active: boolean;
  close: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  const { title, active, close, onSubmit } = props;
  return (
    <>
        <div className="modal" style={{display: !active ? 'none' : 'initial'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={close}
                >
                  <span aria-hidden="true"></span>
                </button>
              </div>
              <div className="modal-body">
                {props.children}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={close}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Modal;
