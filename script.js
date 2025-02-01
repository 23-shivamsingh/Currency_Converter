const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const toCurr = document.querySelector(".to select");
const fromCurr = document.querySelector(".from select");
const msg = document.querySelector(".message");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "INR") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "USD") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    try {
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025.2.1/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let data = await response.json();
        
        let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        if (!rate) {
            msg.innerText = "Exchange rate not available";
            return;
        }
        
        msg.innerText = `${amtVal} ${fromCurr.value} = ${(amtVal * rate).toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        msg.innerText = "Error fetching exchange rate";
    }
});
