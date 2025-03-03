const flagContainer = document.querySelector('.flag-container');
let allCountriesData;

fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then((data) => {
        renderCountries(data);
        allCountriesData = data;
    });

dropdownMenu.addEventListener('click', (event) => {
    fetch(`https://restcountries.com/v3.1/region/${event.target.innerText.trim()}`)
        .then(res => res.json())
        .then(renderCountries);
})

function renderCountries(data) {
    flagContainer.innerHTML = '';
    data.forEach((country) => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('xs:m-0', 'mx-14', 'shadow-md', 'h-auto', 'max-w-xs', 'hover:scale-105', 'transition', 'duration-300', 'ease-in-out', 'block', 'bg-white', 'dark:bg-darkBlue');
        countryCard.href = `/API_Project/src/country.html?name=${country.name.common}`

        countryCard.innerHTML = `
                <img class="w-full" src="${country.flags.svg}" alt="${country.name.common} flag" />
                <h2 class="font-bold text-xl mt-3 ml-3">${country.name.common}</h2>
                <div class="my-4 ml-3">
                  <p class="mb-1"><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                  <p class="mb-1"><b>Region: </b>${country.region}</p>
                  <p class="mb-1"><b>Capital: </b>${country.capital?.[0]}</p>
                </div>`

        flagContainer.append(countryCard);
    });
}


const searchContainer = document.querySelector('.search-container input');
searchContainer.addEventListener('input', (e) => {
    const filteredCountries = allCountriesData.filter((country) => {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
    })
    renderCountries(filteredCountries);
})


document.addEventListener('DOMContentLoaded', () => {
    const dropdownBtn = document.querySelector('#dropdownBtn');
    const dropdownMenu = document.querySelector('#dropdownMenu');
    const options = document.querySelectorAll('.option');

    dropdownBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
        dropdownIcon.classList.toggle("rotate-180");
    })

    document.addEventListener('click', (event) => {
        if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add("hidden");
            dropdownIcon.classList.remove("rotate-180");
        }
    })

    options.forEach((option) => {
        option.addEventListener('click', function () {
            dropdownBtn.firstElementChild.textContent = this.getAttribute('data-value');
            dropdownMenu.classList.add("hidden");
            dropdownIcon.classList.remove("rotate-180");
        });
    });
});

// Mode Change

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-changer');
    const html = document.documentElement; // Apply dark mode on <html>

    // Check Local Storage for Theme
    if (localStorage.getItem('theme') === 'dark') {
        html.classList.add('dark');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');

        // Save preference in Local Storage
        if (html.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
