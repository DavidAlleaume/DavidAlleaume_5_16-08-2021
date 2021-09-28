function GetQuantityFromLs() {
    if (localStorage.getItem(`cart-key`) != null) {
        cartContent = JSON.parse(localStorage.getItem(`cart-key`));
        let totalQuantity = 0
        for (let i = 0; i < cartContent.length; i++) {
            let product = cartContent[i]
            //console.log(product.quantity)
            totalQuantity += product.quantity
            console.log(totalQuantity)
        }
        let cartBadge = document.querySelector(`.cartBadge`)
        if (totalQuantity > 0) {
            cartBadge.innerText = `+ ${totalQuantity}`
        } else {
            cartBadge.style.visibility = `hidden`
        }
    }
}

GetQuantityFromLs()




