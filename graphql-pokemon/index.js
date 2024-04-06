const offset = 93
const take = 10
const data = []

fetch('https://graphqlpokemon.favware.tech/v8', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: ` 
        {
            getAllPokemon(offset: ${offset}, take: ${take}) {
                num
                sprite
                species
                baseStats {
                    hp
                    attack
                    defense
                }
            }
        }
    `
  })
})
  .then((res) => res.json())
  .then((json) => json.data.getAllPokemon.forEach(element => {
    data.push(element)
  }))
  .then(() => {
    const content = document.querySelector("#content")
    data.forEach(data => {
        const newDiv = document.createElement("div")
        newDiv.innerHTML = `
            <div class="card">
                <h1>Número pokedex: ${data.num}</h1>
                <img class="gif-sprite" src="${data.sprite}">
                <h2>${data.species}</h2>
                <span>Atributos:</span>
                <ul>
                <li class="list">Hp: ${data.baseStats.hp}</li>
                <li class="list">Attack: ${data.baseStats.attack}</li>
                <li class="list">defense: ${data.baseStats.defense}</li>
                </ul>
            </div>
        `
        content.appendChild(newDiv)
    })
})
