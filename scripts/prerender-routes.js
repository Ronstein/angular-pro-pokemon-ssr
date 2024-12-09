const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

(async () => {
  const fs = require('fs');
  //Pokemons por IDs
  const pokemonsIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  // console.log(pokemonsIds);
  let fileContent = pokemonsIds.map(
    id => `/pokemons/${id}`
  ).join('\n');

  //Paginas de Pokemons
  for (let index = 1; index <= TOTAL_PAGES; index++) {
    fileContent += `\n/pokemons/pages/${index}`;

  }

  //Por nombres de pokemons
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
    .then(res => res.json());

  // console.log(pokemonNameList);

  fileContent += '\n';
  fileContent += pokemonNameList.results.map(
    pokemon => `/pokemons/${pokemon.name}`
  ).join('\n');

  // console.log(fileContent);
  fs.writeFileSync('routes.txt', fileContent);

  console.log(`routes.txt generated ${TOTAL_POKEMONS + TOTAL_PAGES} routes`);

})();
