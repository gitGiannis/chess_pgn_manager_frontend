import { useState } from "react";

import PgnParser from "./components/pgnParser";
import Chessboard from "./components/board";
import MoveList from "./components/moveList";

import type { GameDTO } from "./types/Game";

function App() {

    const [game, setGame] = useState<GameDTO | null>(null);

    // -1 for starting position, 0 for first play etc
    const [selectedPly, setSelectedPly] = useState(-1);

    function handleGameParsed(newGame: GameDTO) {
        setGame(newGame);
        setSelectedPly(-1);
    }

    // custom fen selecting
    const currentFen = game
        ? selectedPly === -1 ? game.initialFen : game.plies[selectedPly].fen : "";

    return (
        <div style={{ padding: "20px" }}>

            <h1>Chess PGN Manager</h1>

            <PgnParser onGameParsed={handleGameParsed} />

            {game && (
                <div>
                    <hr />

                    <h2>
                        {game.headers.white===null ? "Unknown White Player" : game.headers.white} vs {" "}
                        {game.headers.black===null ? "Unknown Black Player" : game.headers.black}
                    </h2>

                    <p>
                        {game.headers.event===null ? "Unknown Event" : game.headers.event} |
                        {" "}{game.headers.date===null ? "Unknown Event Date" : game.headers.date} |
                        {" "}{game.headers.result}
                    </p>

                    <div style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        alignItems: "flex-start"
                    }}>

                        <div style={{ flex: 2, width: "250px"}}>
                            <h2>
                                {selectedPly === -1
                                    ? "Initial Position"
                                    : `Move: ${game.plies[selectedPly].plyNo}. ${game.plies[selectedPly].move}`}
                            </h2>

                            <Chessboard fen={currentFen} />

                            <button
                                onClick={() => setSelectedPly(-1)}
                                style={{ margin: "12px", width: "100px"}}
                            > Reset
                            </button>
                            <button
                                onClick={() => setSelectedPly(selectedPly>-1 ? selectedPly-1 : -1)}
                                style={{ margin: "12px", width: "100px"}}
                            > Previous
                            </button>
                            <button
                                onClick={() => setSelectedPly(selectedPly<game.plies.length-1 ? selectedPly+1 : game.plies.length-1)}
                                style={{ margin: "12px", width: "100px"}}
                            > Next
                            </button>

                        </div>

                        <div style={{ flex: 1, width: "150px" }}>

                            {"Moves List"}
                            <MoveList
                                plies={game.plies}
                                selectedPly={selectedPly}
                                onSelectPly={setSelectedPly}
                            />

                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}

export default App;
