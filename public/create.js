const form = document.getElementById("form")

function addCard() {
    form.innerHTML += '<div class="card"><input type="text" name="" placeholder="framsida"><input type="text" name="" placeholder="baksida"></div>'
}

function submit() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/create");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.responseText);
        }
    };

    const cardsHTML = document.getElementsByClassName("card")
    let cards = {}

    for (let i = 0; i < cardsHTML.length; i++) {
        const element = cardsHTML[i];
        cards[element.children[0].value] = element.children[1].value
        
    }

    console.log(cards)

    let data = `{
        "name": "${document.getElementById("title").value}",
        "author": "${document.getElementById("author").value}",
        "cards" : ${JSON.stringify(cards)}
    }`;

    xhr.send(data);
}