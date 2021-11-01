let matrix = [];
let stepCount = 0;
let cols = 3;
let rows = 3;
let mark = "x";


const initState = () => {

    for (let i = 0; i < rows; i++) {
        let row = [];
        matrix.push(row);
        for (let n = 0; n < cols; n++) {
            row.push(null);
        }
    }


}
const changeMatrixValue = (element) => {
    const row = parseInt(element.dataset.row, 10);
    const cell = parseInt(element.dataset.cell, 10);
    matrix[row][cell] = element.textContent;
}

const deleteSigns = () => {
    let cells = document.querySelectorAll(".cell")
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
}

const increaseCounter = () => {
    stepCount = stepCount + 1;
}

const modifyCell = (element) => {

    element.innerHTML = mark;
    element.addEventListener("click", (e) => {
        e.target.removeEventListener("click", handleClick)
    });
}

const setMark = () => {

    if (mark === "x") {
        mark = "0";

    } else {
        mark = "x";
    }
}

const handleClick = (event) => {
    increaseCounter();
    modifyCell(event.target);
    setMark();
    changeMatrixValue(event.target);
    checkWinner();
}
const addClickListener = () => {
    let cells = document.querySelectorAll(".cell")
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", (e) => {
            handleClick(e);
        })
    }
}

const removeAllClickListeners = () => {
    let cells = document.querySelectorAll(".cell")
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", (e) => {
            e.target.removeEventListener("click", handleClick);
        })
    }
}

const checkValues = (matrix) => matrix.map(row => {
    return row.every(e => e === "x") || row.every(e => e === "0");
}
)
    .indexOf(true) !== -1;

const checkColumnValues = () =>
    checkValues(matrix.map((array, i) =>
        array.map((item, j) => matrix[j][i])));

const checkDiagonalValues = () =>
    checkValues([
        matrix.map((array, i) => matrix[i][i]),
        matrix.map((array, i) => matrix[i][matrix[i].length - i - 1])
    ])

const checkWinner = () => {
    const columnVlaues = checkColumnValues();
    console.log(columnVlaues);
    const diagonalValues = checkDiagonalValues();
    console.log(diagonalValues);

    const checkMatrix = checkValues(matrix);

    if (columnVlaues === true || diagonalValues === true || checkMatrix === true) {
        endGame();
    }

};

const setMessage = (message) => {
    const element = document.querySelector(".message");
    element.innerHTML = message;
}
const startGame = () => {
    initState()
    addClickListener()
    newGame()
}
const endGame = () => {
    const message = 'The winner is Player ' + (mark === 'x' ? '0' : 'x') + '.';
    setMessage(message);
    removeAllClickListeners()
}
const newGame = () => {
    const button = document.getElementById("start");
    button.addEventListener("click", (e) => {

        initState()
        addClickListener()
        deleteSigns()
        setMessage('Playing...')
        setMark()
    });

}

startGame();
