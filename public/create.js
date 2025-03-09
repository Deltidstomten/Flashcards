const form = document.getElementById("form")

function addCard(){
    form.innerHTML += '<div class="card"><input type="text" name="" placeholder="front"><input type="text" name="" placeholder="back"></div>'
}

/*
div(class="card")
                input(type="text", name="" placeholder="front")
                input(type="text", name="" placeholder="back")
                */