

   // Contenitore dei risultati:
const resultsBox = document.getElementById("content-produt");

// Endpoint:
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWVlMTljNDM3MDAwMTkzYzM3NGEiLCJpYXQiOjE3MDg0NTM2MDEsImV4cCI6MTcwOTY2MzIwMX0.4QF5RCuvYfg3DylYp5hda6aev2ihOkOBxMZUwkqmbAI';

window.onload = getPosts();

async function getPosts() {
    // resultsBox.innerHTML = "";
    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const json = await res.json(); 
        json.forEach((product) => {
            createCardTemplate(product);
        });
        // console.log(json);
    } catch (error) {
        console.log(error);
    }
}



function createCardTemplate(product) {


   


    let col = document.createElement("div");
    col.classList.add("col-12", "col-sm-6", "col-md-3", "col-lg-3");

    resultsBox.appendChild(col);

    // Creazione degli elementi della card
    let card = document.createElement('div');
    card.classList.add('card', 'mb-3');
    card.style.width = '18rem';
    col.appendChild(card);
    

    let img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = product.imageUrl;
    img.setAttribute("alt", "immagine del prodotto")
    card.appendChild(img);

    let cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    let title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = product.name;
    cardBody.appendChild(title);

    let description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = product.description;
    cardBody.appendChild(description);

    
    let listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'list-group-flush');
    cardBody.appendChild(listGroup);
    

    let brandItem = document.createElement('li');
    brandItem.classList.add('list-group-item');
    brandItem.textContent = 'Brand: ' + product.brand;
    listGroup.appendChild(brandItem);

    let priceItem = document.createElement('li');
    priceItem.classList.add('list-group-item');
    priceItem.textContent = 'Price: ' + product.price;
    listGroup.appendChild(priceItem);


    let cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');
    card.appendChild(cardFooter)

    let infoButton = document.createElement('button');
    infoButton.classList.add('btn', 'btn-primary');
    infoButton.textContent = 'Info';

    infoButton.addEventListener('click', function() {
        console.log('Informazioni dettagliate su ' + product.name);

        const detailPageUrl = `detail.html?id=${product._id}`;
        window.location.href = detailPageUrl;

    }
    
    );

   cardFooter.appendChild(infoButton);
 



    
    
}
