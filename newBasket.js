window.addEventListener('load', loadevent => {

    let basketDetail = document.getElementById('basketList');

    let basketLinea = localStorage.getItem("basket");
    let basketJson = JSON.parse(basketLinea);
    
    class panier{
        constructor(actualLinea, img, name, _id, lenses, price ){
            this.actualLinea = actualLinea;
            this.img = img;
            this. name = name;
            this.lenses = lenses;
            this.price = price; 
        }

    for (let i = 0; i < basketJson.length; i++) {
        product = basketJson[i];
        basketBuilder(product);
    }
    
    
});

function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'/*, minimumFractionDigits: 2, maximumFractionDigits: 2*/})
}

    