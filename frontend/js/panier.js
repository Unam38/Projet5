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
        for (let i = 0; i < meubles.length; i++){
            let meuble = meubles[i];
            let id = meuble._id;
            if (panierIds.includes(id)){
                html += renderFurniture(meuble, 'single')
            }
        }
        document.getElementById('panier-plein').innerHTML = html;
        
        for (let p=0; p<meubles.length; p++){
            let meuble = meubles[p];
            let prix = meuble.price;
            console.log(prix);
        }
    })
    document.getElementById('vider-panier').addEventListener('click', () => {
        clear();
        location.reload();
    })
}

