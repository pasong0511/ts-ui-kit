import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface ModalWrapperHandles {
    openModal: () => void;
    closeModal: () => void;
    getState: () => void;
}

interface ModalWrapperProps {
    onClose?: () => void;
    children: React.ReactNode;
}

const ModalWrapper = forwardRef<ModalWrapperHandles, ModalWrapperProps>(
    ({ onClose, children }, ref) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const layerRef = useRef<HTMLDivElement>(null);

        useImperativeHandle(ref, () => ({
            openModal: () => setIsOpen(true),
            closeModal: () => {
                setIsOpen(false);

                if (onClose) onClose();
            },
            getState: () => isOpen,
        }));

        const handleColse = () => {
            setIsOpen(false);
        };

        // 모달의 백그라운드를 클릭했을 때 실행되는 함수
        const handleCloseClick = (e) => {
            if (e.target === e.currentTarget) {
                setIsOpen(false);
            }
        };

        // 모달 콘텐츠의 이벤트가 버블링되는 것을 방지하는 함수
        const handleModalContentClick = (e) => {
            e.stopPropagation();
        };

        return (
            <>
                {isOpen ? (
                    <div
                        className="modal"
                        onClick={handleCloseClick}
                        ref={layerRef}
                    >
                        <div
                            className="modal-content"
                            onClick={handleModalContentClick}
                        >
                            <span className="close" onClick={handleColse}>
                                &times;
                            </span>
                            {children}
                        </div>
                    </div>
                ) : null}
            </>
        );
    }
);

export default ModalWrapper;
