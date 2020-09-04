function renderFurniture (meuble, type) {
    if (type == 'single') {
        return `
        <div class="card img-center text-center text-light">
            <H2 class="designation">${meuble.name}</h2>
            <p class="reference">${meuble._id}</p>
            <img class="image" src=${meuble.imageUrl} alt="photo de meuble" width=200/>
            <p class="prix">${meuble.price} €</p>
            <p class="description">${meuble.description}</p>
            <select class="select">
                <option>${meuble.varnish[0]}
                <option>${meuble.varnish[1]}
                <option>${meuble.varnish[2]}
            </select>
        </div>
        `;
    } else {
        return `
        <div class="card col-10 img-center text-center text-light">
            <H2 class="designation">${meuble.name}</h2>
            <p class="reference">${meuble._id}</p>
            <img class="image" src=${meuble.imageUrl} alt="photo de meuble" width=200/>
            <p class="prix">${meuble.price} €</p>
            <a href="article.html?id=${meuble._id}" title="page produit">
                <button class="commander">
                    Commander
                </button>
            </a>
        </div>`;
    }
}

function displayQtyProduct(){
    if (! has('panier')) {
        return 0;
    }
    return get('panier').length;
}
document.getElementById('count').textContent = displayQtyProduct();

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function hide(id){
    document.getElementById(id).style.display = 'none';
}

function isNameValid(){
    let nom = getValue('name');
    let nomValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    if(nomValid.test(nom)== true){
        document.getElementById('nom-manquant').innerHTML =""
        contact.push("firstName : "+nom);
        console.log(contact);
    } else {
        document.getElementById('nom-manquant').innerHTML = `<p>Entrée non valide</p>`;
    }
}

function isFirstNameValid(){
    let prenom = getValue('firstname');
    let prenomValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    if(prenomValid.test(prenom)== true){
        document.getElementById('prenom-manquant').innerHTML =""
        contact.push("lastName : "+prenom);
        console.log(contact);
    } else {
        document.getElementById('prenom-manquant').innerHTML = `<p>Entrée non valide</p>`;
    }
}

function isMailValid(){
    let mail = getValue('mail');
    let mailValid =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(mailValid.test(mail)== true){
        document.getElementById('mail-manquant').innerHTML =""
        contact.push("email : "+mail);
        console.log(contact);
    } else {
        document.getElementById('mail-manquant').innerHTML = `<p>Entrée non valide</p>`;
    }
}

function isAddressValid(){
    let address = getValue('address');
    let addressValid =  /^[0-9]* ?[a-zA-Z,\. ]*?[a-zA-Z,\. ]{5,128}$/;
    if(addressValid.test(address)== true){
        document.getElementById('address-manquant').innerHTML =""
        contact.push("address : "+address);
        console.log(contact);
    } else {
        document.getElementById('address-manquant').innerHTML = `<p>Entrée non valide</p>`;
    }
}

function isCpValid(){
    let cp = getValue('codePostal');
    let cpValid =  /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
    if(cpValid.test(cp)== true){
        document.getElementById('cp-manquant').innerHTML =""
        contact.push("Code Postal : "+cp);
        console.log(contact);
    } else {
        document.getElementById('cp-manquant').innerHTML = `<p>Entrée non valide</p>`;
    }
}

function isVilleValid(){
    let ville = getValue('city');
    let villeValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    if(villeValid.test(ville)== true){
        document.getElementById('ville-manquant').innerHTML =""
        contact.push("city : "+ville);
        console.log(contact);
    } else {
        document.getElementById('ville-manquant').innerHTML = `<p>Entrée non valide</p>`;
    }
}