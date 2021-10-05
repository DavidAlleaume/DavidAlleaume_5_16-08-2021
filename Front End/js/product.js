//utilisation de la propriété searchParams et de la requête Get pour accéder à l'ID du produit et la placer dans une varialble id
let params = new URLSearchParams(document.location.search)
let id = params.get("id")
//Accéder à certains éléments du DOM et les placer dans des variables
const productImage = document.querySelector(`#product_img`)
const productName = document.querySelector(`#product_name`)
const productDescription = document.querySelector(`#product_description`)
const productPrice = document.querySelector(`#product_price`)

//Utilisation de la méthode Fetch en ajoutant à l'URL l'id du produit pour accéder aux infos du seul produit concerné

function getProductInfos() {
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then((res) =>
            res.json()
                .then((data) => {
                    console.log(data)
                    const product = data
                    productImage.src = product.imageUrl
                    productName.innerText = product.name
                    productDescription.innerText = product.description
                    const price = product.price / 100
                    productPrice.innerText = `${price} €`
                    for (let lens of product.lenses) {
                        console.log(lens)
                        let lensOption = `<option>${lens}</option>`
                        document.getElementById('lensOptions').innerHTML += lensOption
                    }
                })
        )
        .catch((err) => {
            let errMessage = `<div class="m-auto alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Désolé!</strong></br>Nous ne parvenons pas à afficher le contenu de cette page.</br>Veuillez svp
                vous connecter au port 3000 puis éssayer de nouveau.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>`
            document.getElementById('product_container').innerHTML = errMessage
        })
}

getProductInfos()

// Récupération des données envoyées dans le panier au moment du clic sur "add to cart" sous forme d'un objet
const numberOfAddedProducts = document.querySelector(`#numberOfAddedProducts`)

addToCartBtn.addEventListener(`click`, () => {
    if (numberOfAddedProducts.value > 0) {
        CartInit()
        GetQuantityFromLs()
    }
})







