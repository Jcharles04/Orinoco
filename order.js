'use strict';

window.addEventListener('DOMContentLoaded', loadevent => {

    let ord = localStorage.getItem("orderResult");

    let total = localStorage.getItem("total");

    let num = document.getElementById('num');
    num.textContent =  ord;

    let price = document.getElementById('price');
    price.textContent =convertEuro(total/100);

    let home = document.getElementById('clear');
    home.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear();
        location.href = "index.html"
    });




    function convertEuro(number){
        return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
    };

    
});



