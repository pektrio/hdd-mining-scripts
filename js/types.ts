export interface Wallet {
    balance: number,
    prefix: string
}

export interface ExtendedWallet extends Wallet {
    price: number,
    value: number
}


export interface Fork {
    symbol: string,
    price: number
}

// export class Forks { 
//     constructor() { 

//     }
//     getPrice(prefix: string): number
// }