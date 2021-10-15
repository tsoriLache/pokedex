const appendPokemonData = async ()=>{
    try{
        const pokeRelevantData = await getPokemonData();
        //append data
        document.getElementById("poke-name").innerText = pokeRelevantData.name ;
        document.getElementById("height").innerText = pokeRelevantData.height ;
        document.getElementById("weight").innerText = pokeRelevantData.weight ;
        document.getElementById("poke-img").src = pokeRelevantData.image ;
        typeList = pokeRelevantData.types.map((type)=>type.type.name);
        appendTypeList(typeList);
        return pokeRelevantData; //     added for display..need to find better solution.
    }
    catch{
        document.getElementById('not-found-msg').style='display: block';
    }
}

const appendTypeList = (list)=>{
    for(li of list){
        createTypeLiElement(li);
    }
}

const createTypeLiElement = (li)=>{
    const btn = document.createElement('button');
    btn.setAttribute("class", "list-group-item list-group-item-action");  
    btn.setAttribute("type", "button");  
    btn.innerText = li;         
    btn.addEventListener('click',getPokémonsByType)
    document.getElementById('types-list').appendChild(btn); 
}

const getPokemonData = async ()=>{
        const pokeId = document.getElementById('search-inpt').value;
        const ApiResult = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
        const pokeData = ApiResult.data;
        return { name : pokeData.species.name,
                 height : pokeData.height, 
                 weight : pokeData.weight,
                 image : pokeData.sprites.front_default,
                 backImage : pokeData.sprites.back_default,
                 types : pokeData.types
                }
}


const changeToBackImg = async ()=>{
    const pokeRelevantData = await getPokemonData();
    document.getElementById("poke-img").src = pokeRelevantData.backImage ;
}

const changeToFrontImg = async ()=>{
    const pokeRelevantData = await getPokemonData();
    document.getElementById("poke-img").src = pokeRelevantData.image;
}

const closeNotFoundMsg = ()=>{
    document.getElementById('not-found-msg').style='display: none';
}

const displayPokemonData = async ()=>{
    clearDisplay();
    if(await appendPokemonData())
    {
        document.getElementById('data').style='display: block';
    }
}

const clearDisplay =()=>{
    document.getElementById('not-found-msg').style='display: none';
    document.getElementById('data').style='display: none';
    document.getElementById('types-list').innerHTML = '';
};

const getPokémonsByType = async ({target})=>{
    const type = target.innerText;
    const ApiResult = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`)
    const pokeData = ApiResult.data;
    const PokémonArray = pokeData.pokemon.map((pokemon)=>pokemon.pokemon.name)
    console.log(PokémonArray)
    // appendTypeList(PokémonArray)
    return PokémonArray;
}




document.getElementById('search-btn').addEventListener('click',displayPokemonData);
document.getElementById('poke-img').addEventListener('mouseover',changeToBackImg);
document.getElementById('poke-img').addEventListener('mouseout',changeToFrontImg);
document.getElementById('close-msg').addEventListener('click',closeNotFoundMsg);
document.getElementById('search-inpt').addEventListener("input",clearDisplay);
