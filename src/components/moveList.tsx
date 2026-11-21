import type { Ply } from "../types/Game";

interface MoveListProps {
    plies: Ply[];
    selectedPly: number;
    onSelectPly: (index: number) => void;
}

function MoveList({
                      plies,
                      selectedPly,
                      onSelectPly
                  }: MoveListProps) {

    return (
        <div>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "8px",
                width: "100%"
            }}>
                {plies.map((ply, index) => (
                    <button
                        key={index}
                        onClick={() => onSelectPly(index)}
                        style={{
                            padding: "8px",
                            backgroundColor: selectedPly === index
                                ? "#dcc372"
                                : "#eeeeee",
                            color: selectedPly === index
                                ? "white"
                                : "black",
                            border: "1px solid #999",
                            cursor: "pointer"
                        }}
                    >
                        {ply.plyNo}{ply.color === "white" ? "." : "..."}
                        {" "}
                        {ply.move}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MoveList;
