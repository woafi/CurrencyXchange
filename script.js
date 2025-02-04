const dropdowns = document.querySelectorAll(".dropDown select")
const btn = document.querySelector("form button");

for (let select of dropdowns) {
    for (currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if (select.name == "from" && currcode == "USD") {
            newOption.selected = "selected"
        }
        if (select.name == "to" && currcode == "JPY") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    })
}

function updateFlag(element) {
    // console.log(element)
    let currcode = element.value
    // console.log(currcode)
    let countryCode = countryList[currcode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let countryImg = element.parentElement.querySelector("img");
    countryImg.src = newSrc;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchange();
})
let fcode = document.querySelector(".from select")
let tcode = document.querySelector(".to select")
async function getExchange() {
    let amount = document.querySelector(".amountBox input");
    let amVal = amount.value;
    if (amVal == "" || amVal < 1) {
        amVal = 1;
        amount.value = "1";
    }
    // console.log(amVal)
    const baseurl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fcode.value.toLowerCase()}.json`;
    let result = await fetch(baseurl);
    let data = await result.json();
    let tovalue = tcode.value.toLowerCase()
    let finalresult = data[fcode.value.toLowerCase()]
    // console.log(finalresult[tovalue]);
    let finalamount = document.querySelector(".msg")
    // 1USD = 154.74JPY
    let multi = amVal * finalresult[tovalue];
    multi = multi.toFixed(4);
    finalamount.innerHTML = `${amVal} ${fcode.value} = ${multi} ${tcode.value}`
    console.log(multi)
}

window.addEventListener("load", () => {
    getExchange();
})