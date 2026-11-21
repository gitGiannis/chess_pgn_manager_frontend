import { useState } from "react";
import { parsePgn } from "../services/pgnService";
import type { GameDTO } from "../types/Game";

interface PgnParserProps {
    onGameParsed: (game: GameDTO) => void;
}

function PgnParser({ onGameParsed }: PgnParserProps) {

    const [pgn, setPgn] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleParse() {

        if (!pgn.trim()) {
            setError("Please enter a PGN.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const game = await parsePgn(pgn);

            onGameParsed(game);

        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Unknown error"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Import PGN</h2>

    <textarea
    value={pgn}
    onChange={e => setPgn(e.target.value)}
    placeholder="Paste your PGN here..."
    rows={10}
    cols={60}
    />

    <br />

    <button
        onClick={handleParse}
    disabled={loading}
        >
        {loading ? "Parsing..." : "Parse PGN"}
        </button>

    {error && (
        <p style={{ color: "red" }}>{error}</p>
    )}
    </div>
);
}

export default PgnParser;
