displayQtyOfProducts();

//aller chercher dans l'API les données produits
fetch('https://oc-p5-api.herokuapp.com/api/furniture')
.then(response => {
    if (response.status === 200) {
        return response.json();
    }
})
.then(meubles => {
    displayFurnitures(meubles);
})


//afficher les données produits dans le HTML
function displayFurnitures(meubles) {
    let element = document.getElementById('produits');
    let html = '';
    meubles.forEach(meuble => {
        html += renderFurniture(meuble, 'list');
    });
    element.innerHTML = html;
}