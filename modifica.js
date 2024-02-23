
// Input post name:
const postName = document.getElementById("post-name");
// Input post description:
const postDesc = document.getElementById("post-description");
// Input post price:
const postPrice = document.getElementById("post-price");
// Alert per dati incompleti:
const inputAlert = document.getElementById("alert-msg");
// Alert per update completa:
const editedAlert = document.getElementById("update-msg");
// Endpoint:
const apiUrl = "https://striveschool-api.herokuapp.com/api/agenda/";

const paramObj = new URLSearchParams(window.location.search); // Oggetto con i vari query params
const myPostId = paramObj.get("pid"); // Id del post attivo...

// Esegui al caricamento della pagina:
window.onload = showPost();

// Recupera i dati del singolo post ed inseriscili nei rispettivi input
async function showPost() {
    try {
        const res = await fetch(apiUrl + myPostId);
        const json = await res.json();

        postName.value = json.name;
        postDesc.value = json.description;
        postPrice.value = json.price ? json.price : "0";
    } catch(err) {
        console.log(err);
    }
}

// Funzione per editare il post attivo nella pagina detail.html
async function editPost() {
    // Validation per la casistica di utente che svuota tutti gli input...
    if(postName.value && postDesc.value && postPrice.value) {
        try {
            // Recuperare i dati attivi degli input ed inserirli nell'oggetto Payload
            let myPayload = { "name": postName.value, "description": postDesc.value, "price": postPrice.value };
            const res = await fetch(apiUrl + myPostId, { "method": "PUT", "body": JSON.stringify(myPayload), "headers": { "Content-Type": "application/json" }});
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