
fetch('http://localhost:3000/api/furniture')
.then(response => {
    if (response.status === 200) {
        return response.json();
    }
})
.then(meubles => {
    //displayFurnitures(meubles);
    //console.log(meubles);
})

//function getCart(){
//}
