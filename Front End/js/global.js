let cartBadge = document.getElementById(`cartBadge`)
console.log(cartBadge)

function GetQuantityFromLs() {
    if (localStorage.getItem(`cart-key`) != null) {
        cartContent = JSON.parse(localStorage.getItem(`cart-key`))
        let totalQuantity = 0
        for (let i = 0; i < cartContent.length; i++) {
            let product = cartContent[i]
            //console.log(product.quantity)
            totalQuantity += product.quantity
            console.log(totalQuantity)
        }
        if (totalQuantity > 0) {
            cartBadge.classList.add('cartBadge', 'position-absolute', 'top-0', 'start-100', 'translate-middle', 'badge', 'rounded-pill', 'bg-danger')
            cartBadge.innerText = `+ ${totalQuantity}`
        }
    }
}

GetQuantityFromLs()

let addToCartBtn = document.querySelector(`#addToCartBtn`)

addToCartBtn.addEventListener(`click`, GetQuantityFromLs, false)




