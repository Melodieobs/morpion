let cells = document.querySelectorAll('.cell');

let gameStatus = document.getElementById('gameStatus');
let endGameStatus = document.getElementById('endGameStatus');
let recommencer = document.querySelector('input')

// Les joueurs
const playerOne = 'X';
const playerTwo = 'O';

let joueurs = prompt(`Saisissez si ${playerTwo} commence ou si ${playerOne} commence`);
// Tant que la valeur est differente de o ou de x elle lui redemendera 
while(joueurs != playerOne && joueurs != playerTwo && joueurs != 'Melodie'){
    joueurs = prompt(`Vous ne pouvez choisir que entre ${playerTwo} et ${playerOne} !`)
}
if(joueurs === 'Melodie'){
    miseAjourStatus('GagneMelodie')
    endGame()
}
if(joueurs === playerOne){
    playerTurn = playerOne;
}
if (joueurs === playerTwo) {
    playerTurn = playerTwo;
}

const patternCase = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
]
// ajouter un click sur chaque cellule

// once: true permet de faire que un seul click apres on ne pourras plus
cells.forEach(cell => {
    cell.addEventListener('click', element,{once: true} )
})

function element(e){
    e.target.innerHTML = playerTurn;

    if(checkWin(playerTurn)){
        miseAjourStatus("Gagne" + playerTurn);
        return endGame();
    } else if(checkMatchNull()){
        miseAjourStatus('matchNull');
        return endGame()
    }

    miseAjourStatus(playerTurn);
    // verifier si c'est au joueur 1 ou 2 
    if(playerTurn === playerOne){
        playerTurn = playerTwo;
    } else if (playerTurn === playerTwo){
        playerTurn = playerOne;
    
}
}

function checkWin(playerTurn){
    // On va verifier chaque combinaison
    // en lui fesant un test verifier si l'index et egale
    // on test chaque paterne que si elle est égale au simbole du player
    return patternCase.some(combi => {
        return combi.every(index => {
            return cells[index].innerHTML === playerTurn;
        });
    })
}

function checkMatchNull(){
    // Verifier si chaque celulle posede soit le jouer 1 ou 2
    // on coupe l'objet en arret transforme en arret d'element et donc 
    // on peut utilide .every 
    return [...cells].every(cell => {
        return cell.innerHTML == playerOne || cell.innerHTML == playerTwo
    });
}

function miseAjourStatus(status){
    let statusText;

    switch (status) {
        case `${playerOne}` : 
        statusText = `Au tour du joueur ${playerTwo}`;
        break;

        case `${playerTwo}` : 
        statusText =`Au tour du joueur ${playerOne}`;
        break;

        case `Gagne${playerOne}` : 
        statusText =`Le joueur ${playerOne} à gagner`;
        break;

        case'GagneMelodie' :
        statusText = "Melodie est toujours une gagnante !!";
        break;

        case `Gagne${playerTwo}` : 
        statusText =`Le joueur ${playerTwo} à gagner`;
        break;

        case 'matchNull' : 
        statusText ='Le match est null !';
        break;
    }

    gameStatus.innerText = statusText;
    endGameStatus.innerText = statusText;
}
function endGame(){
    let gameend = document.getElementById('gameEndnone')
    gameend.id = 'gameEndblock'
}

recommencer.addEventListener('click', defau => {
    defau.preventDefault();
    window.location.reload()
})