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

    let name = document.createElement('h3');
    name.innerHTML += productJson.name;   
    
    let lense = document.createElement('form');
    lense.setAttribute("name", "lense");
    lense.setAttribute("id", "form")
    lense.setAttribute("action", "")
    lense.textContent = 'Choisissez votre lentille :' + ' ';

    let choise = document.createElement('select');
    choise.setAttribute('name', 'lense');
    choise.setAttribute('id', 'choiseBox');
    choise.setAttribute('required',"required");
    choise.innerHTML = '<option value=""> (Sélectionner) </option>';


    let lenses = productJson.lenses;
    for (var i = 0; i < lenses.length; i++) {
        var lenseList = document.createElement('option');
        lenseList.setAttribute('value',lenses[i]);
        lenseList.setAttribute("name", lenses[i])
        lenseList.textContent =" " + " " +lenses[i];
        choise.appendChild(lenseList);
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
    lense.appendChild(choise);
    camTitle.appendChild(price);
}

    
let basket = document.getElementById('addToBasket');

var validation = [];

basket.addEventListener('click', function(storage) {

    let testStorage ;
    if(choiseBox.value === "") {
        alert("Vous n'avez pas séléctionné de lentille");
    }else {
        let basketJson = {
        img: product.imageUrl,
        name: product.name,
        _id: product._id,
        lenses: choiseBox.value,
        price: product.price
    }
    let basketLinea = JSON.stringify(basketJson);
    localStorage.setItem("basket",basketLinea);

    }
})




    

