const cardHolder = document.getElementById("cardHolder")

let currentCard = 0
let flipped = false

document.getElementById("cardHolder").addEventListener("click", async () => {
    if(!flipped){
        cardHolder.children[currentCard].children[1].classList.remove("hidden")
        cardHolder.children[currentCard].children[0].classList.add("hidden")
        flipped = true
    }
    else {
        cardHolder.children[currentCard].children[0].classList.remove("hidden")
        cardHolder.children[currentCard].children[1].classList.add("hidden")
        flipped = false
    }
})

function hideCard(id){
    cardHolder.children[id].classList.add("hidden")
}

function showCard(id){
    cardHolder.children[id].classList.remove("hidden")
}

function resetCard(id){
    cardHolder.children[currentCard].children[0].classList.remove("hidden")
    cardHolder.children[currentCard].children[1].classList.add("hidden")
    flipped = false
}

function forward(){
    if(currentCard >= cardHolder.children.length - 1){
        currentCard = cardHolder.children.length - 1
        return
    }
    hideCard(currentCard)
    resetCard(currentCard)
    currentCard += 1
    showCard(currentCard)
}

function backward(){
    if(currentCard <= 0){
        currentCard = 0
        return
    }
    hideCard(currentCard)
    resetCard(currentCard)
    currentCard -= 1
    showCard(currentCard)
}

cardHolder.children[0].classList.remove("hidden")