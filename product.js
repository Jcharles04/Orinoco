let productDetail = document.getElementById('actualProduct');

const params = (new URL(document.location)).searchParams;
const id = params.get('id');

fetch('http://localhost:3000/api/cameras/' + id )
    .then(async result => {
        const array  = await result.json();
        product = array;
        productBuilder(product);
        lenseBuilder();
    })
    
    .catch(error => {
        alert('Error API!');
        console.log(error);
    })

function productBuilder(productJson) {

    let camBox = document.createElement('div');
    camBox.classList.add('box');

    let imgBox = document.createElement('div');
    imgBox.classList.add('imgBox');
    imgBox.style.backgroundImage = 'url(' + productJson.imageUrl + ')';

    let camTitle = document.createElement('div');
    camTitle.classList.add('camForm');

    let name = document.createElement('h3')
    name.innerHTML += productJson.name;    

    let desc = document.createElement('p');
    desc.innerHTML += productJson.description;

    let price = document.createElement('p');
    price.innerHTML += (parseInt(productJson.price) / 100).toFixed(2) + ' €';

    actualProduct.appendChild(camBox);
    camBox.appendChild(imgBox);
    camBox.appendChild(camTitle);
    camTitle.appendChild(name);
    camTitle.appendChild(desc);
    camTitle.appendChild(price);
}

let lenses = document.getElementsByClassName('option')

function lenseBuilder() {

    let lenses = document.createElement('button');
    lenses.classList.add('option');
    lenses.textContent = 'Lentilles'
    actualProduct.appendChild(lenses)

    let cameraLenses = camera.lenses.length
    for (let i = 0; i < cameraLenses; i++) {
        const option = document.createElement("option")
        option.setAttribute("value", camera.lenses[i])           
        option.innerHTML = camera.lenses[i]
        lenses.appendChild(option)
    }
}   