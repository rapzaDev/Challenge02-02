export interface FoodData {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

export interface UpdateFoodData {
    name: string;
    description: string;
    price: string;
    image: string;
}