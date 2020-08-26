function renderFurniture (meuble, type) {
    if (type == 'single') {
        return `
        <div class="card col-10 bg-success img-center text-center text-light">
            <H2 class="designation">${meuble.name}</h2>
            <p class="reference">${meuble._id}</p>
            <img class="image" src=${meuble.imageUrl} alt="photo de meuble" width=200/>
            <p class="prix">${meuble.price} €</p>
            <p class="description">${meuble.description}</p>
        </div>
        `;
    } else {
        return `
        <div class="card col-10 bg-success img-center text-center text-light">
            <H2 class="designation">${meuble.name}</h2>
            <p class="reference">${meuble._id}</p>
            <img class="image" src=${meuble.imageUrl} alt="photo de meuble" width=200/>
            <p class="prix">${meuble.price} €</p>
            <a href="article.html?id=${meuble._id}" title="page produit">
                <button class="btn btn-warning">
                    Commander
                </button>
            </a>
        </div>`;
    }
}