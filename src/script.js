const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const cardContainer = document.getElementById("pokemon-card-container");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchPokemonData = async (id) => {
  try {
    const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${id}`);

    if(response.status === 404) {
      return null;
    }

    const data = await response.json();
    
    return data;
  } catch(err) {
      console.log(err);
      return null;
  }
}

const renderPokemonInfo = async (pokemonId) => {
  const pokemon = await fetchPokemonData(pokemonId);

  if(!pokemon) {
    alert("Pokémon not found");
    return;
  }

  const {
    id, 
    name, 
    height, 
    weight,
    types,
    sprites,
    stats } = pokemon;

  cardContainer.innerHTML = `
  <div id="top">
    <div>
      <span id="pokemon-name">${name.toUpperCase()}</span>
      <span id="pokemon-id">#${id}</span>
    </div>
    <div>
      <span id="weight">Weight: ${weight}</span>
      <span id="height">Height: ${height}</span>
    </div>
  </div>
  <div id="pokemon-image-wrapper">
    <img src="${sprites["front_default"]}" alt="${name} image"/>
  </div>
  <div id="types">
    ${
      types.map(({ type }) => {
        return `<span class="type ${type.name}">${type.name.toUpperCase()}</span>`
      }).join("")
    }
  </div>
  `;

  hp.innerText = stats[0]["base_stat"];
  attack.innerText = stats[1]["base_stat"];
  defense.innerText = stats[2]["base_stat"];
  specialAttack.innerText = stats[3]["base_stat"];
  specialDefense.innerText = stats[4]["base_stat"];
  speed.innerText = stats[5]["base_stat"];
}

const validateUserInput = (input) => {
  const val = input?.replace(" ", "-").toLowerCase();

  return val;
}

searchButton.addEventListener("click", (ev) => {
  ev.preventDefault();
  const inputValue = validateUserInput(searchInput?.value);
  
  inputValue && renderPokemonInfo(inputValue);
});
