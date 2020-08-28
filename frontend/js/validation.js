
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
    console.log(numCommande);
    coordonnees = get('coordonnees');
    console.log(coordonnees);
    document.getElementById('acheter').addEventListener('click', () =>{
        let commande = "commande numéro"+numCommande + has('coordonnees') + has('panier');
        console.log(commande);
    // post la variable vers le backend
    })
}


function getValue(val){
    return document.getElementById(val).value;
}

function getNumCommande(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }