#!/bin/bash
coins="aedge btcgreen chia hddcoin flax flora staicoin stor sit"
for coin in $coins; do
{
  #echo "starting $coin..."
  cd /home/miner/${coin}-blockchain/
  . ./activate
  OUTPUT=$(${coin} wallet show | grep '\-Total' | head -1)
  deactivate
  #echo "${coin}\t${OUTPUT}"
  printf '%-10s: %s\n' "$coin" "$OUTPUT"
} &
done
wait
