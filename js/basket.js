'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {

    let product;                                                                           //on initialise nos déclarations
    const basketList = document.getElementById('array');

    let total = 0;                                                                         //On initialise le total à 0 pour la suite
    const sum = document.getElementById('sum');
    const pId = [];                                                                        //product ID. Initialisation d'un tableau vide pour la suite

    const basketLinea = localStorage.getItem("basket");                                    //on récupére le contenu de notre localstorage
    const basketJson = JSON.parse(basketLinea);

    for (let i = 0; i < basketJson.length; i++) {                                           //on créé une boucle pour chaque élément de notre basket
        product = basketJson[i];
        total += product.price;                                                             //chaque boucle ajouter le prix au total
        pId.push(product._id);                                                              //chaque boucle va ajouter son ID au pid
        basketBuilder(product);
        sum.innerHTML = convertEuro(total/100);                                             //permet d'afficher le total des produits
    }
    
    function basketBuilder(product) {                                                       //builder

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

    const lastName = document.getElementById('lastName');                                       //on initialise notre formulaire de contact
    const firstName = document.getElementById('firstName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const email = document.getElementById('email');


    const orderForm = document.getElementById('form');
    orderForm.addEventListener('submit', orderVal);                                              // on va écouter le submit de notre form

    function orderVal(ev) {
        ev.preventDefault();                                                                     //on empêche le fonctionnement normal

        const ord = ev.target;
        if (ord.checkValidity()) {                                                               // avec l'aide des RegEx dans le Html, on va vérifier si le formulaire a été bien rempli
            console.log("Form valid");
        }
            let order = localStorage.getItem("orderSon");                                        //même principe que dans le product.js
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
                products : pId,                                                                     //on vient rajouter le tableau des Id récupéré plus haut pour la suite
            };

            fetch("http://localhost:3000/api/cameras/order", {                                                                  //fetch avec une méthode POST pour envoyer les données récoltées au serveur
                    method: "POST",
                    headers: {"Content-type": "application/json;charset=UTF-8"},
                    body: JSON.stringify(orderSon),
                })  
                .then(async result_ => {                                                                                        //on initialise notre promesse de résultat
                    if (result_.ok) {                                                                                           //si le résultat revient...
                        try {                                                                                                   //...
                            const result = await result_.json();                                                                //...on initialise notre constante avec le résultat attendu...
                            window.localStorage.setItem("orderResult", JSON.stringify(result.orderId));                         //...on rempli notre local storage avec les éléments que l'on va vouloir afficher par la suite
                            order.push(orderSon);
                            window.localStorage.setItem("order", JSON.stringify(orderSon));
                            window.localStorage.setItem("total", JSON.stringify(total));
                            const answer = window.confirm("Votre commande a bien été enregistré, vous allez être redirigé.");      //on indique à l'utilisateur qu'il va être rédirigé
                                if (answer) {
                                    window.location.href ="order.html";
                                } else {
                                    window.location.href = "#";
                                }
                        } catch (err) {                                                                                         //...catch de l'erreur si il y a
                            window.alert("Erreur de traitement de la réponse:\n" + err);
                        }
                    } else {
                        window.alert("Erreur de communication:\n" + result_.status + " - " + result_.statusText);               //message d'erreur si le résult n'est pas ok
                    }
                })
                .catch(error => {                                                                                               //catch du fetch si on arrive pas à communiquer avec le serveur
                    console.log(error);
                });

    };

    function convertEuro(number){
        return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
    };
});



