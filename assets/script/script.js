// import { apiKey } from "../../config.js"

// Afin de récupérer et manipuler les parametres d'URL nous allons créer un objet URLSearchParams
const urlParams = new URLSearchParams(window.location.search);
let city = urlParams.get('city');

// Nous testons si nous avons récupérer une valeur via l'URL
if (city == null || city == "") {
    // dans le cas échéant nous attribuons une valeur par défaut : havre
    city = 'havre'
}

// clé API
const apiKey = '5593f162ed8c4c3607df1a94e144abb5'

// url permettant d'obtenir les prévisions météo
let url = `https://api.openweathermap.org/data/2.5/forecast?lang=fr&units=metric&q=${city}&appid=${apiKey}`


// on va chercher les infos de l'url
fetch(url)
    .then(response => response.json())
    .then(data => {

        // nous testons la valeur de cod, si 404 cela indique que la ville n'est pas trouvée
        if (data.cod == 404) {
            document.querySelector('#interface').innerHTML = `
            <p class="mt-5">Ville non trouvée : <span class="fst-italic">"${city}"</span></p>
            `
            // sinon, cela indique que le ville a été trouvée, donc sinon on affiche
        } else {
            document.querySelector('#interface').innerHTML = `

        <p class="fs-1 mt-2 mb-1 fw-bold">${data.city.name}</p>
        <p class="fs-5">${moment(data.list[0].dt_txt).locale('fr').format('LL')}</p>

        <div class="mb-3 bg-success-subtle shadow rounded mx-3">
            <div class="row m-0 p-2">

                <div class="col">
                    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="Image météo">
                    <p class="mb-0">${data.list[0].weather[0].description}</p>
                </div>

                <div class="col border-start border-secondary p-1 row m-0">
                    <div class="col d-flex flex-column justify-content-center">
                        <p class="mb-0"><span class="temperature">${data.list[0].main.temp.toPrecision(1)}°</span>C</p>
                        <p class="feeling mb-0">Ressentie : ${data.list[0].main.feels_like.toPrecision(1)}°C</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="d-flex overflow-auto mx-3 p-2 mb-3 bg-success-subtle rounded shadow">

            <div class="forecastHours bg-light border rounded py-2">
                <p class="mb-0">12h00</p>
                    <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="Image météo">
                <p class="mb-0">12°C</p>
            </div>
            <div class="forecastHours bg-light border rounded py-2">
                <p class="mb-0">12h00</p>
                    <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="Image météo">
                <p class="mb-0">12°C</p>
            </div>

        </div>

        <div class="bg-success-subtle rounded shadow mx-3 p-2">        
            
            ${makeFiveDaysCast(data.list.filter( date => date.dt_txt.split(' ')[1] == '12:00:00'))}

        </div>

        `
        }
    })

    function makeFiveDaysCast(arrayData){
        let htmlElement = ''
        arrayData.forEach(element => {
            htmlElement += `
            <div class="forecastDays bg-light text-center d-flex justify-content-evenly align-items-center rounded mb-1">
                ${moment(element.dt_txt).locale('fr').format('ddd')}<img src="https://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="Image météo"><span><i class="bi bi-arrow-down-short"></i>${element.main.temp_min.toPrecision(1)}°C / <i class="bi bi-arrow-up-short"></i>${element.main.temp_max.toPrecision(1)}°C</span>
            </div>    
            `
        })
        return htmlElement
    }