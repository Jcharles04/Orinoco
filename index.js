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

    let imgBox = document.createElement('div');
    imgBox.classList.add('imgBox');
    imgBox.style.backgroundImage = 'url(' + cameraJson.imageUrl + ')';

    let camTitle = document.createElement('div');
    camTitle.classList.add('camTitle');

    let name = document.createElement('h3')
    name.innerHTML += cameraJson.name    

    let desc = document.createElement('p');
    desc.innerHTML += cameraJson.description;

    let price = document.createElement('p');
    price.innerHTML += (parseInt(cameraJson.price) / 100).toFixed(2) + ' €';

    camTitle.appendChild(name);
    camBox.appendChild(imgBox);
    camBox.appendChild(camTitle);
    camBox.appendChild(desc);
    camBox.appendChild(price);
    camList.appendChild(camBox);
}
