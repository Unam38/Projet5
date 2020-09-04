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

function canAddToCartButton(article){
    if (!has('panier')){
        return true;
    }
    if (get('panier').includes(article._id)){
        return false;
    }
    return true;
}

function listenAddToCart (article){
    let panier = [];
    document.getElementById('add-cart').addEventListener('click',()=> {
       if (has('panier')){
           panier = get('panier');
       }
       if (canAddToCartButton(article)){
       panier.push(article._id);
       store('panier',panier);
       displayQtyProduct();
    }
    })
}