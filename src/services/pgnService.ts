// importing GameDTO type from backend
import type { GameDTO } from "../types/Game";

const API_URL = "http://localhost:8080/api/pgn";

export async function parsePgn(pgn: string): Promise<GameDTO> {

    const response = await fetch(`${API_URL}/parse`, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: pgn
    });

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    // response is turned into js object
    const result: GameDTO = await response.json();

    return result;
}
