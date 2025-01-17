// import { apiKey } from "../../config.js"

console.log('ok')

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
        }
    })