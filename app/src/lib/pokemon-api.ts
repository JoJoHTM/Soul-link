const API_URL = "https://pokeapi.co/api/v2";

export type PokemonDetails = {
  id: number;
  name: string;
  primaryType: string;
  secondaryType?: string;
  sprite: string | null;
};

type PokemonApiResponse = {
    id: number;
    name: string;
    types: {
        slot: number;
        type: { name: string };
    }[];
    sprites: {
        front_default: string | null;
    };
};

type PokemonListResponse = {
    results: { name: string; url: string }[];
};

let pokemonNamesPromise: Promise<string[]> | null=null;

export function getPokemonNames(): Promise<string[]> {
    if (!pokemonNamesPromise) {
        pokemonNamesPromise = fetch(
            `${API_URL}/pokemon?limit=10000`
        )
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to load pokemon names");
                }

                const data: PokemonListResponse = await response.json();
                return data.results.map((pokemon) => pokemon.name);
            })
            .catch((error) => {
                pokemonNamesPromise = null;
                throw error;
            });
    }

    return pokemonNamesPromise;
}

export async function getPokemon(name: string): Promise<PokemonDetails> {
    const response = await fetch(
        `${API_URL}/pokemon/${encodeURIComponent(name.toLowerCase().trim())}`
    );

    if (!response.ok) {
        throw new Error(`Could not find Pokemon: ${name}`);
    }

    const data: PokemonApiResponse = await response.json();

    const primary = data.types.find(
        (type) => type.slot === 1
    );

    const secondary = data.types.find(
        (type) => type.slot === 2
    );

    if (!primary) {
        throw new Error("Pokemon has no primary type");
    }

    return {
        id: data.id,
        name: data.name,
        primaryType: primary.type.name,
        secondaryType: secondary?.type.name,
        sprite: data.sprites.front_default,
    };
}