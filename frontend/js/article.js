displayQtyOfProducts();

//aller chercher dans l'API les données produits
fetch (`https://oc-p5-api.herokuapp.com/api/furniture/${getId()}`)
.then (response => {
    if (response.status === 200) {
        return response.json();
    }
})
.then(article => {
    displayChoice(article);
    listenAddToCart (article)
    if (!canAddToCartButton(article)){
        document.getElementById('add-cart').disabled = true;
    }
})
//récupérer l'ID dans l'URL
function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

//afficher l'article choisi par l'utilisateur
function displayChoice(article) {
    let articleChoisi = document.getElementById('articleChoisi');
    articleChoisi.innerHTML = renderFurniture(article, 'single');
}

//désactive le bouton par son ID
function disableButton(id){
    document.getElementById(id).disabled = true;
}

//Vérifier si le panier contient des données et si on peut ajouter l'article
function canAddToCartButton(article){
    if (!Storage.has('panier')){
        return true;
    }
    if (Storage.get('panier').includes(article._id)){
        return false;
    }
    return true;
}

/*
écouter le click sur le bouton ajouter au panier
vérifier si l'ID est déjà présent
afficher un message à l'utilisateur
désactiver le bouton si c'est le cas
*/
function listenAddToCart (article){
    let panier = [];
    document.getElementById('add-cart').addEventListener('click',()=> {
       if (Storage.has('panier')){
           panier = Storage.get('panier');
       }
       if (canAddToCartButton(article)){
       panier.push(article._id);
       Storage.store('panier',panier);
       displayQtyOfProducts();
       disableButton('add-cart');
       alert("l'article a bien été ajouté à votre panier, un seul article autorisé...");
    }
    })
}