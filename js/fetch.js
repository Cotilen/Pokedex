'use strict'

export const fetchData = async() => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`

    const response = await fetch(url)
    const data = await response.json()

    return {...data }
}

export const fetchRegion = async() => {

    let list = []
    const url = `https://pokeapi.co/api/v2/generation/`

    const response = await fetch(url)
    const data = await response.json()

    data.results.map(element => {
        list.push(element.url)
    })
    return list
}