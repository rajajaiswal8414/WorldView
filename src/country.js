const params = new URLSearchParams(window.location.search);
const countryName = params.get('name');
const countryDetails = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-name')
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');
const backButton = document.querySelector('.back-button');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(res => res.json())
    .then(([country]) => {
        countryDetails.src = `${country.flags.svg}`;
        countryNameH1.innerHTML = `${country.name.common}`
        population.innerText = `${country.population.toLocaleString('en-IN')}`
        region.innerText = `${country.region}`;
        topLevelDomain.innerText = `${country.tld.join(', ')}`;

        if (country.capital) {
            capital.innerText = `${country.capital?.[0]}`
        }
        if (country.subregion) {
            subRegion.innerText = `${country.subregion}`
        }
        if (country.name.nativeName) {
            nativeName.innerText = Object.values(country.name.nativeName)[0].official;
        }
        else {
            nativeName.innerText = `${country.name.common}`
        }
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
        }
        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ');
        }
        if (country.borders) {
            country.borders.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then(res => res.json())
                    .then(([borderCountry]) => {
                        const borderCountryTag = document.createElement('a');
                        borderCountryTag.classList.add('ml-2', 'shadow-sm', 'px-4', 'border-2', 'mb-2');
                        borderCountryTag.innerText = `${borderCountry.name.common}`
                        borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                        borderCountries.append(borderCountryTag);
                    });
            });
        }
    })

backButton.addEventListener('click', () => {
    history.back();
})

document.addEventListener('DOMContentLoaded', () => {
    const themeChanger = document.querySelector('.theme-changer');
    const htmlElement = document.documentElement;

    if (localStorage.getItem('theme') == 'dark') {
        htmlElement.classList.add('dark');
    }

    themeChanger.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    })
})