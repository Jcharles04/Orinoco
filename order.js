'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {

    const ord = localStorage.getItem("orderResult");

    const total = localStorage.getItem("total");

    const num = document.getElementById('num');
    num.textContent =  ord;

    const price = document.getElementById('price');
    price.textContent =convertEuro(total/100);

    const home = document.getElementById('clear');
    home.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        location.href = "index.html"
    });




    function convertEuro(number){
        return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
    };

    
});



