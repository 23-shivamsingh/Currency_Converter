const BASE_URL = "https://v6.exchangerate-api.com/v6/f135ec8c6824c6640615ae00/latest/USD";
const dropdowns = document.querySelectorAll(".dropdown select");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("options");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }
}
    