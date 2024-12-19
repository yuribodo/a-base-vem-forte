export interface PortugueseDestination {
    TRASH: string;
    DONATION: string;
    SALE: string;
}

export const portugueseDestination: PortugueseDestination = {
    TRASH: "LIXO",
    DONATION: "DOACAO",
    SALE: "VENDA",
};

export const getDestinationKeyByValue = (value: string): string => {
    return Object.entries(portugueseDestination).find(([_, val]) => val === value)?.[0] || '';
}