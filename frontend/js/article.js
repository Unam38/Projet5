
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
    listenAddToCart (article)
})
function getId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}
function displayChoice(article) {
    let articleChoisi = document.getElementById('articleChoisi');
    articleChoisi.innerHTML = renderFurniture(article, 'single');
}

// je veux ajouter l'identifiant de l'article à mon panier en clickant sur le bouton addock
//sans écraser le précédent, et l'envoyer dans le storage...
function listenAddToCart (article){
    let panier = [];
    document.getElementById('add-cart').addEventListener('click',()=> {
       if (has('panier')){
           panier = get('panier');
       }
       if (panier.includes(article._id)){
           alert('désolé, nous sommes en rupture de stock');
           return;
       }
       panier.push(article._id);
       store('panier',panier);
   })
}