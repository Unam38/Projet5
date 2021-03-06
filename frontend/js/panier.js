displayQtyOfProducts();

if (Storage.has("panier")) {
  show("panier-plein");
  show("formulaire");
  show("total-price");
  hide("panier-vide");
} else {
  hide("panier-plein");
  hide("formulaire");
  hide("total-price");
  show("panier-vide");
}

if (Storage.has("panier")) {
  fetch("https://oc-p5-api.herokuapp.com/api/furniture")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    })
    .then((meubles) => {
      let meublesPanier = getMeubles(meubles);
      let total = getTotal(meublesPanier);
      displayProducts(meublesPanier);
      displayTotal(total);
      listenForEmptyCart("vider-panier");
      show("formulaire");
      listenForOrderSubmission();
      Storage.get("panier").forEach((id) => {
        listenForProductDeletion(id);
      });
    });
}

function listenForProductDeletion(id) {
  document.getElementById("deleteButton-" + id).addEventListener("click", function () {
      let productsIds = Storage.get("panier");
      let index = productsIds.findIndex((productId) => id == productId);
      productsIds.splice(index, 1);
      Storage.store("panier", productsIds);
      location.reload();
      console.log(productsIds.length);
    });
}

function listenForOrderSubmission() {
  document.getElementById("acheter").addEventListener("click", (e) => {
    e.preventDefault();
    if (
      !(
        isLastNameValid(getInputValue("name")) &&
        isFirstNameValid(getInputValue("firstname")) &&
        isAddressValid(getInputValue("address")) &&
        isVilleValid(getInputValue("city")) &&
        isMailValid(getInputValue("mail"))
      )
    ) {
      alert("Un champ au moins n'est pas bien rempli");
      return;
    }
    let payload = {
      contact: {
        firstName: getInputValue("name"),
        lastName: getInputValue("firstname"),
        address: getInputValue("address"),
        city: getInputValue("city"),
        email: getInputValue("mail"),
      },
      products: Storage.get("panier"),
    };
    postCommande(payload).then((data) => {
      Storage.clear();
      let response = JSON.parse(data);
      Storage.store("order-id", response.orderId);
      window.location.replace("confirmation.html");
    });
  });
}

function listenForEmptyCart(val) {
  document.getElementById(val).addEventListener("click", () => {
    Storage.clear();
    location.reload();
  });
}

function getTotal(meubles) {
  let total = 0;
  meubles.forEach((meuble) => {
    total += meuble.price / 100;
  });
  return total;
}

function displayTotal(total) {
  document.getElementById("prix-total").innerHTML = total + `.00`;
}

function displayProducts(meubles) {
  let html = " ";
  meubles.forEach((meuble) => {
    html += renderFurniture(meuble, "panier");
  });
  document.getElementById("panier-plein").innerHTML = html;
}

function getMeubles(meubles) {
  let list = [];
  let panierIds = Storage.get("panier");
  meubles.forEach((meuble) => {
    let id = meuble._id;
    if (panierIds.includes(id)) {
      list.push(meuble);
    }
  });
  return list;
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

function postCommande(payload) {
  return new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("POST", "https://oc-p5-api.herokuapp.com/api/furniture/order");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(payload));
    request.addEventListener("load", function () {
      if (request.status >= 200) {
        resolve(request.responseText);
      } else {
        reject(request.statusText);
      }
    });
  });
}

function isLastNameValid(nom) {
  let nomValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
  if (nomValid.test(nom) == true) {
    document.getElementById("nom-manquant").innerHTML = "";
    return true;
  } else {
    document.getElementById(
      "nom-manquant"
    ).innerHTML = `<p>Entrée non valide</p>`;
    return false;
  }
}

function isFirstNameValid(prenom) {
  let prenomValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
  if (prenomValid.test(prenom) == true) {
    document.getElementById("prenom-manquant").innerHTML = "";
    return true;
  } else {
    document.getElementById(
      "prenom-manquant"
    ).innerHTML = `<p>Entrée non valide</p>`;
    return false;
  }
}

function isMailValid(mail) {
  let mailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (mailValid.test(mail) == true) {
    document.getElementById("mail-manquant").innerHTML = "";
    return true;
  } else {
    document.getElementById(
      "mail-manquant"
    ).innerHTML = `<p>Entrée non valide</p>`;
    return false;
  }
}

function isAddressValid(address) {
  let addressValid = /^[0-9]* ?[a-zA-Z,\. ]*?[a-zA-Z,\. ]{5,128}$/;
  if (addressValid.test(address) == true) {
    document.getElementById("address-manquant").innerHTML = "";
    return true;
  } else {
    document.getElementById(
      "address-manquant"
    ).innerHTML = `<p>Entrée non valide</p>`;
    return false;
  }
}

function isVilleValid(ville) {
  let villeValid = /^[a-zA-Zéèêàçïî]+([-'\s][a-zA-ZéèêîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
  if (villeValid.test(ville) == true) {
    document.getElementById("ville-manquant").innerHTML = "";
    return true;
  } else {
    document.getElementById(
      "ville-manquant"
    ).innerHTML = `<p>Entrée non valide</p>`;
    return false;
  }
}
