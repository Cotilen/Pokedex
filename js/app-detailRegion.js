'use strict'
// import './router.js'

const pokeApi = {}


function convertPokeApiDetailToGames(pokeDetail) {
    const card = {}
    if (pokeDetail.main_region.name == localStorage.getItem('nameRegion')) {
        card.region = pokeDetail.main_region.name
        card.img = `../images/regioes/${pokeDetail.main_region.name}.png`
        if (pokeDetail.version_groups.length != 1) {
            card.games = `Game: ${pokeDetail.version_groups[0].name}`
        }
        card.games = `Games: ${pokeDetail.version_groups[0].name} , ${pokeDetail.version_groups[1].name}`

        card.pokes = pokeDetail.pokemon_species.map(element => {
            return element.name
        })

        return card
    } else
        return ''

}
pokeApi.getGames = (region) => {

    return fetch(region.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToGames)


}

pokeApi.getGroupGames = async() => {

    const url = `https://pokeapi.co/api/v2/generation/`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((generations) => generations.map(pokeApi.getGames))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}



const loadCard = function() {

    pokeApi.getGroupGames()
        .then((regioes = []) => regioes.map((regiao) => {
            if (regiao != false) {

                const container = document.createElement('div')
                container.classList.add('container')

                const detail = document.createElement('div')
                detail.classList.add('detail')

                const region = document.createElement('div')
                region.classList.add('region')

                const title = document.createElement('h1')
                title.textContent = regiao.region

                const description = document.createElement('span')
                description.classList.add('description')
                description.textContent = regiao.games.toUpperCase()

                const img = document.createElement('img')
                img.src = regiao.img
                img.classList.add('region-image')

                region.append(title)
                detail.append(region, description, img)

                const divPokes = document.createElement('div')
                divPokes.classList.add('pokes')

                const titlePokes = document.createElement('span')
                titlePokes.classList.add('title')
                titlePokes.textContent = 'Pokes'

                const pokedexRegions = document.createElement('div')
                pokedexRegions.classList.add('pokedex-regions')

                const pokes = regiao.pokes.map(element => {
                    console.log(element);

                    const button = document.createElement('button-pokemon')
                    button.setAttribute('nome', element)
                    return button
                })

                pokedexRegions.replaceChildren(...pokes)
                divPokes.append(titlePokes, pokedexRegions)

                container.append(detail, divPokes)

                console.log(pokedexRegions);

                return container
            } else
                return ''

        })).then((card) => {
            const div = document.getElementById('full')

            div.replaceChildren(...card)

        })

}
loadCard()