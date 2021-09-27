function NewCartRow(product) {
    let totalPricePerProduct = product.quantity * product.price;
    const cartRow = `<tr>
                        <th scope="row">${product.name}</th>
                        <td><input class="selectNumber" id="numberOfAddedProducts" type="number" name="numberOfAddedProducts"
                        value="${product.quantity}" min="1"></td>
                        <td>${totalPricePerProduct} €</td>
                        <td><button type="button" class="remove_product_btn btn btn-danger">Supprimer</button></td>
                    <tr>`
    document.getElementById(`cartRowsContainer`).innerHTML += cartRow;
};

//console.log(localStorage.getItem(`items`));

const emptyCartAlert = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
<h5 class="alert-heading text-center">Votre panier est vide !</h5>
<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">×</span>
</button>
</div>`;

let cartContent = [];

function GetItemsFromLocalStorage() {
    if (localStorage.getItem(`cart-key`) == null) {
        document.getElementById(`emptyCartAlert`).innerHTML = emptyCartAlert;
    } else {
        cartContent = JSON.parse(localStorage.getItem('cart-key'));
        //console.log(cartContent);
        for (let i = 0; i < cartContent.length; i++) {
            NewCartRow(cartContent[i]);
        }
    }
};

GetItemsFromLocalStorage()

//console.log(cartContent)

let removeProductBtn = document.getElementsByClassName(`remove_product_btn`)
//console.log(removeProductBtn)

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


/*const formulaire = document.getElementById(`formulaire`);

formulaire.addEventListener(`submit`,(e) =>{
    e.preventDefault()
    console.log(`traitement du formumaire`)
})*/