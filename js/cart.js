const emptyCartAlert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
<h5 class="alert-heading text-center">Votre panier est vide !</h5>
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
</button>
</div>`

function NewCartRow(product) {
    let totalPricePerProduct = product.quantity * product.price
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
    document.getElementById(`cartRowsContainer`).innerHTML += cartRow
}

//console.log(localStorage.getItem(`cart-key`))

function GetItemsFromLocalStorage() {
    if (localStorage.getItem(`cart-key`) == null) {
        document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert
    } else {
        cartContent = JSON.parse(localStorage.getItem('cart-key'))
        //console.log(cartContent)
        for (let i = 0; i < cartContent.length; i++) {
            NewCartRow(cartContent[i])
        }
    }
}

GetItemsFromLocalStorage()

// changement de la quantité dans le panier


// Retrait d'une ligne produit du panier au clic sur le bouton "supprimer"

let removeProductBtn = document.getElementsByClassName(`remove_product_btn`)
const TOTALPRICE = document.getElementById(`totalPrice`)

for (let i = 0; i < removeProductBtn.length; i++) {
    let button = removeProductBtn[i]
    button.addEventListener(`click`, (e) => {
        if (confirm(`Voulez-vous vraiment supprimer ce produit de votre panier ?`)) {
            let buttonClicked = e.target
            buttonClicked.parentElement.parentElement.remove()
            let product = cartContent[i]
            //console.log(product._id)
            function Match(id) {
                return id._id === product._id
            }
            let index = cartContent.findIndex(Match)
            //console.log(index)
            cartContent.splice(index, 1)
            localStorage.setItem(`cart-key`, JSON.stringify(cartContent))
            window.location.reload()
        }
    })
}
if (removeProductBtn.length === 0) {
    document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert
    TOTALPRICE.innerText = `0 €`
}

// Fonction permettant de vider tout le contenu du panier à l'écran et dans le Local Storage 
// lorsqu'on clique sur le bouton "Vider le panier"

let clearCartBtn = document.getElementsByClassName(`empty_cart__btn`)

clearCartBtn[0].addEventListener(`click`, () => {
    if (confirm(`Souhaitez-vous vraiment vider tout le contenu de votre panier ?`)) {
        let cartRowsContainer = document.getElementById(`cartRowsContainer`)
        cartRowsContainer.remove()
        cartBadge.remove()
        localStorage.clear()
        document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert
        TOTALPRICE.innerText = `0 €`
    }
})

// Calcul et affichage du montant total du panier

const totalPricePerProductArray = []

function TotalPriceInCart() {
    cartContent.forEach((product) => {
        let totalPricePerProduct = product.quantity * product.price
        totalPricePerProductArray.push(totalPricePerProduct)
        let totalPrice = totalPricePerProductArray.reduce((acc, currentValue) => {
            return acc + currentValue
        }, 0)
        TOTALPRICE.innerText = `${totalPrice} €`
    })
}

TotalPriceInCart()

// Création de la requête JSON contenant l'objet contact et le tableau products 
//lorsqu'on clique sur "Commander"

const firstNameInput = document.querySelector(`#firstName`)
const lastNameInput = document.querySelector(`#lastName`)
const addressInput = document.querySelector(`#address`)
const cityInput = document.querySelector(`#city`)
const emailInput = document.querySelector(`#email`)
const orderForm = document.querySelector(`#orderForm`)

orderForm.addEventListener(`submit`, (e) => {
    e.preventDefault()
    let productsOrdered = []
    cartContent.forEach((product) => {
        productsOrdered.push(product._id)
        console.log(productsOrdered)
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
        const postRequest = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        }
        fetch(`http://localhost:3000/api/cameras/order`, postRequest)
            .then((res) =>
                res.json()
                    .then((data) => {
                        console.log(data)
                        localStorage.clear()
                        let totalPriceConfirmation = parseFloat(TOTALPRICE.innerText)
                        console.log(data.orderId)
                        console.log(totalPriceConfirmation)
                        localStorage.setItem(`orderId`, JSON.stringify(data.orderId))
                        localStorage.setItem(`total`, JSON.stringify(totalPriceConfirmation))
                        window.location.href = "http://127.0.0.1:5500/views/confirmation.html"
                    })
            )
    })
})
