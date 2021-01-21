'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {

    let product;

    const params = (new URL(document.location)).searchParams;                   //on isole l'id pour pouvoir retrouver la bonne caméra dans la liste
    const id = params.get('id');

    fetch('http://localhost:3000/api/cameras/' + id )                           //on appelle notre API avec le bon id
        .then(async result => {
            const data  = await result.json();
            product = data;
            productBuilder(product);
        })
        
        .catch(error => {
            alert('Error API!');
            console.log(error);
        })

    function productBuilder(productJson) {                                         //builder 

        const imgBox = document.getElementById('imgBox');

        const img = document.createElement('img');
        img.classList.add('productImg');
        img.setAttribute('src',productJson.imageUrl);

        const camTitle = document.getElementById('cardDesc');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const name = document.createElement('h3');
        name.classList.add('card-title');
        name.innerHTML += productJson.name;   
        
        const lense = document.createElement('form');                                 //on créé un form dans le html, pour povoir utiliser un required plus tard
        lense.setAttribute("name", "form");
        lense.setAttribute("id", "form");
        lense.setAttribute("action", "");

        const label = document.createElement('label');
        label.classList.add('form-label');
        label.setAttribute('for', 'choiseBox');
        label.innerText = "Choisissez votre lentille :";

        const choise = document.createElement('select');                              //on créé les option du menu déroulant 
        choise.setAttribute('name', 'lense');
        choise.setAttribute('id', 'choiseBox');
        choise.setAttribute('class', 'form-control');
        choise.setAttribute('required',"required");                                 //on vérifie qu'un champ a bien été séléctionné
        choise.innerHTML = '<option value=""> Sélectionner </option>';


        const lenses = productJson.lenses;                                            //on déclare notre variable lenses et on créé une boucle pour chaque lense
        for (var i = 0; i < lenses.length; i++) {
            var lenseList = document.createElement('option');
            lenseList.setAttribute('value',lenses[i]);
            lenseList.setAttribute("name", lenses[i]);
            lenseList.textContent =" " + " " +lenses[i];
            choise.appendChild(lenseList);
        }
            
        const desc = document.createElement('p');
        desc.classList.add('card-text');
        desc.innerHTML += productJson.description;

        const price = document.createElement('p');
        price.classList.add('card-text');
        price.innerHTML += convertEuro(productJson.price/100);

        const submit = document.createElement('button');                                //boutton submit de notre form
        submit.classList.add('btn');
        submit.classList.add('btn-success');
        submit.setAttribute('id','addToBasket');
        submit.setAttribute('type','submit');
        submit.textContent=" " + 'Ajouter au panier';


        imgBox.appendChild(img);
        camTitle.appendChild(cardBody);
        cardBody.appendChild(name);
        cardBody.appendChild(desc);
        cardBody.appendChild(price);
        cardBody.appendChild(lense);
        lense.appendChild(label);
        lense.appendChild(choise);
        lense.appendChild(submit);
        
        const frm = document.getElementById('form');
        frm.addEventListener("submit", formSubmit);                                     //on vient écouter l'evenement submit du bouton du form, on lance notre fonction
    }

    function formSubmit(ev) {                                                            
        ev.preventDefault();                                                            //on empéche 
        
        const frm = ev.target;
        if (frm.checkValidity()) {                                                      //on vérifie que notre form est bien valide
            console.log("Form valid");
            
            let basket = localStorage.getItem("basket");                        
            if (!basket) {
                basket = [];

            } else {
                basket = JSON.parse(basket);                                            
            };

            const basketJson = {
                img: product.imageUrl,
                name: product.name,
                _id: product._id,
                lenses: choiseBox.value,
                price: product.price
            };
            basket.push(basketJson);                                                      // on place notre 

            const basketLinea = JSON.stringify(basket);                                     // 
            localStorage.setItem("basket", basketLinea);

        }
    }

});

function convertEuro(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
};
