

fetch("http://localhost:3000/users")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        createTable(data);
    });

let USER_EDIT = null;

const main = document.querySelector(".main");

const createTable = (users) => {

    const table = document.createElement("table");


    for (let rowIndex = 0; rowIndex < users.length; rowIndex++) {
        const user = users[rowIndex];
        main.appendChild(table);

        const tr = document.createElement("tr");
        //tr.setAttribute("data-user-id", user.id)
        table.appendChild(tr);


        const idCell = document.createElement("td");
        tr.appendChild(idCell);
        idCell.innerHTML = user.id;

        const nameCell = document.createElement("td");
        tr.appendChild(nameCell);
        nameCell.innerHTML = user.name;

        const emailAddressCell = document.createElement("td");
        tr.appendChild(emailAddressCell);
        emailAddressCell.innerHTML = user.emailAddress;

        const addressCell = document.createElement("td");
        tr.appendChild(addressCell);
        addressCell.innerHTML = user.address;

        const buttonsCell = document.createElement("td");
        const deleteBotton = document.createElement("button");
        deleteBotton.innerHTML = "Törlés";
        const editBotton = document.createElement("button");
        editBotton.innerHTML = "Szerkesztés";

        const saveBotton = document.createElement("button");
        saveBotton.innerHTML = "Mentés";
        const cancelBotton = document.createElement("button");
        cancelBotton.innerHTML = "Visszavonás";

        editBotton.addEventListener("click", (e) => {

            if (USER_EDIT === null) {
                editData(user, tr);
            }
            else {
                showWindow("Először be kell fejezned az aktuális szerkesztést", "error");
            }

        });

        deleteBotton.addEventListener("click", (e) => {
            deleteData(user.id, tr);

        });

        saveBotton.addEventListener("click", (e) => {
            saveEditedData(user, tr);
        });

        cancelBotton.addEventListener("click", (e) => {
            cancelData(user, tr);
        });

        const deleteAndEditButtons = document.createElement("span");
        deleteAndEditButtons.classList.add("delete-and-edit-buttons");
        deleteAndEditButtons.appendChild(deleteBotton);
        deleteAndEditButtons.appendChild(editBotton);

        const saveAndCancelButtons = document.createElement("span");
        saveAndCancelButtons.classList.add("hidden");
        saveAndCancelButtons.classList.add("save-and-cancel-buttons");
        saveAndCancelButtons.appendChild(saveBotton);
        saveAndCancelButtons.appendChild(cancelBotton);

        buttonsCell.appendChild(deleteAndEditButtons);
        buttonsCell.appendChild(saveAndCancelButtons);

        tr.appendChild(buttonsCell);
    }
};

const cancelData = (user, tr) => {
    console.log("data");

    const tds = tr.querySelectorAll("td");

    tds[1].innerHTML = user.name;
    tds[2].innerHTML = user.emailAddress;
    tds[3].innerHTML = user.address;

    hideSaveAndCancel(tr);
    USER_EDIT = null;
};

const saveEditedData = (user, tr) => {
    const inputs = tr.querySelectorAll("td input");
    const userToEdit = {};
    userToEdit.name = inputs[0].value;
    userToEdit.emailAddress = inputs[1].value;
    userToEdit.address = inputs[2].value;

    console.log("userToEdit", userToEdit);

    fetch("http://localhost:3000/users/" + user.id, {
        body: JSON.stringify(userToEdit),
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(data => data.json())
        .then(updatedUser => {
            console.log("updatedUser", updatedUser);
            hideSaveAndCancel(tr);

            const tds = tr.querySelectorAll("td");
            tds[1].innerHTML = updatedUser.name;
            tds[2].innerHTML = updatedUser.emailAddress;
            tds[3].innerHTML = updatedUser.address;
            showWindow("Sikeres mentés", "success");
        });
};

const editData = (user, tr) => {
    console.log("edit data");

    USER_EDIT = user;

    const tds = tr.querySelectorAll("td");

    const nameInput = document.createElement("input");
    nameInput.value = user.name;
    tds[1].innerHTML = "";
    tds[1].appendChild(nameInput);

    const emailInput = document.createElement("input");
    emailInput.value = user.emailAddress;
    tds[2].innerHTML = "";
    tds[2].appendChild(emailInput);

    const addressInput = document.createElement("input");
    addressInput.value = user.address;
    tds[3].innerHTML = "";
    tds[3].appendChild(addressInput);


    showSaveAndCancel(tr);

};

const showSaveAndCancel = (tr) => {
    const saveAndCancelButtons = tr.querySelector(".save-and-cancel-buttons");
    saveAndCancelButtons.classList.remove("hidden");
    const deleteAndEditButtons = tr.querySelector(".delete-and-edit-buttons");
    deleteAndEditButtons.classList.add("hidden");
};

const hideSaveAndCancel = (tr) => {
    const saveAndCancelButtons = tr.querySelector(".save-and-cancel-buttons");
    saveAndCancelButtons.classList.add("hidden");
    const deleteAndEditButtons = tr.querySelector(".delete-and-edit-buttons");
    deleteAndEditButtons.classList.remove("hidden");
};


const deleteData = (userId, tr) => {
    console.log("delete data", userId, tr);
    return fetch("http://localhost:3000/users/" + userId, {
        method: 'delete'
    })
        .then(() => {
            tr.parentNode.removeChild(tr);
            USER_EDIT = null;
        });

};

const showWindow = (message, type) => {
    const windowDiv = document.createElement("div");

    if (type === "error") {
        windowDiv.style.backgroundColor = "red";
    }
    else if (type === "success") {
        windowDiv.style.backgroundColor = "green";
    }

    windowDiv.innerHTML = message;
    const messeges = document.querySelector(".messages");
    messeges.appendChild(windowDiv);
    setTimeout(() => { messeges.removeChild(windowDiv) }, 5000);
}