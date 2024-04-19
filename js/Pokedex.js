const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

const buscarArquivosGif = async (palavraChave, path = '') => {
  const apiUrl = `https://api.github.com/repos/danzinho007/danzinho007.github.io/contents/${path}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    let gifs = [];

    for (const item of data) {
      if (item.type === 'file' && item.name.toLowerCase().includes(palavraChave.toLowerCase()) && item.name.endsWith('.gif')) {
        gifs.push(item.download_url);
      } else if (item.type === 'dir') {
        const nestedPath = path ? `${path}/${item.name}` : item.name;
        const nestedGifs = await buscarArquivosGif(palavraChave, nestedPath);
        gifs = gifs.concat(nestedGifs);
      }
    }

    return gifs;
  } catch (error) {
    console.error('Erro ao buscar arquivos:', error);
  }
}

const exibirGifs = async (urls) => {
  const gifContainer = document.querySelector('.gif-container');
  
   // Limpa o conteúdo atual do container
   gifContainer.innerHTML = '';

   // Criar e adicionar novos GIFs
   urls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = 'GIF';
    img.style.maxWidth = '100px'; // Define a largura máxima do GIF
    img.style.minWidth = '100px'; // Define a largura mínima do GIF
    img.style.maxHeight = '150px'; // Define a altura máxima do GIF
    img.style.minHeight = '150px'; // Define a altura mínima do GIF
    img.style.width = 'auto'; // Mantém a proporção do GIF
    img.style.height = 'auto'; // Mantém a proporção do GIF
    img.style.objectFit = 'contain'; // Mantém a proporção do GIF
    gifContainer.appendChild(img);
  });
  // Posiciona o contêiner GIF 20px mais abaixo na página
  gifContainer.style.position = 'absolute';
  gifContainer.style.top = '220px';
  gifContainer.style.left = '-20px';
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    input.value = '';
    searchPokemon = data.id;

    // Buscar e exibir arquivos GIF correspondentes
    buscarArquivosGif(data.name.toLowerCase())
      .then(urls => {
        if (urls.length > 0) {
          console.log('Arquivos GIF correspondentes encontrados:', urls);
          exibirGifs(urls); // Exibir os GIFs no lugar da imagem do Pokémon
          pokemonImage.style.display = 'none'; // Oculta a imagem do Pokémon
        } else {
          pokemonImage.style.display = 'block'; // Exibe a imagem do Pokémon
          pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        }
      });

    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found :c';
    pokemonNumber.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
