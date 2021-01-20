'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {                  // on met notre JS dans un scope en attendant que la page HTML soit chargée

    const cameraUrl = 'http://localhost:3000/api/cameras/';     //on prépare notre URL pour le fetch
    let camList = document.getElementById('camList');           //on vient pointer notre elemennt HTMl pour la suite 

    fetch(cameraUrl)                                            //on envoi une requête à notre API 
        .then(async result => {                                 //on attend le resultat en async
            const cameras = await result.json();                //on déclare notre constante avec notre promisse de Json
            let resultLength = cameras.length;                  //déclaration de variable
            for (let i = 0; i < resultLength; i++) {            //On créé une boucle qui se répéte pour chaque ligne du JSON
                const camera = cameras[i];                      
                cameraBuilder(camera);                          //On déclare notre builder
            }
        })
        .catch(error => {                                       //on catch les erreurs si on e trouve pas nos API
            alert('Error API!');
            console.log(error);
        });

    function cameraBuilder(cameraJson) {                         //Fonction builder, le template se répéte pour chaque produit de notre Json
        
        
        let camBox = document.createElement('div');
        camBox.classList.add('card');
        camBox.classList.add('col-sm-12');
        camBox.classList.add('col-md-6');
        camBox.classList.add('col-lg-4');
        camBox.id = cameraJson._id;
        
        let imgBox = document.createElement('img');
        imgBox.classList.add('card-img-top');
        imgBox.setAttribute('src',cameraJson.imageUrl);

        let camTitle = document.createElement('div');
        camTitle.classList.add('card-body');

        let name = document.createElement('h3');
        name.classList.add('card-title');
        name.innerHTML += cameraJson.name;    

        let desc = document.createElement('p');
        desc.classList.add('card-text');
        desc.innerHTML += cameraJson.description;

        let price = document.createElement('p');
        price.classList.add('card-text');
        price.innerHTML += convertEuro(cameraJson.price/100);

        let camLink = document.createElement('a');
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

