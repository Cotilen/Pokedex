"use strict"

class card_pokedex extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.nome = 'Pokemon'
        this.number = '#000'
        this.type = 'type'
        this.type_2 = ''
        this.img = null
    }

    static get observedAttributes() {
        return ['nome', 'number', 'type', 'type_2', 'img']

    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles() {
        const css = document.createElement('style')
        css.textContent = `

        
        .normal {
            background-color: #A8A77A;
        }
        
        .fire {
            background-color: #EE8130;
        }
        
        .water {
            background-color: #6390F0;
        }
        
        .electric {
            background-color: #F7D02C;
        }
        
        .grass {
            background-color: #7AC74C;
        }
        
        .ice {
            background-color: #96D9D6;
        }
        
        .fighting {
            background-color: #C22E28;
        }
        
        .poison {
            background-color: #A33EA1;
        }
        
        .ground {
            background-color: #E2BF65;
        }
        
        .flying {
            background-color: #A98FF3;
        }
        
        .psychic {
            background-color: #F95587;
        }
        
        .bug {
            background-color: #A6B91A;
        }
        
        .rock {
            background-color: #B6A136;
        }
        
        .ghost {
            background-color: #735797;
        }
        
        .dragon {
            background-color: #6F35FC;
        }
        
        .dark {
            background-color: #705746;
        }
        
        .steel {
            background-color: #B7B7CE;
        }
        
        .fairy {
            background-color: #D685AD;
        }
        
        .pokemon {
            display: flex;
            flex-direction: column;
            margin: .5rem;
            width: 225px;
            height: 125px;
            padding: 1rem;
            border-radius: 1rem;
            background-size: cover;
            border: solid 1px #000

        }
        
        .pokemon .number {
            color: #000;
   
            text-align: right;
            font-size: .625rem;
        }
        
        .pokemon .name {
            color: #000;
            margin-bottom: .25rem;
            text-transform: capitalize;

        }
        
        .pokemon .detail {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }
        
        .pokemon .detail .types {
            padding: 0;
            margin: 0;
            list-style: none;
        }
        
        .pokemon .detail .types .type  {
            color: #000;
            padding: .25rem .5rem;
            margin: .25rem 0;
            font-size: .625rem;
            border-radius: 1rem;
            filter: brightness(1.1);
            text-align: center;
        }
        
        .pokemon .detail img {
            width: 100%;
            height:100%;
            max-width: 130px;
            height: 100px;
        }
  
        `

        return css

    }
    component() {
        const card = document.createElement('li')
        card.classList.add('pokemon')
        card.classList.add(`${this.type}`)

        const nome = document.createElement('span')
        nome.classList.add('name')

        nome.textContent = this.nome
        const number = document.createElement('span')
        number.classList.add('number')
        number.textContent = this.number

        const detail = document.createElement('div')
        detail.classList.add('detail')

        const types = document.createElement('ol')
        types.classList.add('types')

        const type = document.createElement('li')
        type.classList.add('type')
        type.classList.add(`${this.type}`)
        type.textContent = this.type


        const type_2 = document.createElement('li')
        type_2.classList.add('type')
        type_2.textContent = this.type_2
        if (type_2.textContent != '')
            type_2.classList.add(`${this.type_2}`)


        const img = document.createElement('img')
        img.classList.add('pokemon-pokedex')
        img.src = this.img

        types.append(type, type_2)
        detail.append(types, img)
        card.append(number, nome, detail)

        return card
    }
}

