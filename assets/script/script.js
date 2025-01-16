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

        // affiche le json en entier
        console.log(data)
        // affiche le nom de la ville
        console.log(data.city.name)
        // date du jour avec moment.js
        console.log(moment(data.list[0].dt_txt).locale('fr').format('LL'))
        // heure avec moment .js
        console.log(moment(data.list[0].dt_txt).locale('fr').format('LT'))
        // icone du temps
        console.log(data.list[0].weather[0].icon)
        // description du temps
        console.log(data.list[0].weather[0].description)
        // température
        console.log(data.list[0].main.temp.toPrecision(2))
        // température ressentie
        console.log(data.list[0].main.feels_like.toPrecision(2))
        // température min.
        console.log(data.list[0].main.temp_min.toPrecision(2))
        // température max.
        console.log(data.list[0].main.temp_max.toPrecision(2))
        // levé du soleil
        let sunrise = new Date(data.city.sunrise * 1000)
        console.log(moment(sunrise).locale('fr').format('LT'))
        // couché du soleil
        let sunset = new Date(data.city.sunset * 1000)
        console.log(moment(sunset).locale('fr').format('LT'))

        document.querySelector('#interface').innerHTML = `
        <p class="fs-1 mt-2 mb-1 fw-bold">${data.city.name}</p>
        <p class="fs-5">${moment(data.list[0].dt_txt).locale('fr').format('LL')}</p>

        <div class="py-2 mb-4 border bg-success shadow rounded mx-3">
            <div class="row m-0">
                <div class="col">
                    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png" alt="Image météo">
                </div>
                <div class="col p-3 d-flex flex-column justify-content-center">
                    <p class="fs-1 fw-bold text-light">${moment(data.list[0].dt_txt).locale('fr').format('LT')}</p>
                    <p class="fs-1 mb-0 text-light">${data.list[0].weather[0].description}</p>
                </div>
            </div>
        </div>

        <p class="fs-1 mb-0">${data.list[0].main.temp.toPrecision(2)}° C<i class="bi bi-thermometer ms-1"></i></p>
        <p class="fst-italic">ressenti : ${data.list[0].main.feels_like.toPrecision(2)}° C</p>
        <p><span class="text-primary">min :</span> ${data.list[0].main.temp_min.toPrecision(2)}° C / <span class="text-danger">max :</span> ${data.list[0].main.temp_max.toPrecision(2)}° C</p>
    `

    })