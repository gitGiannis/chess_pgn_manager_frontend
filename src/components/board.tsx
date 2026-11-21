interface boardProps {
    fen: string;
}

//symbols for each piece
const pieces: Record<string, string> = {
    K: "♔",
    Q: "♕",
    R: "♖",
    B: "♗",
    N: "♘",
    P: "♙",
    k: "♚",
    q: "♛",
    r: "♜",
    b: "♝",
    n: "♞",
    p: "♟"
};

// const pieces: Record<string, string> = {
//     K: "K",
//     Q: "Q",
//     R: "R",
//     B: "B",
//     N: "N",
//     P: "P",
//     k: "k",
//     q: "q",
//     r: "r",
//     b: "b",
//     n: "n",
//     p: "p"
// };

function Chessboard({ fen }: boardProps) {

    // backend sends the piece placement by a custom FEN
    const rows = fen.split("/");

    const board = rows.map(row => {
        const squares: string[] = [];

        for (const char of row) {
            if (/[1-8]/.test(char)) {
                const emptySquares = Number(char);

                for (let i = 0; i < emptySquares; i++) {
                    squares.push("");
                }
            } else {
                squares.push(char);
            }
        }

        return squares;
    });

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gridTemplateRows: "repeat(8, 1fr)",
            width: "min(100%, 700px)",
            aspectRatio: "1 / 1",
            border: "4px solid #333"
        }}>
            {board.flatMap((row, rowIndex) =>
                row.map((piece, colIndex) => {

                    const isLight = (rowIndex + colIndex) % 2 === 0;

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            style={{
                                backgroundColor: isLight
                                    ? "#78623b"
                                    : "#000000",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "clamp(20px, 7vw, 48px)",
                                userSelect: "none"
                            }}
                        >
                            {pieces[piece] || "-"}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Chessboard;
