if (has('panier')) {
    show('panier-plein');
    hide('panier-vide');
} else{
    hide('panier-plein');
    hide('formulaire');
    show('panier-vide');
}

if (has('panier')){
    fetch('http://localhost:3000/api/furniture')
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }
    })
    .then(meubles => {
        let meublesPanier = getMeubles(meubles);
        let total = getTotal(meublesPanier);
        displayProducts(meublesPanier);
        displayTotal(total);
        listenForEmptyCart('vider-panier');
        show('formulaire');
        listenForOrderSubmission();
    })
    
    
}

function listenForOrderSubmission(){
    document.getElementById('acheter').addEventListener('click',(e) =>{  
        e.preventDefault();
        if (!(isLastNameValid(getInputValue('name')) 
            && isFirstNameValid(getInputValue('firstname'))
            && isAddressValid(getInputValue('address'))
            && isVilleValid(getInputValue('city'))
            && isMailValid(getInputValue('mail'))))
        {
                alert("Un champ au moins n'est pas bien rempli");
                return;
        }
        let payload = {
            contact : {
            firstName : getInputValue('name'),
            lastName : getInputValue('firstname'),
            address : getInputValue('address'),
            city : getInputValue('city'),
            email : getInputValue('mail'),
            },
            products: get('panier')
        };
        postCommande(payload).then((data) =>{
            clear();
            let response = JSON.parse(data);
            store ('response', response);
            window.location.href="./confirmation.html";
        });
    })
}

function listenForEmptyCart(val){
    document.getElementById(val).addEventListener('click', () => {
        clear();
        location.reload();
    });
}

function getTotal(meubles){
    let total = 0;
    meubles.forEach((meuble) =>{
        total += meuble.price/100;
    })
    return total;
}

function displayTotal(total){
    document.getElementById('prix-total').innerHTML = total + `.00`;
}

function displayProducts(meubles){
    let html=' ';
    meubles.forEach((meuble) =>{
        html += renderFurniture(meuble, 'list')
    })
    document.getElementById('panier-plein').innerHTML = html;
}

function getMeubles(meubles){
    let list = [];
    let panierIds = get('panier');
    meubles.forEach((meuble) => {
        let id= meuble._id;
        if (panierIds.includes(id)){
            list.push(meuble)
        }
    })
    return list;
}

function getInputValue(val){
    return document.getElementById(val).value;
}

function postCommande (payload) {
    return new Promise((resolve, reject) => {
        var request = new XMLHttpRequest();
        request.open("POST", 'http://localhost:3000/api/furniture/order');
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(payload));
        request.addEventListener("load", function() {
            if(request.status >=200){
                resolve(request.responseText);
            } else {
                reject(request.statusText);
            }
        });
    });
}

function isLastNameValid(nom){
    let nomValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    if(nomValid.test(nom)== true){
        document.getElementById('nom-manquant').innerHTML =""
        return true;
    } else {
        document.getElementById('nom-manquant').innerHTML = `<p>Entrée non valide</p>`;
        return false;
    }
}

function isFirstNameValid(prenom){
    let prenomValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    if(prenomValid.test(prenom)== true){
        document.getElementById('prenom-manquant').innerHTML =""
        return true;
    } else {
        document.getElementById('prenom-manquant').innerHTML = `<p>Entrée non valide</p>`;
        return false;
    }
}

function isMailValid(mail){
    let mailValid =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(mailValid.test(mail)== true){
        document.getElementById('mail-manquant').innerHTML =""
        return true;
    } else {
        document.getElementById('mail-manquant').innerHTML = `<p>Entrée non valide</p>`;
        return false;
    }
}

function isAddressValid(address){
    let addressValid =  /^[0-9]* ?[a-zA-Z,\. ]*?[a-zA-Z,\. ]{5,128}$/;
    if(addressValid.test(address)== true){
        document.getElementById('address-manquant').innerHTML =""
        return true;
    } else {
        document.getElementById('address-manquant').innerHTML = `<p>Entrée non valide</p>`;
        return false;
    }
}

function isVilleValid(ville){
    let villeValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    if(villeValid.test(ville)== true){
        document.getElementById('ville-manquant').innerHTML =""
        return true;
    } else {
        document.getElementById('ville-manquant').innerHTML = `<p>Entrée non valide</p>`;
        return false;
    }
}