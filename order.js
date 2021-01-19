window.addEventListener('load', loadevent => {

    let ord = localStorage.getItem("orderResult");
    console.log(ord);

    let total = localStorage.getItem("total");
    console.log(total);

    let num = document.getElementById('num');
    num.textContent = /*"Votre numéro de commande est le :" +*/ ord;

    let price = document.getElementById('price');
    price.textContent =convert(total/100);




    


    






})

function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'})
}