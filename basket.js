window.addEventListener('load', loadevent => {

    let basketDetail = document.getElementById('basketList');

    

    let basketLinea = localStorage.getItem("basket");
    let basketJson = JSON.parse(basketLinea);
    
    let total = 0;
    let sum = document.getElementById('sum');
    

    

    for (let i = 0; i < basketJson.length; i++) {
        product = basketJson[i];
        total += product.price;
        basketBuilder(product);
        sum.innerHTML = 'Total :'+ ' ' + convert(total/100);
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

        /*let adjusment = document.createElement('div');
        adjusment.classList.add('boxPM');

        let menosButton = document.createElement('button');
        menosButton.classList.add('button','mini');
        menosButton.textContent ='-';

        let number = document.createElement('div');
        number.classList.createElement('number');
    
        let plusButton = document.createElement('button');
        plusButton.classList.add('button','mini');
        plusButton.textContent ='+';*/

        let productPrice = document.createElement('div');
        productPrice.classList.add('price');
        productPrice.innerHTML += convert(product.price/100);

        basketList.appendChild(basketBox);
        basketBox.appendChild(miniImg);
        basketBox.appendChild(productName);
        basketBox.appendChild(productLense);
        basketBox.appendChild(productPrice);

    }

    

    let orderForm = document.getElementById('form');
    orderForm.addEventListener('submit', () => {

        const lastName = document.getElementById('lastName');
        const firstName = document.getElementById('firstName');
        const address = document.getElementById('address');
        const city = document.getElementById('city');
        const email = document.getElementById('email');

        let order = {
            contact: { 
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value,
            },
            products: [product._id]
        }
        order.push(products)


        fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(order)
        })
        .then(async result_ => {
            const result = await result_.json() 
            window.localStorage.setItem("order", JSON.stringify(order))
        })
        .catch(error => {
            console.log(error);
        })
        alert(`Commande prise en compte. Merci de votre achat !`)      
    })
        
    

    



    
});



function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
}

/*Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id*/