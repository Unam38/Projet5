function renderFurniture (meuble, type) {
    if (type == 'single') {
        let html = `
        <div class="col-md-8 text-center">
            <div class="meuble card text-center">
                <H2 class="meuble__designation">${meuble.name}</h2>
                <p class="meuble__reference">${meuble._id}</p>
                <img class="meuble__image w-75" src=${meuble.imageUrl} alt="photo de meuble"/>
                <p class="meuble__prix">${meuble.price/100}.00 €</p>
                <p class="meuble__description">${meuble.description}</p>
                <select class="meuble__select">
            `;
                meuble.varnish.forEach((option) =>{
                    html += `<option>${option}</option>`;
                })
                html += `
                </select>
            </div>
        </div>
        `;
        return html;
    } else {
        return `
        <div class="col-md-4 col-lg-6 text-center">
            <div class="meuble card text-center">
                <H2 class="meuble__designation">${meuble.name}</h2>
                <p class="meuble__reference">${meuble._id}</p>
                <img class="meuble__image w-75" src=${meuble.imageUrl} alt="photo de meuble"/>
                <p class="meuble__prix">${meuble.price/100}.00 €</p>
                <a href="article.html?id=${meuble._id}" title="page produit">
                    <button class="btn-warning commander">
                        Commander
                    </button>
                </a>
            </div>
        </div>`;
    }
}

function countQtyProduct(){
    if (! has('panier')) {
        return 0;
    }
    return get('panier').length;
}

function displayQtyOfProducts(){
    document.getElementById('count').textContent = countQtyProduct();
}

function show(id) {
    document.getElementById(id).style.display = 'flex';
}

function hide(id){
    document.getElementById(id).style.display = 'none';
}

