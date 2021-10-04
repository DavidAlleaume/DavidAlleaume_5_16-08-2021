const emptyCartAlert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
<h5 class="alert-heading text-center">Votre panier est vide !</h5>
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
</button>
</div>`

function NewCartRow(product) {
    let totalPricePerProduct = product.quantity * product.price
    const cartRow = `<tr>
                        <th scope="row">${product.name}</th>
                        <td><input class="quantityInput selectNumber" type="number" name="numberOfAddedProducts"
                        value="${product.quantity}" min="1"></td>
                        <td class="totalPricePerProduct">${totalPricePerProduct} €</td>
                        <td><button type="button" class="remove_product_btn btn btn-danger">Supprimer</button></td>
                    <tr>`
    document.getElementById(`cartRowsContainer`).innerHTML += cartRow
}

//console.log(localStorage.getItem(`items`))

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


let removeProductBtn = document.getElementsByClassName(`remove_product_btn`)
const TOTALPRICE = document.getElementById(`totalPrice`)

for (let i = 0; i < removeProductBtn.length; i++) {
    let button = removeProductBtn[i]
    button.addEventListener(`click`, (e) => {
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
        alert(`Voulez-vous vraiment supprimer ce produit de votre panier ?`)
        window.location.reload()
    })
}

if (removeProductBtn.length === 0) {
    document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert
    TOTALPRICE.innerText = `0 €`
}

// Fonction permettant de vider tout le contenu du panier eà l'écran et dans le Local Storage 
// lorsqu'on clique sur le bouton "Vider le panier"

let clearCartBtn = document.getElementsByClassName(`empty_cart__btn`)

clearCartBtn[0].addEventListener(`click`, () => {
    alert(`Souhaitez-vous vraiment vider tout le contenu de votre panier ?`)
    let cartRowsContainer = document.getElementById(`cartRowsContainer`)
    cartRowsContainer.remove()
    cartBadge.remove()
    localStorage.clear()
    document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert
    TOTALPRICE.innerText = `0 €`
})

// changement de la quantité dans le panier

/*let quantityInput = document.getElementsByClassName(`quantityInput`)

for (let i = 0; i < quantityInput.length; i++) {
    let productQuantity = quantityInput[i]
    productQuantity.addEventListener('click', (e) => {
        let productQuantityClicked = e.target
        //console.log(productQuantityClicked.getAttribute(`value`))
        let quantity = productQuantityClicked.getAttribute(`value`)
        console.log(quantity)
        let product = cartContent[i]
        console.log(product._id)
        function Match(id) {
            return id._id === product._id
        }
        let index = cartContent.findIndex(Match)
        console.log(index)
    })
}*/


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
                        let values = []
                        let totalPriceConfirmation = parseFloat(TOTALPRICE.innerText)
                        let confirmationValues = {
                            orderId: data.orderId,
                            total: totalPriceConfirmation
                        }
                        //console.log(confirmationValues)
                        values.push(confirmationValues)
                        localStorage.setItem(`confirmation-key`, JSON.stringify(values))
                    })
            )
    })
})
