#!/usr/bin/env -S /home/miner/.deno/bin/deno run --allow-net --allow-run --allow-read --unstable

	
  import {
    parse as yamlParse,
  } from 'https://deno.land/std@0.82.0/encoding/yaml.ts';

export interface ConfigFile { 
    wallet: {
        rpc_port: number;
    }
}
  
export async function getConfig(coin: string): Promise<ConfigFile> {
    const file = await Deno.readTextFile(`/home/miner/.${coin}/mainnet/config/config.yaml`);
    const data = yamlParse(file) as ConfigFile;
    return data;
}
