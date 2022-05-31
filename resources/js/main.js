let throwed = false;
let run = true;
let throws = 0;
let dices = [];
let redGame = [];
let yellowGame = [];
let greenGame = [];
let blueGame = [];
let miniRound = 0;
let minPoint = 0;

// all the id's
const redIDs = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11'];
const yellowIDs = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'];
const greenIDs = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11'];
const blueIDs = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11'];
const diceIDs = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6'];
const throwDice = document.getElementById('G1');
const skipTurn = document.getElementById('H1');
const error = document.getElementById('error');
const again = document.getElementById('I3');

redIDs.forEach(redID => {
    document.getElementById(redID).onclick = addMove.bind(event, 'F1');
});

yellowIDs.forEach(yellowID => {
    document.getElementById(yellowID).onclick = addMove.bind(event, 'F2');
});

greenIDs.forEach(greenID => {
    document.getElementById(greenID).onclick = addMove.bind(event, 'F3');
});

blueIDs.forEach(blueID => {
    document.getElementById(blueID).onclick = addMove.bind(event, 'F4');
});


diceIDs.forEach(diceID => {
    document.getElementById(diceID).onclick = selectDices;
});

throwDice.onclick = throwDices;

again.onclick = playAgain;

// happens when the turn skips
skipTurn.onclick = function () {
    if (throwed && run) {
        miniRound = 2;
        minPoint += 5;
        document.getElementById('E5').innerHTML = minPoint;
        cleanDices();
        if (minPoint === 20) {
            endGame();
        }
    }
}

let dicesClicked = {
    F1: 0, F2: 0, F3: 0,
    F4: 0, F5: 0, F6: 0
}

let valueDices = {
    F1: 0, F2: 0, F3: 0,
    F4: 0, F5: 0, F6: 0
}

let gameRules = {
    A1: 2, A2: 3, A3: 4, A4: 5, A5: 6, A6: 7,
    A7: 8, A8: 9, A9: 10, A10: 11, A11: 12,
    B1: 2, B2: 3, B3: 4, B4: 5, B5: 6, B6: 7,
    B7: 8, B8: 9, B9: 10, B10: 11, B11: 12, C1: 12,
    C2: 11, C3: 10, C4: 9, C5: 8, C6: 7, C7: 6,
    C8: 5, C9: 4, C10: 3, C11: 2, D1: 12, D2: 11,
    D3: 10, D4: 9, D5: 8, D6: 7, D7: 6, D8: 5, D9: 4, D10: 3, D11: 2
}

function endGame() {
    document.getElementById('I1').style.display = 'block';
    document.getElementById('I2').innerHTML = document.getElementById('E6').innerHTML;
    run = false;
}

function playAgain() {
    throwed = false;
    run = true;
    throws = 0;
    redGame = [];
    yellowGame = [];
    greenGame = [];
    blueGame = [];
    miniRound = 0;
    minPoint = 0;
    cleanDices;
    document.getElementById('I1').style.display = 'none';
    document.getElementById('throws').innerHTML = '0';

    for (let i = 1; i < 7; i++) {
        document.getElementById('E' + i).innerHTML = '0';
    }

    for (let i = 1; i < 13; i++) {
        document.getElementById('A' + i).style.backgroundColor = '';
        document.getElementById('B' + i).style.backgroundColor = '';
        document.getElementById('C' + i).style.backgroundColor = '';
        document.getElementById('D' + i).style.backgroundColor = '';
    }

}

function addMove(diceID, event) {
    if (dices.length === 2) {

        const sumDice = sumDices();

        if (dicesClicked['F5'] && dicesClicked['F6'] && miniRound === 1) {
            error.innerHTML = "Kies een kleur en een witte dobbelsteen. Deze combinatie is niet meer mogelijk.";
        }
        else if ((dicesClicked[diceID] && (dicesClicked['F5'] || dicesClicked['F6'])) ||
            dicesClicked['F5'] && dicesClicked['F6']) {

            if (sumDice === gameRules[event.target.id]) {

                checkArray(diceID, event, sumDice);

            } else {
                error.innerHTML = "Selecteer een vak dat gelijk is aan de som van de dobbelstenen.";
            }

        } else {
            error.innerHTML = "Kies een juiste kleur dobbelsteen en een witte of twee witte dobbelstenen.";
        }

    } else {
        error.innerHTML = "Selecteer eerst twee dobbelstenen.";
    }
}

