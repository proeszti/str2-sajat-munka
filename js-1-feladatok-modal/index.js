
const openModal = (element) => {
    element.addEventListener("click", () => {
        const gray = document.querySelector(".gray");
        gray.classList.remove("hidden");
    });
}

const gray = document.querySelector(".gray");
gray.addEventListener("click", () => {
    gray.classList.add("hidden");
});


const showModalButton = document.getElementById("showModal");
openModal(showModalButton);

