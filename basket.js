window.addEventListener('load', loadevent => {

    let basketLinea = localStorage.getItem("basket");
    let basketJson = JSON.parse(basketLinea);
    
    let total = 0;
    let sum = document.getElementById('sum');
    pId = [];
    

    for (let i = 0; i < basketJson.length; i++) {
        product = basketJson[i];
        total += product.price;
        pId.push(product._id);
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

        let productPrice = document.createElement('div');
        productPrice.classList.add('price');
        productPrice.innerHTML += convert(product.price/100);

        basketList.appendChild(basketBox);
        basketBox.appendChild(miniImg);
        basketBox.appendChild(productName);
        basketBox.appendChild(productLense);
        basketBox.appendChild(productPrice);

    }

    const lastName = document.getElementById('lastName');
    const firstName = document.getElementById('firstName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');


    let orderForm = document.getElementById('form');
    orderForm.addEventListener('submit', orderVal)

    function orderVal(ev) {
        ev.preventDefault();

        let ord = ev.target;
        if (ord.checkValidity()) {
            console.log("Form valid");
        }
            let order = localStorage.getItem("orderSon");
            if (!order) {
                order = [];

            } else {
                order = JSON.parse(order);
            }


            const orderSon = {
                contact: { 
                    firstName: firstName.value,
                    lastName: lastName.value,
                    address: address.value,
                    city: city.value,
                    email: email.value,
                },
                products : pId,


            }
            order.push(orderSon);
            window.localStorage.setItem("order", JSON.stringify(orderSon))

            fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(orderSon),
            })  
                .then(async result_ => {
                    const result = await result_.json()
                    window.localStorage.setItem("orderResult", JSON.stringify(result.orderId))  
                })
                .catch(error => {
                    onsole.log(error);
                })
            /*.then(function(response) {
                if(response.ok) {
                response.blob().then(function() { 

                    alert("Votre commande a été passé avec succés");
                    console.log(response)
                    console.log(blob)
                });
                } else {
                console.log('Mauvaise réponse du réseau');
                }
                })
            .catch(function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch');
            })*/

            const answer = window.confirm("Votre commande a bien été enregistré, vous allez être redirigé.");
            if (answer) {
                window.location.href ="order.html"
            } else {
                window.location.href = "index.html"
            }
    }

});



function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
}