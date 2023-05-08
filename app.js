const form = document.querySelector("form")
const input = document.querySelector("input")
const container = document.querySelector("#container")
const gen1Modal = document.querySelector(".gen1-modal")
const gen2Modal = document.querySelector(".gen2-modal")
const gen3Modal = document.querySelector(".gen3-modal")
const gen1Btn = document.querySelector(".gen1-btn")
const gen2Btn = document.querySelector(".gen2-btn")
const gen3Btn = document.querySelector(".gen3-btn")
const gen1CloseBtn = document.querySelector(".gen1-close-btn")
const gen2CloseBtn = document.querySelector(".gen2-close-btn")
const gen3CloseBtn = document.querySelector(".gen3-close-btn")

//GEN 1 MODAL OPEN AND CLOSE
gen1Btn.addEventListener('click', function(){
    gen1Modal.classList.add("open-modal")
})

gen1CloseBtn.addEventListener('click', function(){
    gen1Modal.classList.remove("open-modal")
    
})

//GEN 2 MODAL OPEN AND CLOSE
gen2Btn.addEventListener('click', function(){
    gen2Modal.classList.add("open-modal")
})

gen2CloseBtn.addEventListener('click', function(){
    gen2Modal.classList.remove("open-modal")
    
})

//GEN 3 MODAL OPEN AND CLOSE
gen3Btn.addEventListener('click', function(){
    gen3Modal.classList.add("open-modal")
})

gen3CloseBtn.addEventListener('click', function(){
    gen3Modal.classList.remove("open-modal")
    
})

//FORM SUBMISSION CODE
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    container.innerHTML = ''
    let searchTerm = form.elements.query.value.toLowerCase();
    if(searchTerm === "mr mime" || searchTerm === "mr. mime") {
        searchTerm = "mr-mime";
    } else if (searchTerm === "farfetch'd"){
        searchTerm = "farfetchd"
    } else if(searchTerm === "mime jr" || searchTerm === "mime jr.") {
        searchTerm = "mime-jr";
    } else if(searchTerm === "hooh" || searchTerm === "ho-oh" || searchTerm === "ho oh") {
        searchTerm = "ho-oh";
    }

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        const data = await res.json();
        setData(data)
        form.elements.query.value = '';
        loopMoves(data)
        setBackgroundColor(data);
    } catch {
        showError();
        form.elements.query.value = '';
    }
    gen1Modal.classList.remove("open-modal")
    gen2Modal.classList.remove("open-modal")
    gen3Modal.classList.remove("open-modal")
})

function showError() {
    
    const h1 = document.createElement('h1');
    h1.textContent = "ERROR: Pokémon does not exist. ";
    h1.style.color = "red"
    container.append(h1);

    
    const p = document.createElement('p');
    p.textContent = "Please enter a new search term above.";
    container.append(p);

    container.style.background = "white"
}

//LOOP MOVES ARRAY ONLY 4 TIMES

function loopMoves(info) {
    if (info.name == "ditto" || info.name == "unown" || info.name == "smeargle") {
        const newLi = document.createElement("li");
        newLi.innerHTML = info.moves[0].move.name.charAt(0).toUpperCase() + info.moves[0].move.name.slice(1).toLowerCase();
        container.append(newLi)
    } else {
        for (i = 0; i < 4; i++) {
            const newLi = document.createElement("li");
            newLi.innerHTML = info.moves[i].move.name.charAt(0).toUpperCase() + info.moves[i].move.name.slice(1).toLowerCase();
            container.append(newLi)
        }
    }
}

//SET DATA FUNCTION (CATCH NAME EXCEPTIONS)

const setData = (info) => {
    if (info.name === "mr-mime") {
        
        const h1 = document.createElement('h1');
        h1.textContent = "Mr. Mime";
        container.append(h1);
    } else if (info.name === "mime-jr") {
        
        const h1 = document.createElement('h1');
        h1.textContent = "Mime Jr.";
        container.append(h1);
    } else if (info.name === "farfetchd") {
        
        const h1 = document.createElement('h1');
        h1.textContent = "Farfetch'd";
        container.append(h1);
    } else if (info.name === "ho-oh") {
        
        const h1 = document.createElement('h1');
        h1.textContent = "Ho-Oh";
        container.append(h1);
    } else {
        
        const h1 = document.createElement('h1');
        h1.textContent = info.name.charAt(0).toUpperCase() + info.name.slice(1).toLowerCase();
        container.append(h1);
    }

    
    const p = document.createElement('p');
    p.textContent = "No. " + info.id;
    container.append(p);

    
    const pType = document.createElement('p');
    pType.textContent = "Type: " + info.types[0].type.name.charAt(0).toUpperCase() + info.types[0].type.name.slice(1).toLowerCase();
    container.append(pType)

    
    const img = document.createElement('img');
    img.src = info.sprites.front_default;
    container.append(img);
}

function setBackgroundColor(info) {
    if (info.types[0].type.name === "fire") {
        container.style.background = "lightcoral";
    } else if (info.types[0].type.name === "water" || info.types[0].type.name === "ice") {
        container.style.background = "lightblue";
    } else if (info.types[0].type.name === "grass" || info.types[0].type.name === "bug" || info.types[0].type.name === "poison") {
        container.style.background = "lightgreen";
    } else if (info.types[0].type.name === "electric") {
        container.style.background = "yellow";
    } else if (info.types[0].type.name === "psychic" || info.types[0].type.name === "ghost") {
        container.style.background = "lavender";
    } else if (info.types[0].type.name === "normal" || info.types[0].type.name === "fairy" || info.types[0].type.name === "flying" || info.types[0].type.name === "dragon") {
        container.style.background = "white";
    } else if (info.types[0].type.name === "rock" || info.types[0].type.name === "fighting" || info.types[0].type.name === "ground") {
        container.style.background = "burlywood";
    } else if (info.types[0].type.name === "steel") {
        container.style.background = "lightgrey";
    } else if (info.types[0].type.name === "dark") {
        container.style.background = "dimgrey";
    }
}