export interface DrinkItem {
    id: number;
    name: string;
    price: string;
    description?: string;
}

export const drinks: DrinkItem[] = [
    { id: 1, name: "Draft Beer", price: "990 kr", description: "House lager" },
    { id: 2, name: "Craft IPA", price: "1,290 kr", description: "Local brewery" },
    { id: 3, name: "House Wine", price: "1,190 kr", description: "Red or white" },
    { id: 4, name: "Gin & Tonic", price: "1,490 kr", description: "Premium gin" },
    { id: 5, name: "Whiskey Sour", price: "1,590 kr", description: "Classic cocktail" },
    { id: 6, name: "Espresso Martini", price: "1,690 kr", description: "Coffee lovers" },
];
