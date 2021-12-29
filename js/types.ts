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
    default_price_usd_value: number
}

// export class Forks { 
//     constructor() { 

//     }
//     getPrice(prefix: string): number
// }