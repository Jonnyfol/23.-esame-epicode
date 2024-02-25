// Input immagine:
const postImg = document.getElementById("post-img");
const postImgClear = document.getElementById("post-img-clear");

// Input post name:
const postName = document.getElementById("post-name");
const postNameClear = document.getElementById("post-name-clear");

// Input post brand:
const postBrand = document.getElementById("post-brand");
const postBrandClear = document.getElementById("post-brand-clear");

// Input post description:
const postDesc = document.getElementById("post-description");
const postDescClear = document.getElementById("post-description-clear");

// Input post price:
const postPrice = document.getElementById("post-price");
const postPriceClear = document.getElementById("post-price-clear");


// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWVlMTljNDM3MDAwMTkzYzM3NGEiLCJpYXQiOjE3MDg0NTM2MDEsImV4cCI6MTcwOTY2MzIwMX0.4QF5RCuvYfg3DylYp5hda6aev2ihOkOBxMZUwkqmbAI';

const paramObj = new URLSearchParams(window.location.search); 
const myPostId = paramObj.get("pid"); 


window.onload = showPost();


async function showPost() {
    try {
        const res = await fetch(apiUrl + myPostId, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const json = await res.json();

        postImg.value = json.imageUrl;
        postName.value = json.name;
        postBrand.value = json.brand;
        postDesc.value = json.description;
        postPrice.value = json.price ? json.price : "0";
    } catch(err) {
        console.log(err);
    }
}


async function editPost() {
   
    if(postImg.value && postName.value && postBrand.value && postDesc.value && postPrice.value) {
        try {
            
            let myPayload = {
                "imageUrl": postImg.value, 
                "name": postName.value,
                "brand": postBrand.value,
                "description": postDesc.value,
                "price": postPrice.value,
                "time": new Date()
            };
            const res = await fetch(apiUrl + myPostId, { "method": "PUT", "body": JSON.stringify(myPayload), "headers": { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` }});
            // Avviso temporaneo di avvenuta modifica
            editedAlert.classList.toggle("d-none");
            setTimeout(() => {
                editedAlert.classList.toggle("d-none");
            }, 5000);
        } catch(err) {
            console.log(err);
        }
    } else {
        // Avviso temporaneo di validation fallita
        inputAlert.classList.toggle("d-none");
        setTimeout(() => {
            inputAlert.classList.toggle("d-none");
        }, 5000);
    }
}


//pulizia tramite la x

postImgClear.addEventListener('click', () => { postImg.value = '' });
postNameClear.addEventListener('click', () => { postName.value = '' });
postBrandClear.addEventListener('click', () => { postBrand.value = '' });
postDescClear.addEventListener('click', () => { postDesc.value = '' });
postPriceClear.addEventListener('click', () => { postPrice.value = '' });

// Alert
const editedAlert = document.getElementById("editedAlert");