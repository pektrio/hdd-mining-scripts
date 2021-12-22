#!/bin/bash
coin=${1}

cd /home/miner/${coin}-blockchain/
. ./activate
OUTPUT=$(${coin} wallet show | grep '\-Total' | head -1)
deactivate
echo $OUTPUT