
let deckId
let computerScore = 0
let playerScore = 0 
const computer = document.getElementById("cpuScore")
const player = document.getElementById("playerScore")
const cards = document.getElementById("cards")
const newDeck =  document.getElementById("btn")
const message = document.getElementById("message")
const remainingCards =  document.getElementById("cards-left")
const draw = document.createElement("button")
draw.textContent = "Draw" 
draw.classList.add("draw-card")
document.body.appendChild(draw)

newDeck.addEventListener("click", clicked) 
    function clicked(){
        fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")                         
        .then(response => response.json())
        .then(data => {
             remainingCards.innerHTML= `<h5 class = "remaining"> Remaining Cards:  
                        ${data.remaining}</h5>`
            console.log(data)
             deckId = data.deck_id
             draw.disabled = false
             draw.classList.remove("disabled")
             draw.classList.add("draw-card")
             playerScore = 0
             computerScore = 0 
             computer.innerHTML = `<h4> Computer : ${computerScore}</h4>`
             player.innerHTML = `<h4> You : ${playerScore}</h4>`
             message.innerHTML = `<h2> Draw Cards </h2>`
             
        }) } 

draw.addEventListener("click", drawCards)


function drawCards(){
    
    if(!deckId) {
        clicked()
    } else {
        fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
            .then(data => {
                         cards.children[0].innerHTML = `
                        <img src=${data.cards[0].image} class="card-slot" />`
                        cards.children[1].innerHTML = `
                         <img src=${data.cards[1].image} class="card-slot" /> `
                         
                    const winnerText = determineCardWinner(data.cards[0], data.cards[1])
                    message.innerHTML = `<h2>${winnerText}</h2>`
                    
                    remainingCards.innerHTML= `<h5 class= "remaining"> Remaining Cards :  
                        ${data.remaining}</h5>`
                        
                        if (data.remaining === 0){
                            draw.classList.add("disabled")
                            draw.classList.remove("draw-card")
                            draw.disabled = true
                            if( computerScore > playerScore){
                                return message.innerHTML = `<h2>Computer Wins The Game! </h2>`
                            } else if (computerScore < playerScore){
                                 return message.innerHTML = `<h2> You Won The Game! </h2>`
                            } else{
                                return message.innerHTML = `<h2> Tie Game! </h2>`
                            }
                            
                        }
                    
        
                })


function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

  
    if (card1ValueIndex > card2ValueIndex) {
                    computerScore++
                    computer.innerHTML = `<h4> Computer : ${computerScore}</h4>`
                    return "Computer wins!"
                                } 
    else if (card1ValueIndex < card2ValueIndex) {
                                playerScore++
                                player.innerHTML = `<h4> You : ${playerScore}</h4>`
                                return "You win!"
                                }
     else {
         return  "War!"
            }

}}}
 