#!/bin/bash
coin=${1}
port=${2}
command=${3}


OUTPUT=$(curl --insecure --cert ~/.${coin}/mainnet/config/ssl/wallet/private_wallet.crt --key ~/.${coin}/mainnet/config/ssl/wallet/private_wallet.key -d '{"wallet_id": 1}' -H "Content-Type: application/json" -X POST https://localhost:${port}/${command} | python -m json.tool)
#cd /home/miner/${coin}-blockchain/
#. ./activate
#OUTPUT=$(${coin} wallet show | grep '\-Total' | head -1)
#deactivate
echo $OUTPUT