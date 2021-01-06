let basketDetail = document.getElementById('basketList');

let basketLinea = localStorage.getItem("basket");
let basketJson = JSON.parse(basketLinea);
basketBuilder(basketJson);

function basketBuilder(basketLinea) {

    let basketBox = document.createElement('div');
    basketBox.classList.add('basketBox');

    let miniImg = document.createElement('div');
    miniImg.classList.add('miniImg');
    miniImg.style.backgroundImage = 'url(' + basketLinea.img + ')';

    let productName = document.createElement('div');
    productName.classList.add('name');
    productName.innerHTML += basketLinea.name;

    let productLense = document.createElement('div');
    productLense.classList.add('lense');
    productLense.innerHTML += basketLinea.lenses;

    let productPrice = document.createElement('div');
    productPrice.classList.add('price');
    productPrice.innerHTML += (parseInt(basketLinea.price) / 100).toFixed(2) + ' €';

    basketList.appendChild(basketBox);
    basketBox.appendChild(miniImg);
    basketBox.appendChild(productName);
    basketBox.appendChild(productLense);
    basketBox.appendChild(productPrice);

}   