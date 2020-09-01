
let coordonnees = [];
if (! localStorage.getItem('coordonnees')){
    hide('acheter');
    let valid = document.getElementById('valid');
    valid.addEventListener('click', () => {
        coordonnees.push('nom :',getValue('name'));
        coordonnees.push('prenom :',getValue('firstname'));
        coordonnees.push('mail :',getValue('mail'));
        coordonnees.push('adress :',getValue('adress'));
        coordonnees.push('codePostal :',getValue('codePostal'));
        coordonnees.push('city :',getValue('city'));
        store('coordonnees', coordonnees);
    })
} else {
    show('acheter');
    let numCommande = getNumCommande(100);
    //console.log(numCommande);
    coordonnees = get('coordonnees');
    console.log(coordonnees);
    document.getElementById('acheter').addEventListener('click', () =>{
    let commande = "commande numéro "+ numCommande + has('coordonnees') + has('panier');
    console.log(commande);
    console.log(typeof commande);
    // post la variable vers le backend
    let recap = document.getElementById('recap');
    recap.innerHTML = renderRecap();
    postCommande();
    })
}



function getValue(val){
    return document.getElementById(val).value;
}

function getNumCommande(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function renderRecap(){
    return `
    <h3 class="numCommande">Votre numéro de commande :${numCommande}</h3>
    <p class="panier">Vos références commandées :${has('panier')}</p>
    <p class="livraison">Rappel de vos coordonnées pour la livraison :${has('coordonnees')}</p>
    `
}

function postCommande () {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost:3000/api/order');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(commande));
}