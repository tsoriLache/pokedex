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
    document.getElementById('not-found-msg').style='display: none'
}

document.getElementById('search-btn').addEventListener('click',appendPokemonData);
document.getElementById('poke-img').addEventListener('mouseover',changeToBackImg);
document.getElementById('poke-img').addEventListener('mouseout',changeToFrontImg);
document.getElementById('close-msg').addEventListener('click',closeNotFoundMsg);