'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {

    let product;
    const basketList = document.getElementById('array');

    let total = 0;
    const sum = document.getElementById('sum');
    const pId = [];

    const basketLinea = localStorage.getItem("basket");
    const basketJson = JSON.parse(basketLinea);

    for (let i = 0; i < basketJson.length; i++) {
        product = basketJson[i];
        total += product.price;
        pId.push(product._id);
        basketBuilder(product);
        sum.innerHTML = convertEuro(total/100);
        console.log(product);
        console.log(total);
        console.log(pId);
    }
    
    function basketBuilder(product) {

        const basketBox = document.createElement('tr');
        basketBox.classList.add('basketBox');
        basketBox.classList.add('col-8');  

        const miniImg = document.createElement('td');
        miniImg.classList.add('miniImg');
        miniImg.style.backgroundImage = 'url(' + product.img + ')';

        const productName = document.createElement('td');
        productName.classList.add('name');
        productName.innerHTML += product.name;

        const productLense = document.createElement('td');
        productLense.classList.add('lense');
        productLense.innerHTML += product.lenses;

        const productPrice = document.createElement('td');
        productPrice.classList.add('price');
        productPrice.innerHTML += convertEuro(product.price/100);

        
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


    const orderForm = document.getElementById('form');
    orderForm.addEventListener('submit', orderVal);

    function orderVal(ev) {
        ev.preventDefault();

        const ord = ev.target;
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
            };

            fetch("http://localhost:3000/api/cameras/order", {
                    method: "POST",
                    headers: {"Content-type": "application/json;charset=UTF-8"},
                    body: JSON.stringify(orderSon),
                })  
                .then(async result_ => {
                    if (result_.ok) {
                        try {
                            const result = await result_.json();
                            window.localStorage.setItem("orderResult", JSON.stringify(result.orderId));
                            order.push(orderSon);
                            window.localStorage.setItem("order", JSON.stringify(orderSon));
                            window.localStorage.setItem("total", JSON.stringify(total));
                            const answer = window.confirm("Votre commande a bien été enregistré, vous allez être redirigé.");
                                if (answer) {
                                    window.location.href ="order.html";
                                } else {
                                    window.location.href = "#";
                                }
                        } catch (err) {
                            window.alert("Erreur de traitement de la réponse:\n" + err);
                        }
                    } else {
                        window.alert("Erreur de communication:\n" + result_.status + " - " + result_.statusText);
                    }
                })
                .catch(error => {
                    console.log(error);
                });

    };

    function convertEuro(number){
        return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
    };
});



