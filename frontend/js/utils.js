function renderFurniture (meuble, type) {
    if (type == 'single') {
        return `
        <div class="card col-10 img-center text-center text-light">
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