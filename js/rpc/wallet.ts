import { exec, OutputMode } from "https://deno.land/x/exec/mod.ts";

const API_HELPER_SH = new URL("./api_wallet_helper.sh", import.meta.url).pathname;

export async function walletRpcCall(coin: string, port: number, command: string): Promise<any> {
  const sequence = [];
  sequence.push(`${API_HELPER_SH} ${coin} ${port} ${command}`);
  const result = await exec(sequence[0], { output: OutputMode.Capture, verbose: false });
  return JSON.parse(result.output);
}
