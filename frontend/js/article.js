displayQtyOfProducts();

fetch (`http://localhost:3000/api/furniture/${getId()}`)
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

function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

function displayChoice(article) {
    let articleChoisi = document.getElementById('articleChoisi');
    articleChoisi.innerHTML = renderFurniture(article, 'single');
}

function disableButton(id){
    document.getElementById(id).disabled = true;
}

function canAddToCartButton(article){
    if (!Storage.has('panier')){
        return true;
    }
    if (Storage.get('panier').includes(article._id)){
        return false;
    }
    return true;
}

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