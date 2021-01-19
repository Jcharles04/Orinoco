window.addEventListener('load', loadevent => {

    let basketLinea = localStorage.getItem("basket");
    let basketJson = JSON.parse(basketLinea);
    let basketList = document.getElementById('array');

    let total = 0;
    let sum = document.getElementById('sum');
    pId = [];
    

    for (let i = 0; i < basketJson.length; i++) {
        product = basketJson[i];
        total += product.price;
        pId.push(product._id);
        basketBuilder(product);
        sum.innerHTML = convert(total/100);
    }
    
    function basketBuilder(product) {

        let basketBox = document.createElement('tr');
        basketBox.classList.add('basketBox');
        basketBox.classList.add('col-8');  

        let miniImg = document.createElement('td');
        miniImg.classList.add('miniImg');
        miniImg.style.backgroundImage = 'url(' + product.img + ')';

        let productName = document.createElement('td');
        productName.classList.add('name');
        productName.innerHTML += product.name;

        let productLense = document.createElement('td');
        productLense.classList.add('lense');
        productLense.innerHTML += product.lenses;

        let productPrice = document.createElement('td');
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
            /*order.push(orderSon);
            window.localStorage.setItem("order", JSON.stringify(orderSon))*/

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
                })

            /*fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(orderSon),
            })  
                .then(async result_ => {
                    const result = await result_.json()
                    window.localStorage.setItem("orderResult", JSON.stringify(result.orderId))  
                })
                .catch(error => {
                    console.log(error);
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

            /*const answer = window.confirm("Votre commande a bien été enregistré, vous allez être redirigé.");
            if (answer) {
                window.location.href ="order.html"
            } else {
                window.location.href = "index.html"
            }*/
    }

});



function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
}