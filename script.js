const input = document.getElementById("input");
const row = document.getElementById("result");
const url = "https://restcountries.com/v3.1/all";

input.addEventListener("input", async (e) => {
  const inputValue = e.target.value.toLowerCase().trim();
  const data = await myData();

  if (inputValue.trim() !== "") {
    const filteredCountries = data.filter((country) => {
      const countryName = country.name.common.toLowerCase();
      return countryName.includes(inputValue);
    });
    updateUI(filteredCountries);
  } else {
    updateUI(data);
  }
});

const myData = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Could not fetch data");
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

const updateUI = (countries) => {
  row.innerHTML = "";
  countries.forEach(myFunc);
};

const myFunc = (country) => {
  const countryDiv = document.createElement("div");
  countryDiv.classList.add("col", "bordered", "my-5");

  countryDiv.innerHTML = `
    <img src=${country.flags.png} alt="Img"/>
    <h1 class="fw-900 text-capitalize text-success">${country.name.common}</h1> 
    <h3 class="text-capitalize">population:<span class="mx-2">${country.population}</span></h3>
    <h3 class="text-capitalize">region:<span class="mx-2">${country.region}</span></h3>
    <h3 class="text-capitalize">capital:<span class="mx-2">${country.capital}</span></h3>
  `;

  countryDiv.style.boxShadow = "5px 5px 15px rgba(0, 0, 0, 0.1)";

  row.appendChild(countryDiv);
};

myData().then((data) => {
  updateUI(data);
});



