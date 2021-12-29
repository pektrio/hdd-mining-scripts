#!/usr/bin/env -S /home/miner/.deno/bin/deno run --allow-net --allow-run --allow-read --unstable

import { walletsToString, getExtendedWallets } from "./utils.ts";
import * as queryString from "https://deno.land/x/querystring@v1.0.2/mod.js";


const COINS = ['aedge', 'btcgreen', 'chia', 'hddcoin', 'flax', 'flora', 'staicoin', 'stor', 'sit'];

async function main() {
  const extWallets = await getExtendedWallets(COINS);
  const tokens = walletsToString(extWallets);
  const title = tokens.shift();
  const query = {
    token: 'ayo13pxg63od3mxrycw4a18piazbng',
    user: 'upop84id3fnbhjupd6kkxgbmio237k',
    title,
    message: tokens.join('\n'),
    monospace: 1
  };

  const body = queryString.stringify(query, { arrayFormat: "comma" });

  await fetch('https://api.pushover.net/1/messages.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body
  })
 }

main();