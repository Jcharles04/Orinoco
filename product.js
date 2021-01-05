let camera;
let productDetail = document.getElementById('actualProduct');

const params = (new URL(document.location)).searchParams;
const id = params.get('id');

fetch('http://localhost:3000/api/cameras/' + id )
    .then(async result => {
        const data  = await result.json();
        product = data;
        productBuilder(product);
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
    
    let lense = document.createElement('label')
    lense.textContent = 'Nous vous proposons un choix de lentilles selon vos envies :';

    let lenses = productJson.lenses;
    for (var i = 0; i < lenses.length; i++) {
        var lenseList = document.createElement('select');
        lenses.innerHTML = "name="+lenses[i];
        lenseList.textContent ="-" + " " +lenses[i];
        lense.appendChild(lenseList);
    }
        

    let desc = document.createElement('p');
    desc.innerHTML += productJson.description;

    let price = document.createElement('p');
    price.innerHTML += (parseInt(productJson.price) / 100).toFixed(2) + ' €';


    actualProduct.appendChild(camBox);
    camBox.appendChild(imgBox);
    camBox.appendChild(camTitle);
    camTitle.appendChild(name);
    camTitle.appendChild(desc);
    camTitle.appendChild(lense);
    camTitle.appendChild(price);
}

    
let basket = document.getElementById('addToBasket')
