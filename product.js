window.addEventListener('load', loadevent => {


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

        let camBox = document.createElement('div');
        camBox.classList.add('box');

        let imgBox = document.createElement('div');
        imgBox.classList.add('imgBox');
        imgBox.style.backgroundImage = 'url(' + productJson.imageUrl + ')';

        let camTitle = document.createElement('div');
        camTitle.classList.add('camForm');

        let name = document.createElement('h3');
        name.innerHTML += productJson.name;   
        
        let lense = document.createElement('form');                                 //on créé un form dans le html, pour povoir utiliser un required plus tard
        lense.setAttribute("name", "form");
        lense.setAttribute("id", "form")
        lense.setAttribute("action", "")
        lense.textContent = 'Choisissez votre lentille :' + ' ';

        let choise = document.createElement('select');                              //on créé les option du menu déroulant 
        choise.setAttribute('name', 'lense');
        choise.setAttribute('id', 'choiseBox');
        choise.setAttribute('required',"required");                                 //on vérifie qu'un champ a bien été séléctionné
        choise.innerHTML = '<option value=""> (Sélectionner) </option>';


        let lenses = productJson.lenses;                                            //on déclare notre variable lenses et on créé une boucle pour chaque lense
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
        price.innerHTML += convert(productJson.price/100)

        let submit = document.createElement('button');                                 //boutton submit de notre form
        submit.setAttribute('id','addToBasket');
        submit.setAttribute('type','submit');
        submit.textContent=" " + 'Ajouter au panier';


        actualProduct.appendChild(camBox);
        camBox.appendChild(imgBox);
        camBox.appendChild(camTitle);
        camTitle.appendChild(name);
        camTitle.appendChild(desc);
        camTitle.appendChild(lense);
        lense.appendChild(choise);
        camTitle.appendChild(price);
        lense.appendChild(submit);
        
        let frm = document.getElementById('form');

        frm.addEventListener("submit", formSubmit);                                     //on vient écouter l'evenement submit du bouton du form, on lance notre fonction


    }

    function formSubmit(ev) {                                                            
        ev.preventDefault();                                                            //on empéche 
        
        let frm = ev.target;
        if (frm.checkValidity()) {                                                      //on vérifie que notre form est bien valide
            console.log("Form valid");
            
            let basket = localStorage.getItem("basket");                        
            if (!basket) {
                basket = [];

            } else {
                basket = JSON.parse(basket);                                            
            }

            let basketJson = {
                img: product.imageUrl,
                name: product.name,
                _id: product._id,
                lenses: choiseBox.value,
                price: product.price
            }

            basket.push(basketJson);                                                       // on place notre 

            let basketLinea = JSON.stringify(basket);                                     // 
            localStorage.setItem("basket", basketLinea);

        }
    }

});

function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
}
