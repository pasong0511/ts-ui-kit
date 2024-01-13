export default function MultiTagNode({ node, onDelete }: any) {
    const onClick = () => {
        onDelete(node);
    };
    console.log(node);
    return (
        <div className="label-remove">
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
