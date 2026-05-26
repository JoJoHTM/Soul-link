export type Encounter = {
    id: string,
    playerId: string,
    route: string,
    pokemon: string,
    primaryType: string,
    secondaryType?: string,
    alive: boolean
}

export type SoulLink = {
    id: string,
    encounterIds: string[]
} 
