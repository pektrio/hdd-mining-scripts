import { walletRpcCall } from "./rpc/wallet.ts";
import { Wallet, ExtendedWallet } from "./types.ts";
import { Forks } from './forks.ts';
import { getConfig } from "./coinConfig.ts";

export async function getWallet(coin: string): Promise<Wallet> { 
    const config = await getConfig(coin);
    const port = config.wallet.rpc_port;
    const balance = (await walletRpcCall(coin, port, 'get_wallet_balance'))?.wallet_balance.confirmed_wallet_balance / 1000000000000; 
    const prefix = (await walletRpcCall(coin, port, 'get_network_info'))?.network_prefix; 

    return {
        balance,
        prefix
    };
}
 
export async function getExtendedWallets(coins: string[]): Promise<ExtendedWallet[]> {
    const promises: Promise<Wallet>[] = coins.map(coin => getWallet(coin));
    const results = await Promise.allSettled(promises) as PromiseFulfilledResult<Wallet>[];
    const wallets = results.map(result => result.value);

    const forks = new Forks();
    await forks.setup();

    const extWallets: ExtendedWallet[] = wallets.map(wallet => {
        const price = forks.getPrice(wallet.prefix);
        return { ...wallet, price, value: (price * wallet.balance) };
    });

    extWallets.sort((a, b) => b.value - a.value);
    return extWallets;
} 

export function walletsToString(extWallets: ExtendedWallet[]): string[] { 
    const tokens = [];
    const totalValue = extWallets.reduce((acc, entry) => acc + entry.balance * entry.price, 0);
    tokens.push(`Grande Total  ${totalValue.toFixed(2)} USD`);
    extWallets.forEach(wallet =>
        tokens.push(`${wallet.prefix.toString().padStart(4)} ${wallet.balance.toFixed(2).padStart(6)} x ${wallet.price.toString().padStart(6)} = ${wallet.value.toFixed(4).padStart(10)} USD`)
    );
    return tokens;
}