if (has('panier')) {
    show('panier-plein');
    show('formulaire');
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
        listenForEmptyCart();
    })
    
    
}
function listenForOrderSubmission(){
    document.getElementById('acheter').addEventListener('click',() =>{
        //récupère le contact et la liste de produits
        //envoie les au backend
    })
}
function listenForEmptyCart(){
    document.getElementById('vider-panier').addEventListener('click', () => {
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