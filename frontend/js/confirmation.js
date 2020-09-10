let response = get('response');
let recapitulatif = document.getElementById('recap');

recapitulatif.innerHTML = displayRecap();
listenToQuit();

function displayRecap(){
    let html = `
    <div class="recapitulatif">
        <h3 class="confirm__titre">votre numéro de commande : ${response.orderId}</h2>
        <div class="confirm">
            <div class="confirm__box1">   
                <h4 class="text-center">Rappel de vos coordonnées :</h4>
                    <p>Nom : ${response.contact.firstName}</p>
                    <p>Prenom : ${response.contact.lastName}</p>
                    <p>Adresse : ${response.contact.address}</p>
                    <p>Ville : ${response.contact.city}</p>
                    <p>email : ${response.contact.email}</p>
            </div>
            <div class="confirm__box2">
                <h4 class="text-center">Rappel des références commandées :</h4>
                <div class="confirm__box2__products">
                `;
                    response.products.forEach((product)=> {
                        html += `
                        <div class="produit">
                            <p>${product._id}</p>
                            <p>${product.name}</p>
                            <p>${product.price}</p>
                        </div>`;
                    })
                    html +=`
                </div>
            </div>
        </div>
    </div>
    `
    return html;
}

function listenToQuit(){
    let quitter = document.getElementById('quitter');
    quitter.addEventListener('click', () =>{
        window.location.href="./index.html";
        clear();
    })
}