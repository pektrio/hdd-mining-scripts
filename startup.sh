#!/bin/bash
coins="chia chives hddcoin flax flora staicoin stor"
for coin in $coins; do
  echo "starting $coin..."
  screen -S $coin -dm bash -c "cd /home/miner/${coin}-blockchain/;. ./activate;${coin} start farmer; bash -c \"exec bash\""
  echo "done"
done