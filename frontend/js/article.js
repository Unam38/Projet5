const id = getId();
let addCart = document.getElementById('add-cart');
let articleChoisi = document.getElementById('articleChoisi');
let panier = [];

fetch (`http://localhost:3000/api/furniture/${getId()}`)
.then (response => {
    if (response.status === 200) {
        return response.json();
    }
})
.then(article => {
    displayChoice(article);
    //console.log(article);
    //console.log(article.name);
    //console.log(article._id);
    //console.log(article.price);
    //console.log(article.description);
    //console.log(article.imageUrl);
    addToCart (article)
})
function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
function displayChoice(article) {
    articleChoisi.innerHTML = renderFurniture(article, 'single');
}


// je veux ajouter l'identifiant de l'article à mon panier en clickant sur le bouton addock
//sans écraser le précédent, et l'envoyer dans le storage...
function addToCart (article){
   addCart.addEventListener('click',()=> {
       let cart = localStorage.getItem('panier');
       /*article.forEach(art => {
            panier.push(art.imageUrl, art.name, art._id, art.price);
            localStorage.setItem('panier',panier);
        });*/
       if (cart){
           panier.push(article.name, article._id, article.price);
           localStorage.setItem('panier',JSON.stringify(panier));
       }
       panier.push(article.name, article._id, article.price);
       localStorage.setItem('panier', JSON.stringify(panier));    
   })
}
    


//je crée une boucle pour ajouter au local storage lorsqu'on click sur le bouton ajouter
/*for (let i=0; i < addCart.length; i++) {
    addCart[i].addEventListener('click', () => {
       //addLocalStorage();
       addToCart();
    })
}
//je met a jour le nombre d'articles dans le panier dans le bandeau haut
/*function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumber');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
//j'ajoute le produit sélectionné à mon local storage par son id
//mais je voudrait que ce soit un tableau
function addLocalStorage() {
    let productId = localStorage.getItem('productId');
    let productNumbers = localStorage.getItem('cartNumber');
    productNumbers = parseInt(productNumbers);
    if (productId) {
        localStorage.setItem('cartNumber', productNumbers + 1);
        localStorage.setItem('productId', JSON.stringify(id));
        document.querySelector('.cart span').textContent = productNumbers + 1;
        getProductId()
    } else {
        localStorage.setItem('cartNumber',1);
        localStorage.setItem('productId', JSON.stringify(id));
        document.querySelector('.cart span').textContent = 1;
    }
    //panier();
    //console.log(panier);
}
function getProductId(){
    let productId = localStorage.getItem('productId');
    productId = [JSON.parse(productId)];;
    panier.push(productId);
}
 onLoadCartNumbers();*/