// Déclaration d'une variable cartContent qui aura la valeur d'un tableau
let cartContent = [];

const numberOfAddedProducts = document.querySelector(`#numberOfAddedProducts`)
// Fonction permettant l'ajout d'un produit dans le panier et l'envoie du panier dans le Local Storage
function CartInit() {
    // Déclaration d'un objet "produitAjoutéAuPanier" avec plusieurs paires de clés et de valeurs
    let productAddedToCart = {
        name: productName.innerText,
        /*Utilisation de la fonction parseFloat qui permet de transformer une chaîne 
        de caractères en nombre flottant*/
        quantity: parseFloat(numberOfAddedProducts.value),
        lens: document.getElementById(`lensOptions`).value,
        price: parseFloat(productPrice.innerText),
        _id: id,
    };
    //console.log(productAddedToCart);
    /*Vérification du contenu du panier dans le Local Storage, si il contient déjà un objet, 
    on le récupère*/
    if (localStorage.getItem(`cart-content`) != null) {
        // Dans ce cas on utilise la méthode JSON.parse qui transformera la chaîne JSON en valeur JS
        cartContent = JSON.parse(localStorage.getItem(`cart-content`));
    }
    // On ajoute à notre tableau "CartContent" l'objet "productAddedToCart"
    cartContent.push(productAddedToCart);
    /*On envoie le contenu de notre panier au Local Storage en utilisant la méthode JSON.stingify qui 
    conervtit notre valeur JS en chaîne JSON*/
    localStorage.setItem(`cart-content`, JSON.stringify(cartContent));
    //console.log(localStorage)
}

let cartBadge = document.getElementById(`cartBadge`)

// Fonction permettant la mise à jour de la quantité affichée sur le badge de l'icône du panier
function GetQuantityFromLs() {
    // Si le panier possède un contenu dans Local Storage, on le récupère 
    if (localStorage.getItem(`cart-content`) != null) {
        cartContent = JSON.parse(localStorage.getItem(`cart-content`))
        // On déclare une variable correspondant à la quantité totale du panier et initialisée à 0
        let totalQuantity = 0
        //on parcourt chaque index (objet) du tableau cartContent avec une boucle
        for (let i = 0; i < cartContent.length; i++) {
            let product = cartContent[i]
            //console.log(product.quantity)
            // à chaque tour de boucle on incrémente totalQuantity en y ajoutant la quantité du produit parcouru
            totalQuantity += product.quantity
            //console.log(totalQuantity)
        }
        /*Si la quantité totale est supérieure à 0 on injecte dans le html le code qui fera apparaître 
        le badge avec la valeur de totalQuantity*/
        if (totalQuantity > 0) {
            cartBadge.classList.add('cartBadge', 'position-absolute', 'top-0', 'start-100', 'translate-middle', 'badge', 'rounded-pill', 'bg-danger')
            cartBadge.innerText = `+ ${totalQuantity}`
        }
    }
}
/*appel de la fonction au chargement des pages index.html, product.html et cart.html pour que le badge
soit visible sur chacunes d'elles*/
GetQuantityFromLs()







