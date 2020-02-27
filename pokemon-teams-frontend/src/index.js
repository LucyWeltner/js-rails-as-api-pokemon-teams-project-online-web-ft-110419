const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

let trainer_cards = document.querySelector("main")

function createPokeListItem(pokemonsArray){
	let pokemonLis = pokemonsArray.map(pokemon => `<li>${pokemon.nickname} (${pokemon.species})<button class="release" id="${pokemon.id}">Release</button></li>`)
	return pokemonLis.join("")
}

fetch("http://localhost:3000/trainers").then(response => response.json()).then(
	function(response){
		response.forEach(function(trainer){
			let newCard = document.createElement("div")
			newCard.classList += "card"
			newCard.innerHTML = 
				`<p>${trainer.name}</p>
					<button class="add" id=${trainer.id}>Add Pokemon</button>
					<ul>
					${createPokeListItem(trainer.pokemons)
					}
					</ul>`
			trainer_cards.appendChild(newCard)
			newCard.addEventListener("click", function(event){
				if (event.target.className == "add"){
					let add_button = event.target
					// let name = Faker::Name.fist_name
					// let type = Faker::Games::Pokemon.name
					let configObj = {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Accepts": "application/json"
						},
						body: JSON.stringify({
							"species": "Sawduster",
							"nickname": "Sleepy",
							// "nickname": Faker::Name.fist_name,
							// "species": Faker::Games::Pokemon.name,
							"trainer_id": add_button.id
						})
					}
					console.log(configObj)
					fetch(`http://localhost:3000/pokemons`, configObj).then(response => response.json()).then(function(json){
						let poke_list = newCard.children[2]
						poke_list.innerHTML += `<li>${json.nickname} (${json.species})<button class="release" id="${json.id}">Release</button></li>`
					})
				}
				else if (event.target.className == "release"){
					let remove_button = event.target
					console.log(remove_button)
					let configObj = {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Accepts": "application/json"
						}
					}
					fetch(`http://localhost:3000/pokemons/${remove_button.id}`, configObj).then(response => response.json()).then(function(json){
						let poke_li = remove_button.parentNode
						console.log(poke_li)
						poke_li.remove()
					})
				}
			}, true)
		})
	}).then(function(){
		let add_buttons = Array.from(document.querySelectorAll("button.add"))


	})

 