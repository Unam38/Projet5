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
    document.getElementById('acheter').addEventListener('click',() =>{  
        if (isNameValid(getInputValue('name')) 
            && isFirstNameValid(getInputValue('firstname'))
            && isAddressValid(getInputValue('address'))
            && isVilleValid(getInputValue('city'))
            && isMailValid(getInputValue('mail'))){
                let contact = {
                    firstName : getInputValue('name'),
                    lastName : getInputValue('firstname'),
                    address : getInputValue('address'),
                    city : getInputValue('city'),
                    email : getInputValue('mail'),
                };
                //console.log(contact);
                let products = get('panier');
                //console.log(products);
                let payload = { contact: contact, products: products };
                console.log(payload);
                postCommande(payload);
                listenForEmptyCart('acheter');
                getOrderId();
                console.log(getOrderId());
        }else{
            alert("Un champ au moins n'est pas bien rempli");
        }
    })
}
function listenForEmptyCart(val){
    document.getElementById(val).addEventListener('click', () => {
        clear();
        location.reload();
    });
}
function getTotal(meubles){
    //return meubles.reduce((total, element) => {total + element.price});
    let total = 0;
    meubles.forEach((meuble) =>{
        total += meuble.price;
    })
    return total;
}
function displayTotal(total){
    document.getElementById('prix-total').innerHTML = total;
}
function displayProducts(meubles){
    let html=' ';
    meubles.forEach((meuble) =>{
        html += renderFurniture(meuble, 'single')
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
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost:3000/api/furniture/order');
    request.setRequestHeader("Content-Type", "application/json");
    console.log(payload);
    request.send(JSON.stringify(payload));
    let response = postData.text;
    console.Log(response);
}
function getOrderId() {
    let recap = document.getElementById('recap');
    fetch('http://localhost:3000/api/furniture/order')
    .then(response => {
        if (response.status === 200) {
        return response.json;
        }
    })
    .then(orderId =>{
        recap.textContent = orderId;
        console.log(orderId);
    })
}

function isNameValid(nom){
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