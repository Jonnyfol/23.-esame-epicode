const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Endpoint 
const apiUrl = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWVlMTljNDM3MDAwMTkzYzM3NGEiLCJpYXQiOjE3MDg0NTM2MDEsImV4cCI6MTcwOTY2MzIwMX0.4QF5RCuvYfg3DylYp5hda6aev2ihOkOBxMZUwkqmbAI';


async function getProductDetails() {
    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const product = await res.json();
        displayProductDetails(product);
    } catch (error) {
        console.log(error);
    }
}


function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-details');
    


    const img = document.createElement('img');
    img.src = product.imageUrl;
    img.alt = product.name;
    img.style.maxHeight = '500px';
    productDetailsContainer.appendChild(img);

    
    const heading = document.createElement('h2');
    heading.textContent = product.name;
    productDetailsContainer.appendChild(heading);

    const descriptionPara = document.createElement('p');
    descriptionPara.innerHTML = `<strong>Description:</strong> ${product.description}`;
    productDetailsContainer.appendChild(descriptionPara);

    const brandPara = document.createElement('p');
    brandPara.innerHTML = `<strong>Brand:</strong> ${product.brand}`;
    productDetailsContainer.appendChild(brandPara);

    const pricePara = document.createElement('p');
    pricePara.innerHTML = `<strong>Price: €</strong> ${product.price}`;
    productDetailsContainer.appendChild(pricePara);
    ;
    
    productDetailsContainer.innerHTML = html;
}


getProductDetails();