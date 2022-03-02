import { Fork } from './types.ts'

export class Forks {
    forks: Fork[] = [];
    async setup() { 
        const response = await fetch("https://xchuniverse.com/wp-admin/admin-ajax.php?action=get_wdtable&table_id=42", {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"98\", \"Google Chrome\";v=\"98\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "pmpro_visit=1; cookielawinfo-checkbox-necessary=yes; cookielawinfo-checkbox-functional=no; cookielawinfo-checkbox-performance=no; cookielawinfo-checkbox-analytics=no; cookielawinfo-checkbox-advertisement=no; cookielawinfo-checkbox-others=no; aiADB_PV=1",
                "Referer": "https://xchuniverse.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": "draw=1&order%5B0%5D%5Bcolumn%5D=0&order%5B0%5D%5Bdir%5D=asc&start=0&length=-1&wdtNonce=ad4e0c139f",
            "method": "POST"
            });
        
    
        if (response.ok) {
            const json = await response.json();
            this.forks = json.data.map((entry: string[]) => ({
                symbol: entry[2],
                default_price_usd_value: entry[5]
            }));
        }
    }

    getPrice(symbol: string): number {
        return this.forks.find(fork => fork.symbol.toLowerCase() === symbol)?.default_price_usd_value || 0;
    }
}