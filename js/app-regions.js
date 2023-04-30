'use strict'
// import './router.js'

const pokeApi = {}

function convertPokeApiDetailToGeneration(pokeDetail) {
    const card = {}

    card.id = pokeDetail.id
    card.generation = pokeDetail.name
    card.region = pokeDetail.main_region.name
    card.img = `../images/regioes/${pokeDetail.main_region.name}.png`

    return card
}
pokeApi.getRegions = (region) => {
    return fetch(region.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGeneration)
}

pokeApi.getGenerations = async() => {

    const url = `https://pokeapi.co/api/v2/generation/`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((generations) => generations.map(pokeApi.getRegions))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
Promise.all([
    fetch('https://pokeapi.co/api/v2/generation/1/'),
    fetch('https://pokeapi.co/api/v2/generation/2/'),
    fetch('https://pokeapi.co/api/v2/generation/3/'),
    fetch('https://pokeapi.co/api/v2/generation/4/'),
    fetch('https://pokeapi.co/api/v2/generation/5/')

]).then((results) => {})

const loadCard = function() {

    pokeApi.getGenerations()
        .then((regioes = []) => regioes.map((regiao) => {



            //Deixar os números romanos em maiúsculo

            let ultimasLetras = regiao.generation.slice(-2).toUpperCase();
            let resultado = regiao.generation.slice(0, -2) + ultimasLetras;

            if (regiao.generation.length == 14) {
                ultimasLetras = regiao.generation.slice(-4).toUpperCase();
                resultado = regiao.generation.slice(0, -4) + ultimasLetras;
            } else if (regiao.generation.length == 15) {
                ultimasLetras = regiao.generation.slice(-5).toUpperCase();
                resultado = regiao.generation.slice(0, -5) + ultimasLetras;
            }

            const card = document.createElement('card-regions')

            card.setAttribute('generation', resultado)
            card.setAttribute('region', regiao.region)
            card.setAttribute('img', regiao.img)
            return card

        })).then((card) => {

            const div = document.getElementById('main-region')

            div.replaceChildren(...card)
        })

}
loadCard()