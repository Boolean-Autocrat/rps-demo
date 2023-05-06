function game() {
    let playerPoints = document.getElementById("player-pts")
    playerPoints.textContent = 0;
    let computerPoints = document.getElementById("computer-pts")
    computerPoints.textContent = 0;
    let buttons = Array.from(document.getElementsByClassName("btn"));
    let playerSelection = "";
    document.getElementsByClassName("option-display")[0].innerHTML = `<p id="player-option">Player: <span id="player-opt"/></p><p id="computer-option">Computer: <span id="computer-opt"/></p>`;
    document.getElementsByClassName("option-display")[0].style.paddingTop = "0.5em";
    document.getElementsByClassName("option-display")[0].style.paddingBottom = "0.5em";
    let roundResult = document.getElementById("round-result");
    roundResult.textContent = "";
    document.getElementById("result").textContent = "";
    document.getElementById("round-no").textContent = "Round #0";
    let restart = document.getElementsByClassName("btn-container")[0];
    restart.innerHTML = "";

    function computerPlay() {
        let choices = ["rock", "paper", "scissors"];
        return choices[Math.floor(Math.random() * 3)];
    }

    function playRound(playerSelection, computerSelection) {
        if (playerSelection === "rock" && computerSelection === "scissors") {
            document.getElementById("player-pts").textContent = parseInt(document.getElementById("player-pts").textContent) + 1;
            roundResult.textContent = "Player +1 Rock beats scissors.";
        } else if (playerSelection === "rock" && computerSelection === "paper") {
            document.getElementById("computer-pts").textContent = parseInt(document.getElementById("computer-pts").textContent) + 1;
            roundResult.textContent = "Computer +1 Paper beats rock.";
        } else if (playerSelection === "paper" && computerSelection === "rock") {
            document.getElementById("player-pts").textContent = parseInt(document.getElementById("player-pts").textContent) + 1;
            roundResult.textContent = "Player +1 Paper beats rock.";
        } else if (playerSelection === "paper" && computerSelection === "scissors") {
            document.getElementById("computer-pts").textContent = parseInt(document.getElementById("computer-pts").textContent) + 1;
            roundResult.textContent = "Computer +1 Scissors beats paper.";
        } else if (playerSelection === "scissors" && computerSelection === "paper") {
            document.getElementById("player-pts").textContent = parseInt(document.getElementById("player-pts").textContent) + 1;
            roundResult.textContent = "Player +1 Scissors beats paper.";
        } else if (playerSelection === "scissors" && computerSelection === "rock") {
            document.getElementById("computer-pts").textContent = parseInt(document.getElementById("computer-pts").textContent) + 1;
            roundResult.textContent = "Computer +1 Rock beats scissors.";
        }
    }

    let i = 0;

    function resultDeclare() {
        if (parseInt(playerPoints.textContent) == 3 || parseInt(computerPoints.textContent) == 3) {
            buttons.forEach(element => {
                element.removeEventListener("click", getSelections)
            });
            if (parseInt(playerPoints.textContent) > parseInt(computerPoints.textContent)) {
                document.removeEventListener('DOMSubtreeModified', resultDeclare);
                document.getElementById("result").innerHTML = "Player wins! &#127881;";
            } else if (parseInt(playerPoints.textContent) < parseInt(computerPoints.textContent)) {
                document.removeEventListener('DOMSubtreeModified', resultDeclare);
                document.getElementById("result").innerHTML = "Computer wins! &#128557;";
            } else {
                document.removeEventListener('DOMSubtreeModified', resultDeclare);
                document.getElementById("result").textContent = "It's a tie!";
            }
            document.getElementById("round-no").textContent = "Game Over";
            document.getElementsByClassName("option-display")[0].innerHTML = "";
            document.getElementsByClassName("option-display")[0].style.paddingTop = "0";
            document.getElementsByClassName("option-display")[0].style.paddingBottom = "0";
            restart.innerHTML = `<div onclick="game()" id="play-again">Play Again</div>`;
            document.getElementById("round-result-outer").innerHTML = `<div id="round-result"></div>`;
        }
    }

    document.addEventListener('DOMSubtreeModified', resultDeclare);

    function getSelections(event) {
        i++;
        document.getElementById("round-no").textContent = `Round #${i}`
        playerSelection = event.target.id;
        if (playerSelection == "") {
            playerSelection = event.target.parentNode.id;
        }
        computerSelection = computerPlay();
        document.getElementById("player-opt").textContent = playerSelection;
        document.getElementById("computer-opt").textContent = computerSelection;
        playRound(playerSelection, computerSelection);
    }
    buttons.forEach(element => {
        element.addEventListener("click", getSelections)
    });
};