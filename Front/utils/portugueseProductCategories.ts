export interface PortugueseCategories {
    CEREALS: string;
    MEATS: string;
    FRUITS: string;
    VEGETABLES: string;
    DRINKS: string;
    SPICES: string;
    FROZEN: string;
    "DAIRY PRODUCTS": string;
    "CANNED GOODS": string;
}

export const portugueseCategories: PortugueseCategories = {
    CEREALS: "CEREAIS",
    MEATS: "CARNES",
    FRUITS: "FRUTAS",
    VEGETABLES: "VEGETAIS",
    DRINKS: "BEBIDAS",
    SPICES: "TEMPEROS",
    FROZEN: "CONGELEADOS",
    "DAIRY PRODUCTS": "LATICÍNIOS",
    "CANNED GOODS": "ENLATADOS"
};

export const getENCategoryByPTValue = (value: string): string => {
    return Object.entries(portugueseCategories).find(([_, val]) => val === value)?.[0] || '';
}
