import { Fork } from './types.ts'

export class Forks {
    forks: Fork[] = [];
    async setup() { 
        const response = await fetch("https://chiaforkscalculator.com/", {
            "headers": {
                "accept": "text/html, application/xhtml+xml",
                "accept-language": "en-US;q=0.8,en;q=0.7",
                "content-type": "application/json;charset=utf-8",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-inertia": "true",
                "x-inertia-partial-component": "Index",
                "x-inertia-partial-data": "forks",
                "x-inertia-version": "e38aac870d6aad589dc4c4bb1c7fa2ef",
                "x-requested-with": "XMLHttpRequest",
                "x-xsrf-token": "eyJpdiI6ImNub1dmQTJsWmYySXd4Sm9Vdk84T3c9PSIsInZhbHVlIjoiV2JRNXp4UVllVkVGeEhhNFZPbDJXT0xoYVBTZHNGTVBUK1JXa2psN0RWOUVYYjc1SnEvSnV4R240MXdnZTJkbi95aWw4TFFja1V4MzhlOWlNTUNZbENGSDlkc09ILzdoY3NaMkZ0eXlHVzFINWtDRG5HaGZKOFNKeVR4cit2N3UiLCJtYWMiOiJjNmNkOWJjN2Y5MDM5ODk2OGVkNzI1OTUxNjY0MzIxNGRkY2M0ZDQyZjViZjlkOWJiZDhiNzNhNWQ0ODJkYzk0In0="
            },
            "referrer": "https://chiaforkscalculator.com/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        });
        const json = await response.json();
        this.forks = json.props.forks;  
    }

    getPrice(symbol: string): number {
        return this.forks.find(fork => fork.symbol.toLowerCase() === symbol)?.default_price_usd_value || 0;
    }
}