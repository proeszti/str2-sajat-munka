const getImage = (foundElement) => {

    const getTop = document.querySelector(".top")
    getTop.innerHTML = "";

    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = foundElement.name;

    const bioDiv = document.createElement("div");
    bioDiv.innerHTML = foundElement.bio;
    bioDiv.classList.add("bioDiv");
    nameDiv.classList.add("nameDiv");

    const img = document.createElement("img");
    img.setAttribute("src", foundElement.picture);
    getTop.appendChild(img);
    img.classList.add("img");

    const img1 = document.createElement("img");
    img1.setAttribute("src", `assets/houses/${foundElement.house}.png`);
    getTop.appendChild(img1);
    img1.classList.add("img1");

    getTop.appendChild(nameDiv);
    getTop.appendChild(bioDiv);


};


fetch("./json/got.json").then(e => e.json()).then(data => start(data.filter(e => !e.dead).sort((a, b) => a.name.localeCompare(b.name))));

const start = (characters) => {
    console.log(characters);
    putCharactersIntoDiv(characters);
};

const putCharactersIntoDiv = (characters) => {

    const main = document.querySelector(".main");
    let characterIndex = 0;

    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {

        const row = document.createElement("div");
        row.classList.add("row");

        for (let colIndex = 0; colIndex < 8; colIndex++) {


            const col = document.createElement("div");
            col.classList.add("col");
            let char = characters[characterIndex];

            const image = document.createElement("img");
            image.setAttribute("src", char.portrait)
            image.setAttribute("data-got-name", char.name);
            col.appendChild(image);

            const name = document.createElement("div");
            name.innerHTML = char.name;
            col.appendChild(name);
            image.classList.add("image");
            name.classList.add("name");



            image.addEventListener("click", (e) => {

                const name = e.target.dataset.gotName;
                const foundElement = characters.find(char => char.name === name)
                getImage(foundElement);
                console.log(name);



            })
            row.appendChild(col);
            characterIndex = characterIndex + 1;
        }

        main.appendChild(row);
    }
    const search = document.getElementById("search");
    search.addEventListener("input", (e) => {
        const searchTerm = e.target.value;
        console.log(searchTerm);
        const foundCharacter = characters.find(char => char.name.toLowerCase() === searchTerm);
        console.log(foundCharacter);

        const getTop = document.querySelector(".top")

        if (!foundCharacter) {
            getTop.innerHTML = "not found";
        }
        else {
            getImage(foundCharacter);
        }
    })
}

