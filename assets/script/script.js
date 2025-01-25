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

            console.log(data)

            document.querySelector('#interface').innerHTML = `

        <p class="fs-1 mt-2 mb-1 fw-bold">${data.city.name}</p>
        <p class="fs-5">${moment(data.list[0].dt_txt).locale('fr').format('LL')}</p>

        <div class="mb-3 bg-afpa-forecast shadow rounded mx-2">
            <div class="row m-0 p-2">

                <div class="col">
                    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="Image météo">
                    <p class="mb-0">${data.list[0].weather[0].description}</p>
                </div>

                <div class="col border-start border-secondary p-1 row m-0">
                    <div class="col d-flex flex-column justify-content-center">
                        <p class="mb-0"><span class="temperature">${Math.round(data.list[0].main.temp)}°</span>C</p>
                        <p class="feeling mb-0">Ressentie : ${Math.round(data.list[0].main.feels_like)}°C</p>
                    </div>
                </div>

            </div>
        </div>

        <div class="d-flex overflow-auto mx-2 py-2 ps-2 pe-1 mb-3 bg-afpa-forecast rounded shadow">
     
            ${makeTenHoursCast(data, 10)}

        </div>

        <div class="bg-afpa-forecast rounded shadow mx-2 px-2 pt-2 pb-1">        
            
            ${makeFiveDaysCast(data)}

        </div>

        `
        }
    })


// fonction permettant de créer les 5 prochains jours
// elle prends en paramètre un tableau de données et retourne un élément html
function makeFiveDaysCast(arrayData) {
    let htmlElement = ''


    const test = []

    // on recupere la date en cours 
    const today = arrayData.list[0].dt_txt

    // nous allons créer un tableau à l'aide de filter pour obtenir la météo sur 5 jours a 12h
    const fiveDaysArray12h = arrayData.list.filter(date => date.dt_txt != today).filter(date => date.dt_txt.split(' ')[1] == '12:00:00')

    // nous allons créer un tableau à l'aide de filter pour obtenir la météo sur 5 jours a 9h
    const fiveDaysArray9h = arrayData.list.filter(date => date.dt_txt != today).filter(date => date.dt_txt.split(' ')[1] == '09:00:00')

    fiveDaysArray12h.forEach(element => {
        htmlElement += `
            <div class="forecastDays bg-afpa text-center d-flex justify-content-evenly align-items-center rounded mb-1">
                ${moment(element.dt_txt).locale('fr').format('ddd')}<img src="https://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt="Image météo"><span>max : ${Math.round(element.main.temp_max)}°C</span>
            </div>    
            `
    })
    return htmlElement
}

// fonction permettant de créer les 10 prochaines heures de la journée
// elle prends en paramètre un tableau de données et le nombre d'heures à afficher et retourne un élément html
function makeTenHoursCast(arrayData, nbHours) {
    let htmlElement = ''
    for (let i = 0; i < nbHours; i++) {
        htmlElement += `
            <div class="forecastHours bg-afpa rounded py-2 me-1">
                <p class="mb-0">${moment(arrayData.list[i].dt_txt).locale('fr').format('LT')}</p>
                    <img src="https://openweathermap.org/img/wn/${arrayData.list[i].weather[0].icon}@2x.png" alt="Image météo">
                <p class="mb-0">${Math.round(arrayData.list[i].main.temp)}°C</p>
            </div>
            `
    }
    return htmlElement
}