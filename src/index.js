
const appendPokemonData = async ()=>{
    const pokeRelevantData = await getPokemonData();
    //append data
    document.getElementById("poke-name").innerText = pokeRelevantData.name ;
    document.getElementById("height").innerText = pokeRelevantData.height ;
    document.getElementById("weight").innerText = pokeRelevantData.weight ;
    document.getElementById("poke-img").src = pokeRelevantData.image ;
}

const getPokemonData = async ()=>{
        const pokeId = document.getElementById('search-inpt').value;
        const ApiResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
        const pokeData = ApiResult.data;
        return { name : pokeData.species.name,
                 height : pokeData.height, 
                 weight : pokeData.weight,
                 image : pokeData.sprites.front_default,
                 backImage : pokeData.sprites.back_default
               }
}

document.getElementById('search-btn').addEventListener('click',appendPokemonData);
