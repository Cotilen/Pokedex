'use strict'
// import './router.js'

const pokeApi = {}

function convertPokeApiDetailToGames(pokeDetail) {
    const card = {}


    if (pokeDetail.versions.length > 1)
        card.name2 = pokeDetail.versions[1].name
    card.name = pokeDetail.versions[0].name

    return card
}
//Pega a url que esta dentro do link da api e converte em elementos manipulaveis
pokeApi.getGames = (games) => {
    return fetch(games.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGames)
}

//Faz o fetch da api
pokeApi.getGroupGames = async() => {

    const url = `https://pokeapi.co/api/v2/version-group/?offset=0&limit=27`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        //Transforma o link em json e envia para a função que obtém a url
        //de dentro de cada index
        .then((jogos) => jogos.map(pokeApi.getGames))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((gamesDetails) => gamesDetails)
}
Promise.all([
    fetch('https://pokeapi.co/api/v2/version-group/1/'),
    fetch('https://pokeapi.co/api/v2/version-group/2/'),
    fetch('https://pokeapi.co/api/v2/version-group/3/'),
    fetch('https://pokeapi.co/api/v2/version-group/4/'),
    fetch('https://pokeapi.co/api/v2/version-group/5/'),

]).then((results) => {})

//Carrega o card no HTML
const loadCard = function() {

    pokeApi.getGroupGames()
        .then((groups = []) => groups.map((group) => {

            let primeiraLetraGame = group.name.charAt(0).toUpperCase();
            let restoDaPalavraGame = group.name.substring(1);

            let nameGame = primeiraLetraGame + restoDaPalavraGame;

            let primeiraLetraGame2 = group.name2 != null ? group.name2[0].toUpperCase() + group.name2.substring(1).toLowerCase() : ''

            let nameGame2 = primeiraLetraGame2

            const div = document.createElement('div-games')

            div.setAttribute('img', '../images/pokebola.png')
            div.setAttribute('name', `${nameGame}  ${nameGame2}`)
            div.setAttribute('game', `../images/games/${group.name}.png`)
            if (group.name2 != undefined)
                div.setAttribute('game_2', `../images/games/${group.name2}.png`)
            return div

        })).then((card) => {

            const div = document.getElementById('main-games')

            div.replaceChildren(...card)

        })

}
loadCard()