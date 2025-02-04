const baseurl = fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json`);

(async function getData() {
    let result = await baseurl;
    let data = await result.json();
    console.log(data.usd.bdt);
})();
