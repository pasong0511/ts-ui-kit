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
}

const LayerWrapper = forwardRef<
    LayerWrapperHandles,
    { children: React.ReactNode }
>((props, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const layerRef = useRef<HTMLDivElement>(null);

    //useImperativeHandle와 forwardRef를 사용하여 openLayer, closeLayer 메서드를 외부로 노출
    useImperativeHandle(ref, () => ({
        openLayer: () => setIsOpen(true),
        closeLayer: () => setIsOpen(false),
    }));

    // 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                layerRef.current &&
                !layerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
            {props.children}
        </div>
    );
});

export default LayerWrapper;
