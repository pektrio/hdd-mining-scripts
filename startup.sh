#!/bin/bash
mode=${1:-farmer}
coins="aedge btcgreen chia hddcoin flax flora staicoin stor sit"
for coin in $coins; do
  echo "starting $coin..."
  screen -S $coin -dm bash -c "cd /home/miner/${coin}-blockchain/;. ./activate;${coin} start ${mode}; bash -c \"exec bash\""
  sleep 1m
  echo "done"
done
