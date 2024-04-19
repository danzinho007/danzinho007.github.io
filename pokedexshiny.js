const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const showShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let isShiny = false;

function handleKeyPress(event) {
    if(event.key === 'p' || event.key === 'P') {
        document.querySelector('.button.btn-prev').click();
    }
    if(event.key === 'n' || event.key === 'N') {
        document.querySelector('.button.btn-next').click();
    }
    if(event.key === 's' || event.key === 'S'){
        document.querySelector('.btn-shiny').click();
    }
}
document.addEventListener('keyup', handleKeyPress)

const fetchPokemon = async (pokemon) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (response.status === 200) {
        const data = await response.json();
        return data;
    }    
}

const renderPokemon = async (pokemon, isShiny) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data && data.id < 650) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        if (isShiny === true) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
        } else {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
        
        pokemonImage.style.display = 'block';

        searchPokemon = data.id;

        input.value = '';
    } else {
        pokemonName.innerHTML = 'Not found.';
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';

        input.value = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase(), isShiny);
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon, isShiny);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon++;
        renderPokemon(searchPokemon, isShiny);
    }
});

showShiny.addEventListener('click', () => {
    isShiny = !isShiny;

    if (isShiny) {
        showShiny.innerHTML = 'Show (S) normal'
    } else {
        showShiny.innerHTML = 'Show (S) shiny'
    }
    
    renderPokemon(searchPokemon, isShiny);
});

renderPokemon(searchPokemon);