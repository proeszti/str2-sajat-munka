
let timerInterval = null;
const timer = document.getElementById("timer");

const getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const start = () => {
    const icons = ["fa-grav", "fa-asterisk", "fa-commenting", "fa-bomb", "fa-bath", "fa-grav", "fa-asterisk", "fa-commenting", "fa-bomb", "fa-bath"];
    const usedIndexes = [];
    const cards = document.querySelectorAll(".flip-card");
    let firstCardClass = null;
    let secondCardClass = null;

    for (let i = 0; i < icons.length; i++) {
        const card = cards[i];

        let iconIndex = getRandomNumberBetween(0, 9);

        while (usedIndexes.includes(iconIndex)) {
            iconIndex = getRandomNumberBetween(0, 9);
        }
        usedIndexes.push(iconIndex);
        card.querySelector(".fa").classList.add(icons[iconIndex]);

        card.addEventListener("click", (e) => {

            if (firstCardClass === null) {
                card.classList.add("flipped");
                firstCardClass = card.querySelector(".fa").className;
            }
            else if (secondCardClass === null) {
                card.classList.add("flipped");
                secondCardClass = card.querySelector(".fa").className;

                if (secondCardClass === firstCardClass) {
                    const flippedCards = document.querySelectorAll(".flipped");
                    flippedCards.forEach(e => {
                        e.classList.add("found");
                    });
                }
            }
            else {
                const flippedCards = document.querySelectorAll(".flipped");
                flippedCards.forEach(e => e.classList.remove("flipped"));
                card.classList.add("flipped");
                firstCardClass = card.querySelector(".fa").className;
                secondCardClass = null;
            }


            const numberOfFound = document.querySelectorAll(".found").length;

            if (timerInterval === null) {
                timerInterval = setInterval(handleTime, 1000);
            }
            else if (numberOfFound === 10) {
                clearInterval(timerInterval);
            }


        });
    }

};

const handleTime = () => {

    const minutesAndSeconds = timer.innerHTML.split(":");
    const minutes = parseInt(minutesAndSeconds[0]);
    const seconds = parseInt(minutesAndSeconds[1]);

    const newMinutes = minutes + parseInt((seconds / 60));
    const newMinutesString = newMinutes < 10 ? "0" + newMinutes.toString() : newMinutes.toString();
    const newSeconds = (seconds % 60) + 1;
    const newSecondsString = newSeconds < 10 ? "0" + newSeconds.toString() : newSeconds.toString();

    timer.innerHTML = newMinutesString + ":" + newSecondsString;
};

start();