class card_regions extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.generation = 'Generation'
        this.region = 'Region'
        this.img = null
    }

    static get observedAttributes() {
        return ['generation', 'region', 'img']

    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles() {
        const css = document.createElement('style')
        css.textContent = `
        .card {
            font-size: 1.7rem;
            --background: linear-gradient(to left, #7AC74C 0%, #A6B91A 100%);
            width: 260px;
            height: 350px;
            padding: 5px;
            border-radius: 1rem;
            overflow: visible;
            background: #f7ba2b;
            background: var(--background);
            position: relative;
            z-index: 1;
            text-transform: capitalize;

        }
        
        .card::after {
            position: absolute;
            content: "";
            top: 30px;
            left: 0;
            right: 0;
            z-index: -1;
            height: 100%;
            width: 100%;
            transform: scale(0.8);
            filter: blur(25px);
            background: #f7ba2b;
            background: var(--background);
            transition: opacity .5s;
        }
        
        .card-info {
            display: flex;
            flex-direction: column;
            --color: #6390F0;
            background: var(--color);
            color: #f7ba2b;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            border-radius: .7rem;
            gap: 10px;
            -webkit-text-stroke: 2px #000;
        }
        
        .card-detail {
            display: flex;
            color: #6390F0;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            gap: 20px;
            -webkit-text-stroke: 1px #6390F0;
        }
        
        .card .title {
            font-weight: bold;
            letter-spacing: .1em;
        }
        
        .card img {
            opacity: 0;
            transition: opacity 1s ease-in-out;
            width: 230px;
            height: auto;
            max-height:250px;
        }
        
        
        /*Hover*/
        
        .card:hover::after {
            opacity: 0;
        }
        
        .card:hover img {
            opacity: 1;
        }
        
        .card:hover .card-detail {
            color: #f7ba2b;
            -webkit-text-stroke: 2px #000;
            transition: color -webkit-text-stroke 4s;
        }
        .generation, .title{
            margin:0;
        }
        `

        return css

    }
    component() {
        const card = document.createElement('div')
        card.classList.add('card')

        const card_info = document.createElement('div')
        card_info.classList.add('card-info')

        const generation = document.createElement('p')
        generation.classList.add('generation')
        generation.textContent = this.generation

        const card_detail = document.createElement('div')
        card_detail.classList.add('card-detail')

        const title = document.createElement('p')
        title.classList.add('title')
        title.textContent = this.region

        const img = document.createElement('img')
        img.classList.add('img-region')
        img.src = this.img

        card_detail.append(title, img)
        card_info.append(generation, card_detail)
        card.append(card_info)

        return card
    }
}

class div_games extends HTMLElement {
    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })
        this.img = null
        this.name = 'Grupo jogos'
        this.game = null
        this.game_2 = null
        this.idGame = null
        this.idGame_2 = null
    }

    static get observedAttributes() {
        return ['img', 'name', 'game', 'game_2', 'idGame', 'idGame_2']

    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles() {
        const css = document.createElement('style')
        css.textContent = `
        .poke-icon {
            width: 32px;
            height: 32px;
        }
        
        .name {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .button {
            padding: 0 25px 0 25px;
        }
        
        .games {
            display: flex;
            gap: 70px;
        }
        
        .imagem-games {
            width: 150px;
            height: 150px;
        }
        
        
        button {
            font-family: solid;
            font-size: 1.7rem;
            outline: none;
            border: none;
            border-radius: 10px;
            transition: 0.5s;
            background-color: var(--cor-principal);
        }
        
        button:hover {
            animation: a 0.5s 1 linear;
        }
        
        @keyframes a {
            0% {
                transform: scale(0.7, 1.3);
            }
            25% {
                transform: scale(1.3, 0.7);
            }
            50% {
                transform: scale(0.7, 1.3);
            }
            75% {
                transform: scale(1.3, 0.7);
            }
            100% {
                transform: scale(1, 1);
            }
        }
        #null{
            display:none;
        }
        `

        return css

    }
    component() {

        const version = document.createElement('div')

        const div = document.createElement('a')
        div.classList.add('button')

        const button = document.createElement('button')
        button.classList.add('name')

        const img = document.createElement('img')
        img.classList.add('poke-icon')
        img.src = this.img

        const name = document.createElement('div')
        name.textContent = this.name

        const games = document.createElement('div')
        games.classList.add('games')

        const game = document.createElement('img')
        game.classList.add('imagem-games')
        game.src = `${this.game}`
        game.id = this.game

        const game2 = document.createElement('img')
        game2.classList.add('imagem-games')
        game2.src = `${this.game_2}`
        game2.id = this.game_2

        if (this.game_2 == null) {
            games.append(game)
        }
        games.append(game, game2)
        button.append(img, name)
        div.append(button)
        version.append(div, games)


        return version
    }
}

customElements.define('card-pokemon', card_pokedex)
customElements.define('card-regions', card_regions)
customElements.define('div-games', div_games)