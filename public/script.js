const cardHolder = document.getElementById("cardHolder")
const counter = document.getElementById("count")

let currentCard = 0
let flipped = false

document.getElementById("cardHolder").addEventListener("click", async () => {
    if(!flipped){
        cardHolder.children[currentCard].children[1].classList.remove("hidden")
        cardHolder.children[currentCard].children[0].classList.add("hidden")
        flipped = true
    }
    else {refreshCounter()
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

function refreshCounter(){
    counter.innerHTML = `${currentCard + 1}/${cardHolder.children.length}`
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
    refreshCounter()
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
    refreshCounter()
}

cardHolder.children[0].classList.remove("hidden")
refreshCounter()