let contact = [];
let products = has('panier');
if (contact.length == 0 ){
    hide('acheter');
    let valid = document.getElementById('acheter');
    let name = document.getElementById('name');
    let firstname = document.getElementById('firstname');
    let email = document.getElementById('mail');
    let address= document.getElementById('address');
    let cp = document.getElementById('codePostal');
    let ville = document.getElementById('city');
    name.addEventListener('change',() =>{
        if (isNameValid()){
            contact.push(nom);
        };
    });
    firstname.addEventListener('change',()=>{
        if (isFirstNameValid()){
            contact.push(prenom);
        };
    });
    email.addEventListener('change', () =>{
        if (isMailValid()){
            contact.push(mail);
        };
    });
    address.addEventListener('change', () =>{
        if (isAddressValid()){
            contact.push(address);
        };
    });
    cp.addEventListener('change', () =>{
        if (isCpValid()){
            contact.push(cp);
        };
    });
    ville.addEventListener('change', () =>{
        if (isVilleValid()){
            contact.push(ville);
        };
    });
} if(contact.length != 0) {
    show('acheter');
    document.getElementById('acheter').addEventListener('click', () =>{
    let payload = JSON.stringify(contact) + products;
    console.log(payload);
    // post la variable vers le backend
    //let recap = document.getElementById('recap');
    //recap.innerHTML = renderRecap();

    /*let payload = {
        contact : {
            firstName: string,
            lastName: string,
            address: string,
            city: string,
            email: string,
        }
        products : [string] //<= array of product _id
    }*/


    //postCommande(payload);
    })
}
function listenForOrderSubmission(){
    document.getElementById('acheter').addEventListener('click', function(){
        if (isNameValid() && isFirstNameValid() && isMailValid() && isAddressValid() && isCpValid() && isVilleValid()){
            postcommande(payload);
        }
    })
}

//let name = document.getElementById('name');
//name.addEventListener('input', isNameValid());



function getValue(val){
    return document.getElementById(val).value;
}

function getNumCommande(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function postCommande (payload) {
    var request = new XMLHttpRequest();
    request.open("POST", 'http://localhost:3000/api/order');
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(payload));
}