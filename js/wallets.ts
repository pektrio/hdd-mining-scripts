#!/usr/bin/env -S /home/miner/.deno/bin/deno run --allow-net --allow-run --allow-read

import { getWallet, getForks, getPrice, Wallet, getExtendedWallets } from "./utils.ts";

const COINS = ['aedge', 'btcgreen', 'chia', 'hddcoin', 'flax', 'flora', 'staicoin', 'stor', 'sit'];

async function main() {
    const extWallets = await getExtendedWallets(COINS);
    extWallets.forEach(wallet =>
      console.log(`${wallet.symbol.toString().padStart(4)} ${wallet.amount.toFixed(2).padStart(6)} x ${wallet.price.toString().padStart(6)} = ${wallet.value.toFixed(4).padStart(10)} USD`)
    );

    const totalValue = extWallets.reduce((acc, entry) => acc + entry.amount * entry.price, 0);
    console.log('Grande Total', totalValue.toFixed(2), 'USD');
 }

main();