function checkArray(diceID, event, sumDice) {

    let arrayLength = 0;
    let arrayBefore = 0;

    switch (diceID) {
        case 'F1':
            arrayLength = redGame.length;
            arrayBefore = redGame[arrayLength - 1];
            break;
        case 'F2':
            arrayLength = yellowGame.length;
            arrayBefore = yellowGame[arrayLength - 1];
            break;
        case 'F3':
            arrayLength = greenGame.length;
            arrayBefore = greenGame[arrayLength - 1];
            break;
        case 'F4':
            arrayLength = blueGame.length;
            arrayBefore = blueGame[arrayLength - 1];
            break;
    }

    if (arrayLength === 0 ||
        ((sumDice > arrayBefore) && (diceID === 'F1' || diceID === 'F2')) ||
        ((sumDice < arrayBefore) && (diceID === 'F3' || diceID === 'F4'))
    ) {

        event.target.style.backgroundColor = '#5DE23C';

        switch (diceID) {
            case 'F1':
                redGame.push(sumDice);
                document.getElementById('E1').innerHTML = calculateScore(redGame);
                break;
            case 'F2':
                yellowGame.push(sumDice);
                document.getElementById('E2').innerHTML = calculateScore(yellowGame);
                break;
            case 'F3':
                greenGame.push(sumDice);
                document.getElementById('E3').innerHTML = calculateScore(greenGame);
                break;
            case 'F4':
                blueGame.push(sumDice);
                document.getElementById('E4').innerHTML = calculateScore(blueGame);
                break;
        }

        if (dicesClicked['F5'] && dicesClicked['F6']) {
            miniRound++;
        } else {
            miniRound = 2;
        }

        cleanDices();
        checkWinner();

    } else {
        error.innerHTML = "Je moet een item rechts van je laatste zet plaatsen.";
    }
}

function checkWinner() {

    const rg = redGame.includes(12);
    const yg = yellowGame.includes(12);
    const gg = greenGame.includes(2);
    const bg = blueGame.includes(2);

    if (rg && yg ||
        rg && gg ||
        rg && bg ||
        yg && gg ||
        yg && bg ||
        gg && bg
    ) {
        endGame();
    }
}

function cleanDices() {

    if (miniRound === 1) {
        for (let i = 1; i < 7; i++) {
            dicesClicked['F' + i] = 0;
            document.getElementById('F' + i).style.boxShadow = '';
        }
        dices = [];
    } else if (miniRound === 2) {
        for (let i = 1; i < 7; i++) {
            valueDices['F' + i] = 0;
            dicesClicked['F' + i] = 0;
            document.getElementById('F' + i).innerHTML = '-';
            document.getElementById('F' + i).style.boxShadow = '';
        }
        miniRound = 0;
        throwed = false;
        dices = [];
    }

    error.innerHTML = "";
    calculateEndScore();
}

function calculateEndScore() {

    let total = 0;

    for (let i = 1; i < 6; i++) {
        if (i === 5) {
            total -= parseInt(document.getElementById("E" + i).innerHTML);
        } else {
            total += parseInt(document.getElementById("E" + i).innerHTML);
        }

    }

    document.getElementById('E6').innerHTML = total;
}

function sumDices() {

    let sum;

    if (dices.length === 1) {
        sum = dices[0];
    } else if (dices.length === 2) {
        sum = dices[0] + dices[1];
    } else {
        sum = 0
    }

    return sum;
}

function throwDices() {

    if (run) {

        if (!throwed && run) {

            for (let i = 1; i < 7; i++) {
                valueDices['F' + i] = Math.floor(Math.random() * 6 + 1);
                document.getElementById('F' + i).innerHTML = valueDices['F' + i];
            }
            throwed = true;
            throws++;
            document.getElementById('throws').innerHTML = throws;
        } else {
            error.innerHTML = "speel eerst deze beurt af.";
        }

    } else {
        error.innerHTML = 'Start een nieuw spel.';
    }
}

function selectDices(event) {

    if (throwed) {

        if (dicesClicked[event.target.id] === 0 && dices.length < 2) {

            dicesClicked[event.target.id] = 1;
            event.target.style.boxShadow = "0 0 10px #5DE23C";

            dices.push(valueDices[event.target.id]);

        } else if (dicesClicked[event.target.id] === 1) {

            event.target.style.boxShadow = '';
            dicesClicked[event.target.id] = 0;

            if (dices.length === 2) {
                if (dices[1] === valueDices[event.target.id]) {
                    dices.pop();
                } else {
                    dices.shift();
                }
            } else {
                dices = [];
            }
        }
    }
}

function calculateScore(array) {

    let score = array.length;
    let output = 0;

    if (score >= 5) {
        score += 1;
    }

    switch (score) {
        case 1:
            output = 1;
            break;
        case 2:
            output = 3;
            break;
        case 3:
            output = 6;
            break;
        case 4:
            output = 10;
            break;
        case 5:
            output = 15;
            break;
        case 6:
            output = 21;
            break;
        case 7:
            output = 28;
            break;
        case 8:
            output = 36;
            break;
        case 9:
            output = 45;
            break;
        case 10:
            output = 55;
            break;
        case 11:
            output = 66;
            break;
        case 12:
            output = 78;
            break;
    }

    return output;
}
