'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {

    const ord = localStorage.getItem("orderResult");

    const total = localStorage.getItem("total");

    const num = document.getElementById('num');                                         //on affiche nos éléments sur la page
    num.textContent =  ord;

    const price = document.getElementById('price');                                     //on affiche nos éléments sur la page
    price.textContent =convertEuro(total/100);

    const home = document.getElementById('clear');
    home.addEventListener('click', (e) => {                                             //petite fonction pour revenir à l'acceuil et effacer le localstorage
        e.preventDefault();
        localStorage.clear();
        location.href = "../index.html"
    });




    function convertEuro(number){
        return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
    };

    
});



