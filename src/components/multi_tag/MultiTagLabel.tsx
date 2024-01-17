interface IMultiTagLabelProps {
    node: any;
    type?: string;
    onDelete?: (node: any, isLayerOpen?: boolean) => void;
}

export enum TAG_LABEL_TYPE {
    DELETE = "delete",
}

export default function MultiTagLabel({
    node,
    type,
    onDelete,
}: IMultiTagLabelProps) {
    const className = [];

    if (type === TAG_LABEL_TYPE.DELETE) {
        className.push("label-delete");
    }

    const onClick = () => {
        if (onDelete) {
            onDelete(node);
        }
    };

    return (
        <div
            className={`label ${className.join(" ")}`}
            style={{ background: `#${node.color}` }}
        >
            <div>{node.label}</div>
            <button onClick={onClick}>
                <svg
                    role="graphics-symbol"
                    viewBox="0 0 8 8"
                    className="closeThick"
                >
                    <polygon points="8 1.01818182 6.98181818 0 4 2.98181818 1.01818182 0 0 1.01818182 2.98181818 4 0 6.98181818 1.01818182 8 4 5.01818182 6.98181818 8 8 6.98181818 5.01818182 4"></polygon>
                </svg>
            </button>
        </div>
    );
}
