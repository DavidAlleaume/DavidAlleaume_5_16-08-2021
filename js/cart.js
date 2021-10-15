// Constante contenant le code html du message d'alerte lorsque le panier est vide
const emptyCartAlert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
<h5 class="alert-heading text-center">Votre panier est vide !</h5>
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
</button>
</div>`
//  Fonction permettant la création d'une ligne "produit" dans le panier chaque fois qu'un produit est ajouté
function NewCartRow(product) {
    // Pour chaque produit, on multiplie la quantité par le prix pour avoir le prix total par produit
    let totalPricePerProduct = product.quantity * product.price
    // Constante contenant le code html et les valeurs d'une ligne "produit" dans le panier
    const cartRow = `<tr>
                        <th scope="row" class="text-center">${product.name}</th>
                        <td class="text-center">${product.lens}</td>
                        <td class="text-center">${product.quantity}</td>
                        <td class="totalPricePerProduct text-center">${totalPricePerProduct} €</td>
                        <td class="text-center"><button type="button" class="remove_product_btn btn btn-danger btn-sm">
                                <svg width="15" aria-hidden="true" focusable="false" data-prefix="far" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path fill="currentColor" d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z">
                                    </path>
                                </svg>
                            </button>
                        </td>
                    <tr>`
    /*Sélection de l'élément du DOM dans lequel on injectera le code html d'une ligne "produit"
    pour chaque produit ajouté*/
    document.getElementById(`cartRowsContainer`).innerHTML += cartRow
}

// Calcul et affichage du montant total du panier

const totalPricePerProductArray = []
const TOTALPRICE = document.getElementById(`totalPrice`)

function TotalPriceInCart() {
    // Si le panier existe dans le Local Storage
    if (localStorage.getItem(`cart-content`) !== null) {
        // pour chaque produit du panier
        cartContent.forEach((product) => {
            // on initialise une variable dans laquelle on stocke la quantité totale par produit
            let totalPricePerProduct = product.quantity * product.price
            // on push chaque quantité totale par produit dans le tableau initialisé précédemment
            totalPricePerProductArray.push(totalPricePerProduct)
            /*on initialise une variable totalPrice dont la valeur sera égale à la somme de toutes
            les quantité totales par produit en utilisant la méthode .reduce*/
            let totalPrice = totalPricePerProductArray.reduce((acc, currentValue) => {
                return acc + currentValue
            }, 0)
            // on injecte la valeur de totalPrice dans le texte de l'élément ciblé dans le DOM
            TOTALPRICE.innerText = `${totalPrice} €`
        })
        // Sinon 
    } else {
        // la valeur textuelle de l'élément du DOM est 0 €
        TOTALPRICE.innerText = `0 €`
        // et le message d'alerte "Panier vide" s'affiche
        document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert
    }
}

/*Fonction permettant la récupération dans le local storage des produits du panier stockés 
dans l'Item "cart-content"*/
function GetItemFromLs() {
    // Si le panier est vide...
    if (localStorage.getItem(`cart-content`) == null) {
        TotalPriceInCart()
        // sinon
    } else {
        // On récupère l'Item cart-content du local storage dans la constante cartContent
        cartContent = JSON.parse(localStorage.getItem('cart-content'))
        //console.log(cartContent)
        /*On passe chaque produit de cartContent dans la fonction NewCartRow pour créer 
        la ligne "produit" correspondante dans le panier*/
        cartContent.forEach((product) => NewCartRow(product))
        TotalPriceInCart()
    }
}
// On appelle la fonction au chargement de la page
GetItemFromLs()

// Cette fonction vide le Local Storage, supprime toutes les lignes "produit" du panier, 
function ClearAll() {
    let cartRowsContainer = document.getElementById(`cartRowsContainer`)
    cartRowsContainer.remove()
    cartBadge.remove()
    localStorage.clear()
    TotalPriceInCart()
}

// Suppression d'un produit du panier au clic sur le bouton "supprimer"

let removeProductBtn = document.getElementsByClassName(`remove_product_btn`)

// On parcourt la liste des boutons "supprimer"
for (let i = 0; i < removeProductBtn.length; i++) {
    let button = removeProductBtn[i]
    //console.log(button)
    // On ecoute le clic sur les boutons
    button.addEventListener(`click`, (e) => {
        // Si confirm renvoie true, 
        if (confirm(`Voulez-vous vraiment supprimer ce produit de votre panier ?`)) {
            // le bouton cliqué devient l'event target
            let buttonClicked = e.target
            // et on supprime la ligne contenant le bouton cliqué
            buttonClicked.parentElement.parentElement.remove()
            // Si le panier contient plus d'un produit
            if (cartContent.length > 1) {
                /*on crée une variable product contenant l'objet produit de la ligne produit
                sur laquelle on a cliqué*/
                let product = cartContent[i]
                //console.log(product)
                // Fonction permattant de retourner l'ID du produit supprimé
                function Find(wanted) {
                    return wanted._id === product._id
                }
                /*On récupère l'index du produit supprimé dans le tableau cartContent
                grace à la méthode .findIndex qui prend en callback la fonction Find*/
                let index = cartContent.findIndex(Find)
                //console.log(index)
                /*Utilisation de la méthode .splice pour supprimer l'index 
                correspondant au produit supprrimé dans le tableau cartContent*/
                cartContent.splice(index, 1)
                // Mise à jour du contenu du Local Storage
                localStorage.setItem(`cart-content`, JSON.stringify(cartContent))
                // Rechargement de la page
                window.location.reload()
                // Sinon, si le panier ne contient plus qu'un produit
            } else {
                // on appelle la fonction ClearAll
                ClearAll()
            }
        }
    })
}

/*Fonction permettant de vider tout le contenu du panier
lorsqu'on clique sur le bouton "Vider le panier"*/

let clearCartBtn = document.getElementById(`empty_cart__btn`)
// On ecoute le clic sur le bouton
clearCartBtn.addEventListener(`click`, () => {
    // Si confirm renvoie true,
    if (confirm(`Souhaitez-vous vraiment vider tout le contenu de votre panier ?`)) {
        // appel de la fonction ClearAll
        ClearAll()
    }
})

// Création de la requête JSON contenant l'objet contact et le tableau products 
//lorsqu'on clique sur "Commander"

// Récupération des inputs dans le DOM
const firstNameInput = document.querySelector(`#firstName`)
const lastNameInput = document.querySelector(`#lastName`)
const addressInput = document.querySelector(`#address`)
const cityInput = document.querySelector(`#city`)
const emailInput = document.querySelector(`#email`)
const orderForm = document.querySelector(`#orderForm`)

