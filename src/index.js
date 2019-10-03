baseURL = "http://localhost:3000/beers"

document.addEventListener("DOMContentLoaded", () => {
    getBeer();
});
function getBeer() {
    fetch(baseURL)
    .then(response => response.json())
    .then(json => loopBeer(json))
}
function loopBeer(beersArr) {
    const list = document.getElementById("list-group");
    beersArr.forEach(beer => {
        let li = document.createElement("li");
        li.setAttribute("class", "list-group-item");
        list.appendChild(li);
        li.innerText = beer.name;

        li.addEventListener("click", () => getDeets(beer));
    })
}
function getDeets(beer) {
    let id = beer.id
    fetch(baseURL+"/"+id)
    .then(response => response.json())
    .then(json => showDeets(json));
}
function showDeets(beer) {
    const div = document.getElementById("beer-detail");
    div.innerHTML = "";
    let h1 = document.createElement("h1")
    h1.innerText = beer.name;
    let img = document.createElement("img");
    img.src = beer.image_url;
    let h3 = document.createElement("h3");
    h3.innerText = beer.tagline;
    let textarea = document.createElement("textarea");
    textarea.innerText = beer.description;
    let button = document.createElement("button");
    button.id = "edit-beer";
    button.innerHTML = "Save";
    // console.log(textarea.innerText);
    button.addEventListener("click", () => editDeets(beer, textarea));

    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(textarea);
    div.appendChild(button);
}
function editDeets(beer, textarea) {
    // console.log(textarea.innerHTML)
    // console.log(beer.description)
    let id = beer.id;
    let newDeets = textarea.innerHTML;
    newDeets = beer.description;
    console.log(newDeets);
    fetch(baseURL+"/"+id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({description: newDeets})
    })
    .then(response => response.json())
    .then(json => console.log(json))
    .then(json => { 
        textarea.innerHTML = newDeets;
    })

    .catch(err => console.log(err))
}
// function newDeets(json) {
//     // console.log(json.id);
//     let id = json.id
//     fetch(baseURL+"/"+id)
//     .then(response => response.json())
//     .then(json => console.log(json))
//     // .then(json => showDeets(json))
// }
