const fetchPokemon = async (pokemon) => {
// Definindo uma função assíncrona chamada 'fetchPokemon' que recece um parâmetro 'pokemon'

  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    // Fazendo uma requisição assíncrona à API da PokeAPI para obter informações sobre um Pokémon específico

  if (APIResponse.status === 200) {
    // Verificando se a resposta da API tem um status de '200', o que indica que a requisição foi bem-sucecida

    const data = await APIResponse.json();
    return data;
    // Se a requisição for bem sucedida, estamos convertendo a resposta da API para um objeto JavaScript usando o método 'json()'
  }
}

// Definindo uma função assíncrona chamada 'fetchPokemon' que recece um parâmetro 'pokemon'
