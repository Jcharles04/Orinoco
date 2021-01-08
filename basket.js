window.addEventListener('load', loadevent => {

    let basketDetail = document.getElementById('basketList');

    let basketLinea = localStorage.getItem("basket");
    let basketJson = JSON.parse(basketLinea);
    
    for (let i = 0; i < basketJson.length; i++) {
        product = basketJson[i];
        basketBuilder(product);
    }
    
    function basketBuilder(product) {

        let basketBox = document.createElement('div');
        basketBox.classList.add('basketBox');

        let miniImg = document.createElement('div');
        miniImg.classList.add('miniImg');
        miniImg.style.backgroundImage = 'url(' + product.img + ')';

        let productName = document.createElement('div');
        productName.classList.add('name');
        productName.innerHTML += product.name;

        let productLense = document.createElement('div');
        productLense.classList.add('lense');
        productLense.innerHTML += product.lenses;

        let adjusment = document.createElement('div');
        adjusment.classList.add('boxPM');

        let menosButton = document.createElement('button');
        menosButton.classList.add('button','mini');
        menosButton.textContent ='-';

        let number = document.createElement('div');
        number.classList.createElement('number');
    
        let plusButton = document.createElement('button');
        plusButton.classList.add('button','mini');
        plusButton.textContent ='+';

        let productPrice = document.createElement('div');
        productPrice.classList.add('price');
        productPrice.innerHTML += convert(product.price/100)

        basketList.appendChild(basketBox);
        basketBox.appendChild(miniImg);
        basketBox.appendChild(productName);
        basketBox.appendChild(productLense);
        basketBox.appendChild(adjusment);
        adjusment.appendChild(menosButton);
        adjusment.appendChild(plusButton);
        basketBox.appendChild(productPrice);

    }  
});

function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'/*, minimumFractionDigits: 2, maximumFractionDigits: 2*/})
}

    