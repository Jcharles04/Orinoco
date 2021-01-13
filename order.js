window.addEventListener('load', loadevent => {

    let ord = localStorage.getItem("orderResult");
    console.log(ord)

    let num = document.getElementById('num')
    num.textContent ="Votre numéro de commande est le :" + ord;

    


    






})