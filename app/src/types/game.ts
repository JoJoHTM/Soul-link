export type PokemonType = 
    | "normal"
    | "fire"
    | "water"
    | "electric"
    | "grass"
    | "ice"
    | "fighting"
    | "poison"
    | "ground"
    | "flying"
    | "psychic"
    | "bug"
    | "rock"
    | "ghost"
    | "dragon"
    | "dark"
    | "steel"
    | "fairy";

export type Encounter = {
    id: string;
    playerId: string;
    routeId: string;
    pokemon: string;
    primaryType: PokemonType;
    secondaryType?: PokemonType;
    status: "alive" | "dead" | "boxed"
};

export type Player = {
    id: string;
    name: string
};

export type SoulLink = {
    id: string;
    encounterIds: string[]
};
