import React, {
    useState,
    useRef,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from "react";

export interface LayerWrapperHandles {
    openLayer: () => void;
    closeLayer: () => void;
    getLayerState: () => void;
}

interface LayerWrapperProps {
    onClose?: () => void;
    children: React.ReactNode;
}

const LayerWrapper = forwardRef<LayerWrapperHandles, LayerWrapperProps>(
    ({ onClose, children }, ref) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const layerRef = useRef<HTMLDivElement>(null);

        //useImperativeHandle와 forwardRef를 사용하여 openLayer, closeLayer 메서드를 외부로 노출
        useImperativeHandle(ref, () => ({
            openLayer: () => setIsOpen(true),
            closeLayer: () => {
                setIsOpen(false);
                //부모 컴포넌트에서 닫힘여부를 알기위해서 콜백 함수 추가
                if (onClose) onClose();
            },
            getLayerState: () => isOpen,
        }));

        // 외부 클릭 감지
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    layerRef.current &&
                    !layerRef.current.contains(event.target as Node)
                ) {
                    setIsOpen(false);
                    if (onClose) onClose();
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [onClose]);

        if (!isOpen) {
            return null;
        }

        return (
            <div
                ref={layerRef}
                style={{
                    position: "absolute",
                    border: "1px solid black",
                    padding: "10px",
                    background: "white",
                }}
            >
                {children}
            </div>
        );
    }
);

export default LayerWrapper;
