import { Fork } from './types.ts'

export class Forks {
    forks: Fork[] = [];
    async setup() { 
        const response = await fetch("https://chiafork.space/API/allforks.json", {
            "headers": {
              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            },
            "referrer": "https://chiafork.space/API/developer/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
          });
        
    
          if (response.ok) {
              const json = await response.json();
              
              this.forks = json['All Forks'];
              console.log(this.forks);
        }
    }

    getPrice(symbol: string): number {
        return this.forks.find(fork => fork.symbol.toLowerCase() === symbol)?.price || 0;
    }
}