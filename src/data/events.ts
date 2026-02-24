export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

export const events: Event[] = [
    {
        id: "1",
        title: "VOID RITUAL",
        date: "2026-03-15",
        location: "THE UNDERGROUND MAIN STAGE",
        description: "A night of raw acoustic punk and live flash tattooing. Doors at midnight.",
    },
    {
        id: "2",
        title: "INK & IRON EXPO",
        date: "2026-04-02",
        location: "SECTOR 7 WAREHOUSE",
        description: "Below Ground Ink takes over Sector 7 for a weekend of biomechanical surrealism.",
    }
];
