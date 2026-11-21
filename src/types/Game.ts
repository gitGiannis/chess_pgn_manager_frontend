export interface Headers {
    event: string;
    site: string;
    date: string;
    round: string;
    white: string;
    black: string;
    result: string;
}

export interface Footer {
    capture: boolean;
    check: boolean;
    brilliant: boolean;
    blunder: boolean;
    error: boolean;
    capturedPieces: string;
}

export interface Ply {
    plyNo: number;
    color: string;
    move: string;
    fen: string;
    footer: Footer;
}

export interface GameDTO {
    headers: Headers;
    initialFen: string;
    plies: Ply[];
}
