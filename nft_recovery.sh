#!/bin/bash

if [[ ! -v LAUNCHER_HASH ]]; then
  echo "LAUNCHER_HASH env var is not set"
  exit 1
fi

if [[ ! -v POOL_CONTRACT_ADDRESS ]]; then
  echo "POOL_CONTRACT_ADDRESS env var is not set"
  exit 1
fi

if ! command -v yq &> /dev/null
then
    echo "yq could not be found"
    exit
fi

echo `date`
echo "starting recovery per each coin"
cd $HOME/fd-cli
python3 -m venv venv
source venv/bin/activate
for coin in flora hddcoin staicoin flax stor; do
{
  port=`yq e '.full_node.rpc_port' $HOME/.$coin/mainnet/config/config.yaml`
  export FD_CLI_BC_DB_PATH=$HOME/.$coin/mainnet/db/blockchain_v1_mainnet.sqlite
  export FD_CLI_WT_DB_PATH=$HOME/.$coin/mainnet/wallet/db/blockchain_wallet_v1_mainnet_2796152012.sqlite
  OUTPUT=$(fd-cli nft-recover \
    -l $LAUNCHER_HASH \
    -p $POOL_CONTRACT_ADDRESS \
    -nh 0.0.0.0 \
    -np $port \
    -ct $HOME/.$coin/mainnet/config/ssl/full_node/private_full_node.crt \
    -ck $HOME/.$coin/mainnet/config/ssl/full_node/private_full_node.key)
  echo -e "${coin}:${port} \t $OUTPUT"
} &
done
wait
echo "all coins claimed"
