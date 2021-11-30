fetch("./db.json").then(e => e.json()).then(data => start(data.filter(e => !e.dead).sort((a, b) => a.name.localeCompare(b.name))));


const putDataIntoDiv = (data) => {
    const main = document.querySelectorAll("main");
    let dataIndex = 0;

    for (let rowIndex = 0; rowIndex < 100; rowIndex++) {

        const row = document.createElement("div");
        row.classList.add("row");

        for (let colIndex = 0; colIndex < 5; colIndex++) {

            const col = document.createElement("div");
            col.classList.add("col");
            let users = data[dataIndex];

            const idDiv = document.createElement("div");
            idDiv.innerHTML = data.users.id;

        }
    }
}