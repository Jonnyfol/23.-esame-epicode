// Contenitore dei risultati:
const resultsBox = document.getElementById("results-area");

// Input post name:
const postImg = document.getElementById("post-img");

// Input post name:
const postName = document.getElementById("post-name");

// Input post name:
const postBrand = document.getElementById("post-brand");

// Input post description:
const postDesc = document.getElementById("post-description");

// Input post price:
const postPrice = document.getElementById("post-price");



// Alert per dati incompleti:
const inputAlert = document.getElementById("alert-msg");

// Alert per eliminazione:
const deleteAlert = document.getElementById("delete-msg");


// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZWVlMTljNDM3MDAwMTkzYzM3NGEiLCJpYXQiOjE3MDg0NTM2MDEsImV4cCI6MTcwOTY2MzIwMX0.4QF5RCuvYfg3DylYp5hda6aev2ihOkOBxMZUwkqmbAI';

window.onload = getPosts();

async function getPosts() {
    resultsBox.innerHTML = "";
    try {
        const res = await fetch(apiUrl, {
            headers: {
                "Authorization": `Bearer ${apiKey}`
            }
        });
        const json = await res.json(); // Qui avrò un array di oggetti (posts..)
        json.forEach((post) => {
            createPostTemplate(post);
        });
        // console.log(json);
    } catch (error) {
        console.log(error);
    }
}

function createPostTemplate({ _id, immage, name, brand, description, price }) {
    // Template tipo:
    // --------------
    // <tr>
    //     <th>Name</th>
    //     <td>Description</td>
    //     <td>Price</td>
    //     <td>
    //         <a class="btn btn-primary btn-sm">
    //             <i class="fa-solid fa-pencil" aria-hidden="true"></i>
    //             <span class="ms-1">Edit</span>
    //         </a>
    //         <a class="btn btn-danger btn-sm ms-1">
    //             <i class="fa-solid fa-trash" aria-hidden="true"></i>
    //             <span class="ms-1">Delete</span>
    //         </a>
    //     </td>
    // </tr>

    // Istruzioni per costruire il template tramite JS:
    let tableRow = document.createElement("tr");

    let rowImg = document.createElement("th");
    rowImg.innerText = immage;
    let rowName = document.createElement("th");
    rowName.innerText = name;
    let rowBrand = document.createElement("th");
    rowBrand.innerText = brand;
    let rowDesc = document.createElement("td");
    rowDesc.innerText = description;
    let rowPrice = document.createElement("td");
    rowPrice.innerText = price;
    let rowOps = document.createElement("td");


    // Tasto di modifica:
    let editBtn = document.createElement("a");
    editBtn.classList.add("btn", "btn-primary", "btn-sm");
    editBtn.href = `modifica.html?pid=${_id}`;
    editBtn.target = "_blank";
    let editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil");
    let editText = document.createElement("span");
    editText.classList.add("ms-1");
    editText.innerText = "Edit";

    editBtn.appendChild(editImg);
    editBtn.appendChild(editText);

    // Tasto di cancellazione:
    let delBtn = document.createElement("a");
    delBtn.classList.add("btn", "btn-danger", "btn-sm", "ms-1");
    delBtn.addEventListener("click", () => {
        deletePost(_id);
    });
    let delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash");
    let delText = document.createElement("span");
    delText.classList.add("ms-1");
    delText.innerText = "Delete";

    delBtn.appendChild(delImg);
    delBtn.appendChild(delText);

    rowOps.appendChild(editBtn);
    rowOps.appendChild(delBtn);

    tableRow.appendChild(rowImg);
    tableRow.appendChild(rowName);
    tableRow.appendChild(rowBrand);
    tableRow.appendChild(rowDesc);
    tableRow.appendChild(rowPrice);
    tableRow.appendChild(rowOps);


    resultsBox.appendChild(tableRow);
}

async function createPost() {
    // Verifica di validazione:
    if (postImg.value && postName.value && postBrand.value && postDesc.value && postPrice.value) {
        // Acquisisco i valori degli input per la creazione del post:
        let newPost = {
            "imageUrl": postImg.value, 
            "name": postName.value,
            "brand": postBrand.value,
            "description": postDesc.value,
            "price": postPrice.value,
            "time": new Date()
        };

        try {
           
            
            const res = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
                method: "POST", body: JSON.stringify(newPost),
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-type": "application/json;charset=UTF-8"
                }
            });
            
            postImg.value = "";
            postName.value = "";
            postBrand.value = "";
            postDesc.value = "";
            postPrice.value = "";

            
            getPosts();
        } catch (error) {
            console.log(error);
        }
    } else {
        inputAlert.classList.toggle("d-none");
        // console.log("Devi inserire tutti e 3 i campi obbligatori!");
        setTimeout(() => {
            inputAlert.classList.toggle("d-none");
        }, 5000);
    }
}



//funzione per eliminare
async function deletePost(pid) {
    try {
        const res = await fetch(apiUrl + pid, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
            }
        });

        if (res.ok) {
          
            getPosts(); 
            deleteAlert.classList.toggle("d-none");
            setTimeout(() => {
                deleteAlert.classList.toggle("d-none");
            }, 5000);
        } else {
          
            console.error('Errore durante l\'eliminazione del post:', res.status);
        }
    } catch (error) {
        console.error('Errore durante la richiesta DELETE:', error);
    }
}
