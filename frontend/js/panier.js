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
        let panierIds = get('panier');
        let html='';
        let prixTotal = 0;
        for (let i = 0; i < meubles.length; i++){
            let meuble = meubles[i];
            let id = meuble._id;
            if (panierIds.includes(id)){
                html += renderFurniture(meuble, 'single')
                //pour chaque meuble récupère le prix
                let price = meuble.price;
                //ajoute le prix au prixTotal
                prixTotal = prixTotal + price;
            }
            console.log(prixTotal);
            document.getElementById('prix-total').innerHTML = prixTotal;
        }
        document.getElementById('panier-plein').innerHTML = html;
    })
    document.getElementById('vider-panier').addEventListener('click', () => {
        clear();
        location.reload();
    })
}