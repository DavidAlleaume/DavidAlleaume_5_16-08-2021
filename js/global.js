let cartContent = [];
//console.log(cartContent);

function CartInit() {
    let productAddedToCart = {
        name: productName.innerText,
        quantity: parseFloat(numberOfAddedProducts.value),
        lens: document.getElementById(`lensOptions`).value,
        price: parseFloat(productPrice.innerText),
        _id: id,
    };
    //console.log(productAddedToCart);
    // Vérification du contenu du Local Storage, si il contient déjà un objet, on l'ajoute au panier
    if (localStorage.getItem(`cart-key`) != null) {
        cartContent = JSON.parse(localStorage.getItem(`cart-key`));
    }
    // ...si il est vide on y ajoute le contenu de notre panier
    cartContent.push(productAddedToCart);
    localStorage.setItem(`cart-key`, JSON.stringify(cartContent));
    //console.log(localStorage);
}

let cartBadge = document.getElementById(`cartBadge`)

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







