'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {                  // on met notre JS dans un scope en attendant que la page HTML soit chargée

    const cameraUrl = 'http://localhost:3000/api/cameras/';     //on prépare notre URL pour le fetch
    const camList = document.getElementById('camList');           //on vient pointer notre elemennt HTMl pour la suite 

    fetch(cameraUrl)                                            //on envoi une requête à notre API 
        .then(async result => {                                 //on attend le resultat en async
            const cameras = await result.json();                //on déclare notre constante avec notre promisse de Json
            const resultLength = cameras.length;                  //déclaration de variable
            for (let i = 0; i < resultLength; i++) {            //On créé une boucle qui se répéte pour chaque ligne du JSON
                let camera = cameras[i];                      
                cameraBuilder(camera);                          //On déclare notre builder
            }
        })
        .catch(error => {                                       //on catch les erreurs si on e trouve pas nos API
            alert('Error API!');
            console.log(error);
        });

    function cameraBuilder(cameraJson) {                         //Fonction builder, le template se répéte pour chaque produit de notre Json
        
        
        const camBox = document.createElement('div');
        camBox.classList.add('card');
        camBox.classList.add('col-sm-12');
        camBox.classList.add('col-md-6');
        camBox.classList.add('col-lg-4');
        camBox.id = cameraJson._id;
        
        const imgBox = document.createElement('img');
        imgBox.classList.add('card-img-top');
        imgBox.setAttribute('src',cameraJson.imageUrl);

        const camTitle = document.createElement('div');
        camTitle.classList.add('card-body');

        const name = document.createElement('h3');
        name.classList.add('card-title');
        name.innerHTML += cameraJson.name;    

        const desc = document.createElement('p');
        desc.classList.add('card-text');
        desc.innerHTML += cameraJson.description;

        const price = document.createElement('p');
        price.classList.add('card-text');
        price.innerHTML += convertEuro(cameraJson.price/100);

        const camLink = document.createElement('a');
        camLink.classList.add('btn');
        camLink.classList.add('btn-success');
        camLink.innerText = 'Détails';
        camLink.href = 'product.html?id=' + cameraJson._id + ''; //au click on se déplace vers la page "Produit" avec l'id du produit dont on va se reservir plus tard


        camList.appendChild(camBox);                            //on déclare nos liens de parenté
        camBox.appendChild(imgBox);
        camBox.appendChild(camTitle);
        camTitle.appendChild(name);
        camTitle.appendChild(desc);
        camTitle.appendChild(price);
        camTitle.appendChild(camLink);
    };

    function convertEuro(number){
        return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})  //Petite fonction pour donner le prix en euros
    };
    
});

