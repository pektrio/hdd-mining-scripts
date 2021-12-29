#!/usr/bin/env -S /home/miner/.deno/bin/deno run --allow-net --allow-run --allow-read --unstable

import { getExtendedWallets } from "./utils.ts";

const COINS = ['aedge', 'btcgreen', 'chia', 'hddcoin', 'flax', 'flora', 'staicoin', 'stor', 'sit'];

async function main() {
    const extWallets = await getExtendedWallets(COINS);
    const totalValue = extWallets.reduce((acc, entry) => acc + entry.balance * entry.price, 0);
    console.log('Grande Total', totalValue.toFixed(2), 'USD\n');
    extWallets.forEach(wallet =>
      console.log(`${wallet.prefix.toString().padStart(4)} ${wallet.balance.toFixed(2).padStart(6)} x ${wallet.price.toString().padStart(6)} = ${wallet.value.toFixed(4).padStart(10)} USD`)
      );
      
 }

main();