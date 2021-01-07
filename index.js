window.addEventListener('load', loadevent => {

    const cameraUrl = 'http://localhost:3000/api/cameras/';

    let camList = document.getElementById('camList');

    fetch(cameraUrl)
        .then(async result => {
            const cameras = await result.json();
            let resultLength = cameras.length;
            for (let i = 0; i < resultLength; i++) {
                const camera = cameras[i];
                cameraBuilder(camera);
            }
        })
        .catch(error => {
            alert('Error API!');
            console.log(error);
        })

    function cameraBuilder(cameraJson) {
        
        let camBox = document.createElement('div');
        camBox.classList.add('camBox');
        camBox.id = cameraJson._id;
        
        let camLink = document.createElement('a');
        camLink.href = 'product.html?id=' + cameraJson._id + '';

        let imgBox = document.createElement('div');
        imgBox.classList.add('imgBox');
        imgBox.style.backgroundImage = 'url(' + cameraJson.imageUrl + ')';

        let camTitle = document.createElement('div');
        camTitle.classList.add('camForm');

        let name = document.createElement('h3')
        name.innerHTML += cameraJson.name;    

        let desc = document.createElement('p');
        desc.innerHTML += cameraJson.description;

        let price = document.createElement('p');
        price.innerHTML += convert(cameraJson.price/100);

        camList.appendChild(camBox);
        camBox.appendChild(camLink);
        camBox.appendChild(imgBox);
        camBox.appendChild(camTitle);
        camTitle.appendChild(name);
        camTitle.appendChild(desc);
        camTitle.appendChild(price);
    }
});

function convert(number){
    return  number.toLocaleString('fr-FR', {style: 'currency', currency: 'EUR'/*, minimumFractionDigits: 2, maximumFractionDigits: 2*/})
}
