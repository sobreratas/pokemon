const form = document.querySelector("form")
const input = document.querySelector("input")
const container = document.querySelector("#container")

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    container.innerHTML = ''
    let searchTerm = form.elements.query.value.toLowerCase();
    if(searchTerm === "mr mime" || searchTerm === "mr. mime" || searchTerm === "Mr. Mime") {
        searchTerm = "mr-mime";
    } else if (searchTerm === "farfetch'd"){
        searchTerm = "farfetchd"
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
    }
})

function showError() {
    const name = document.querySelector("name")
    const h1 = document.createElement('h1');
    h1.textContent = "ERROR: Pokémon does not exist. ";
    h1.style.color = "red"
    container.append(h1);

    const number = document.querySelector("number")
    const p = document.createElement('p');
    p.textContent = "Please enter a new search term above.";
    container.append(p);

    container.style.background = "white"
}

function loopMoves(info) {
    if (info.name == "ditto" || info.name == "unown") {
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

const setData = (info) => {
    if (info.name === "mr-mime") {
        const name = document.querySelector("name")
        const h1 = document.createElement('h1');
        h1.textContent = "Mr. Mime";
        container.append(h1);
    } else {
        const name = document.querySelector("name")
        const h1 = document.createElement('h1');
        h1.textContent = info.name.charAt(0).toUpperCase() + info.name.slice(1).toLowerCase();
        container.append(h1);
    }

    const number = document.querySelector("number")
    const p = document.createElement('p');
    p.textContent = "No. " + info.id;
    container.append(p);

    const pokeType = document.querySelector(".type")
    const pType = document.createElement('p');
    pType.textContent = "Type: " + info.types[0].type.name.charAt(0).toUpperCase() + info.types[0].type.name.slice(1).toLowerCase();
    container.append(pType)

    const photo = document.querySelector("photo")
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
    } else if (info.types[0].type.name === "rock" || info.types[0].type.name === "fighting") {
        container.style.background = "burlywood";
    } else if (info.types[0].type.name === "steel") {
        container.style.background = "lightgrey";
    } else if (info.types[0].type.name === "dark") {
        container.style.background = "dimgrey";
    }
}