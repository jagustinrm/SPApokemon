function inicializarPaginaHome() {

const paginationContainer = document.getElementById('pagination');

const currentUrl = window.location.pathname;
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


 function  handlePokemonClick ({pokemon, mainContent}) {
    
    mainContent.innerHTML = ""
    const number = pokemon.url.match(/\/(\d+)\/$/)[1];
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
            const contenedor = document.createElement('div');
            const listaHabilidades = document.createElement('select');
            data.moves.forEach( (movimiento) => {
                const habilidad = document.createElement('option')
                habilidad.value = `${movimiento.move.name}`
                habilidad.textContent = `${movimiento.move.name}`
                listaHabilidades.appendChild(habilidad)
            }

            )

            const pokemonImg = document.createElement('img');
            const nombre = document.createElement('h2');
            contenedor.classList.add("pokemonIndividual")
            pokemonImg.src = pokemonImgUrl;

            
            const nombrePokemon = capitalize(pokemon.name)
            nombre.textContent = `${nombrePokemon} #${number}`;

            contenedor.appendChild(nombre)
            contenedor.appendChild(pokemonImg);
            contenedor.appendChild(listaHabilidades)
            mainContent.appendChild(contenedor)
        } else {
            console.error('No se encontró la imagen del Pokémon');
        }
    })
    .catch(error => console.error('Error al obtener los datos:', error));

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
            const pokemonNumber = pokemon.url.match(/\/(\d+)\/$/)[1];
            pokemonItem.textContent = `${nombrePokemon} #${pokemonNumber}`;
            loadPokemonImage(pokemon.url, pokemonItem); 
            pokemonItem.onclick = () => handlePokemonClick({pokemon, mainContent});

            pokemonList.appendChild(pokemonItem);

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