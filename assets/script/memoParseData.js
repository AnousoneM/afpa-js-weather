        // permet de connaitre le code de recherche
        console.log(data.cod)

        // affiche le json en entier
        console.log(data)

        // affiche le nom de la ville
        console.log(data.city.name)

        // date du jour avec moment.js
        console.log(moment(data.list[0].dt_txt).locale('fr').format('LL'))

        // jour en mode short ex. ven. avec moment.js
        console.log(moment(data.list[0].dt_txt).locale('fr').format('ddd'))

        // heure avec moment .js
        console.log(moment(data.list[0].dt_txt).locale('fr').format('LT'))

        // icone du temps
        console.log(data.list[0].weather[0].icon)

        // description du temps
        console.log(data.list[0].weather[0].description)

        // température
        console.log(Math.round(data.list[0].main.temp))

        // température ressentie
        console.log(Math.round(data.list[0].main.feels_like))

        // température min.
        console.log(Math.round(data.list[0].main.temp_min))

        // température max.
        console.log(Math.round(data.list[0].main.temp_max))

        // levé du soleil
        let sunrise = new Date(data.city.sunrise * 1000)
        console.log(moment(sunrise).locale('fr').format('LT'))

        // couché du soleil
        let sunset = new Date(data.city.sunset * 1000)
        console.log(moment(sunset).locale('fr').format('LT'))

        // prévisions des 5 jours / 6:00 et 12:00
        console.log(data.list.filter( date => date.dt_txt.split(' ')[1] == '12:00:00' || date.dt_txt.split(' ')[1] == '6:00:00'))