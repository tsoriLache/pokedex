let username;


const appendPokemonData = async ()=>{
    try{
        const pokeRelevantData = await getPokemonData();
        //append data
        document.getElementById("poke-id").innerText = pokeRelevantData.id ;
        document.getElementById("poke-name").innerText = pokeRelevantData.name ;
        document.getElementById("height").innerText = pokeRelevantData.height ;
        document.getElementById("weight").innerText = pokeRelevantData.weight ;
        document.getElementById("abilities").innerText = pokeRelevantData.abilities ;
        document.getElementById("poke-img").src = pokeRelevantData.front_pic ;
        const typeList = pokeRelevantData.types;
        appendTypeList(typeList);
        return pokeRelevantData; //     added for display..need to find better solution.
    }
    catch{
        document.getElementById('not-found-msg').style='display: block';
    }
}

const appendTypeList = (typeList)=>{
    for(type of typeList){
        const btn = createBtnElement(type);
        btn.addEventListener('click',handlePokListEvent);
        document.getElementById('types-list').appendChild(btn); 
    }
}

const appendPokemonByTypeList = (PokémonArray)=>{
    for(Pokémon of PokémonArray){
        const btn = createBtnElement(Pokémon);
        btn.addEventListener('click',changeSearch);
        document.getElementById('pokemon-list').appendChild(btn); 
    }
}

const createBtnElement = (liTxt)=>{
    const btn = document.createElement('button');
    btn.setAttribute("class", "list-group-item list-group-item-action");  
    btn.setAttribute("type", "button");  
    btn.innerText = liTxt;         
    return btn;
}

const changeSearch = ({target})=>{
    clearDisplay();
    document.getElementById('search-inpt').value=target.innerText;
    appendPokemonData();
    document.getElementById('data').style='display: block';
    document.getElementById('pokemon-list-opener').style='display: none';

}

const getPokemonData = async ()=>{
    const searchTxt=document.getElementById('search-inpt').value;
    const apiResult = await axios.get(`http://localhost:8080/pokemon/get/${searchTxt}/`,
        {headers: {"Access-Control-Allow-Origin":"*",'username': `${username}`}})
    const pokeData = apiResult.data;   
    return pokeData;
    
}


const changeToBackImg = async ()=>{
    const pokeRelevantData = await getPokemonData();
    document.getElementById("poke-img").src = pokeRelevantData.back_pic ;
}

const changeToFrontImg = async ()=>{
    const pokeRelevantData = await getPokemonData();
    document.getElementById("poke-img").src = pokeRelevantData.front_pic;
}

const closeNotFoundMsg = ()=>{
    document.getElementById('not-found-msg').style='display: none';
}

const displayPokemonData = async (e)=>{
    clearDisplay();
    if(await appendPokemonData())
    {
        document.getElementById('data').style='display: flex;';
    }
}

const clearDisplay =()=>{
    document.getElementById('not-found-msg').style='display: none';
    document.getElementById('data').style='display: none';
    document.getElementById('types-list').innerHTML = '';
    document.getElementById('pokemon-list').innerHTML = '';
};

const getPokémonsByType = async (target)=>{
    const type = target.innerText;
    const ApiResult = await axios.get(`https://pokeapi.co/api/v2/type/${type}/`);
    const pokeData = ApiResult.data;
    const PokémonArray = pokeData.pokemon.map((pokemon)=>pokemon.pokemon.name);
    return PokémonArray;
}

const handlePokListEvent= async({target})=>{
    document.getElementById('pokemon-list').innerHTML = '';
    appendPokemonByTypeList(await getPokémonsByType(target));
    document.getElementById('data').style='display: none';
    document.getElementById('pokemon-list-opener').style='display: block';
    
}

const closePokeList = ()=>{
    document.getElementById('pokemon-list-opener').style='display: none';
    document.getElementById('data').style='display: block';

}



const handleSingingSubmit =async (event)=>{
    event.preventDefault();
    username = document.getElementById('username-input').value;
    document.getElementById('username').innerText=username
    document.getElementById('signing-form').style='display: none !important'
    const res = await axios.post('http://localhost:8080/user/signin',{}, {
      headers: {'username': `${username}`}})
      console.log(res.data);  
}

const handleCatch = async()=>{
    const id = document.getElementById('poke-id').innerText;
    await axios.put(`http://localhost:8080/pokemon/catch/${id}`, { pokemon: await getPokemonData()}, {headers: {'username': `${username}`}})
}


const handleRelease = async()=>{
    const id = document.getElementById('poke-id').innerText;
    await axios.delete(`http://localhost:8080/pokemon/release/${id}`,{headers: {'username': `${username}`,
    'Accept' : 'application/json',
    'Authorization' : 'Bearer <token_here>'}})  
    document.getElementById('my-poke-list').innerHTML=''; 
}

const showPokemons = async()=>{
    const pokemonsArr = await axios.get('http://localhost:8080/pokemon/', {headers: {'username': `${username}`}})
    console.log(pokemonsArr.data); 
    for(pokemon of pokemonsArr.data){
        const btn = createBtnElement(pokemon.name);
        btn.addEventListener('click',changeSearch);
        document.getElementById('my-poke-list').appendChild(btn); 
    }}

const singing = async()=>{
    await axios.post('http://localhost:8080/pokemon/signin',{}, {headers: {'username': `${username}`}})  
}

//Event Listeners
document.getElementById('search-btn').addEventListener('click',displayPokemonData);
document.getElementById('poke-img').addEventListener('mouseover',changeToBackImg);
document.getElementById('poke-img').addEventListener('mouseout',changeToFrontImg);
document.getElementById('close-msg').addEventListener('click',closeNotFoundMsg);
document.getElementById('search-inpt').addEventListener('input',clearDisplay);
document.getElementById('close-pok-list-btn').addEventListener('click',closePokeList);

//
document.getElementById('submit-btn').addEventListener('click',handleSingingSubmit)
document.getElementById('catch-btn').addEventListener('click',handleCatch)
document.getElementById('release-btn').addEventListener('click',handleRelease)
document.getElementById('my-pokemons-btn').addEventListener('click',showPokemons)