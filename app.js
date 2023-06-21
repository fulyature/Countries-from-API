const API_URL = "https://restcountries.com/v3.1/all";

const selectElement = document.getElementById("select-box");

let countries = [];

const handleFetchCountries = async () => {
  try {
    const res = await fetch(API_URL);
    const result = await res.json();
    countries = result;

    const countryNames = countries
      .map((country) => country.name.common)
      .sort((a, b) => a.localeCompare(b));

    domaYaz(countryNames);
  } catch (error) {
    console.log("Fetch API Error:"`${error}`);
    countries = null;
  }
};

function domaYaz(names) {
  names.forEach((name) => {
    const op = document.createElement("option");
    op.innerHTML += `<span class="option-val">${name}</span>`;
    op.setAttribute("value", name);
    selectElement.appendChild(op);
  });
}

window.addEventListener("load", () => {
  handleFetchCountries();
});
const handleSelectChange = (val) => {
  const selectedCountry = countries.filter((c) => c.name.common === val)[0];
  const {
    flags,
    maps,
    region,
    capital,
    languages,
    currencies,
    population,
    borders,
  } = selectedCountry;
  console.log(selectedCountry);

  const langArr = languages ? Object.values(languages) : [];
  const cardHodler = document.getElementById("card-holder");
  cardHodler.innerHTML = `
    <div class="card" style="width: 18rem;">
  <img class="card-img-top" src=${flags?.png} alt="Card image cap">
  <div class="card-body">
    <h2 class="card-title">${val}</h2>
    <p class="card-text"><i class="fa-solid fa-earth-americas"></i> Region:${region}</p>
    <p class="card-text"><i class="fa-solid fa-users"></i>Population:${population}</p>
    <p class="card-text"><i class="fa-regular fa-comments"></i> Languages:${langArr}</p>
    <a href="${maps.openStreetMaps}" target="_blank"><i class="fa-solid fa-map-location-dot"></i>Map: See on the Maps </a>
    </div>
  </div>
    
    `;
};