// On ecoute l'évennement submit sur le bouton "Commander"
orderForm.addEventListener(`submit`, (e) => {
    // On prévient son comportement par défaut en empêchant le rechargement de la page
    e.preventDefault()
    // Si le panier est vide, on affiche un message d'alerte empêchant le passage de la commande
    if (cartContent.length === 0) {
        alert(`Votre panier est vide, veuillez y ajouter au moins un produit pour passer votre commande.`)
    }
    // création d'un tableau qui contiendra uniquement les ID des produits du panier
    let productsOrdered = []
    cartContent.forEach((product) => {
        productsOrdered.push(product._id)
        //console.log(productsOrdered)
        /*Création d'un objet order contenant un objet contact reprenant les valeurs des inputs et 
        le tableau productsOrdered*/
        const order = {
            contact: {
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                address: addressInput.value,
                city: cityInput.value,
                email: emailInput.value,
            },
            products: productsOrdered,
        }
        // Création de l'en-tête de la requête
        const postRequest = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        }
        // Envoie de la requête via Fetch
        fetch(`http://localhost:3000/api/cameras/order`, postRequest)
            // réception de la réponse au format json
            .then((res) =>
                res.json()
                    // transformation de la réponse en data
                    .then((data) => {
                        console.log(data)
                        // on vide le Local Storage
                        localStorage.clear()
                        // création d'une variable contenant le prix total
                        let totalPriceConfirmation = parseFloat(TOTALPRICE.innerText)
                        //console.log(data.orderId)
                        //console.log(totalPriceConfirmation)
                        // On envoie au Local Storage que l'order ID et le prix Total
                        localStorage.setItem(`orderId`, JSON.stringify(data.orderId))
                        localStorage.setItem(`total`, JSON.stringify(totalPriceConfirmation))
                        // Redirection vers la page confirmation.html
                        window.location.href = "http://127.0.0.1:5500/views/confirmation.html"
                    })
            )
            .catch((err) => {
                alert(`Désolé ! Une erreur est survenue. Votre commande n'a pas été validée.`)
            })
    })
})
