function inicializarPaginaHome() {
const paginationContainer = document.getElementById('pagination');


if (currentUrl === '/' || currentUrl === '/index') {
    loadPokemons(0); 
}

paginationContainer.addEventListener('click', function(event) {
    const clickedElement = event.target;

    if (clickedElement.tagName === 'A') {
        const page = parseInt(clickedElement.textContent);
        handlePageClick(page, clickedElement);
    }
});

function handlePageClick(page, clickedElement) {
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => {
        link.classList.remove('active');
    });
    clickedElement.classList.add('active');

    const offset = (page - 1) * 20; 
    loadPokemons(offset); 
}

function capitalize(text) {
    const firstLetter = text.charAt(0);
    const rest = text.slice(1);
    return firstLetter.toUpperCase() + rest;
  }


function loadPokemons(offset) {
    
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    .then(response => response.json())
    .then(data => {
        const pokemons = data.results;
        const mainContent = document.getElementById('pokemon-list');
        mainContent.innerHTML = '';
        const pokemonList = document.createElement('div');
      
        pokemons.forEach(pokemon => {
            const pokemonItem = document.createElement('div')
            pokemonItem.classList.add('pokemon-item')
            const nombrePokemon = capitalize(pokemon.name)
            pokemonItem.textContent = nombrePokemon + " #" + pokemon.url.match(/\/(\d+)\/$/)[1]
            loadPokemonImage(pokemon.url, pokemonItem); 
            pokemonList.appendChild(pokemonItem);
            console.log(pokemonList)
        });
        mainContent.appendChild(pokemonList);
    })
    .catch(error => console.error('Error al obtener los datos:', error));
} 

function loadPokemonImage(pokemonUrl, pokemonItem) {
    const number = pokemonUrl.match(/\/(\d+)\/$/)[1];

    fetch(`https://pokeapi.co/api/v2/pokemon/${number}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
    })
    .then(data => {
        const pokemonImgUrl = data.sprites.front_default;
        if (pokemonImgUrl) {
            const pokemonImg = document.createElement('img');
            pokemonImg.src = pokemonImgUrl;
            pokemonItem.appendChild(pokemonImg); 
        } else {
            console.error('No se encontró la imagen del Pokémon');
        }
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

}

inicializarPaginaHome();