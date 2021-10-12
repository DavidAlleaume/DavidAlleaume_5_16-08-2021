/*Utilisation de l'interface URLSearchParams et de sa méthode Get pour accéder à l'ID du produit 
contenue dans l'URL et la placer dans une varialble id
console.log(window.location.search)*/
let params = new URLSearchParams(document.location.search)
//console.log(params)
let id = params.get("id")
//console.log(id)
// On cible certains éléments du DOM pour les pour les placer dans des constantes
const productImage = document.querySelector(`#product_img`)
const productName = document.querySelector(`#product_name`)
const productDescription = document.querySelector(`#product_description`)
const productPrice = document.querySelector(`#product_price`)

/*Comme utilisé prédédemment pour récupérer tous les produits de la page index, 
on utilise à nouveau Fetch en ajoutant cette fois-ci à l'URL l'id du produit pour 
accéder uniquement aux infos du produit ciblé*/
function getProductInfos() {
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then((res) =>
            res.json()
                .then((data) => {
                    console.log(data)
                    const product = data
                    /*une fois la data récupérée, on injecte les valeurs dans le html 
                    via les constantes délarées précédemment*/
                    productImage.src = product.imageUrl
                    productName.innerText = product.name
                    productDescription.innerText = product.description
                    const price = product.price / 100
                    productPrice.innerText = `${price} €`
                    /*Même principe que pour les cartes "produit" de index.html - On parcourt
                    chaque lentille du tableau "lentilles"*/
                    for (let lens of product.lenses) {
                        //console.log(lens) 
                        let lensOption = `<option>${lens}</option>`
                        /*pour chaque lentille, on injecte une ligne de code qui contiendra 
                        la valeur de la lentille dans le html*/
                        document.getElementById('lensOptions').innerHTML += lensOption
                    }
                })
        )
        // Message d'erreur 
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
// Appel de la fonction getProductInfos à chaque cargement de la page
getProductInfos()

/*Envoie des produits dans le panier et dans le Local Storage au moment du clic sur 
"Ajouter au panier"*/
let addToCartBtn = document.querySelector(`#addToCartBtn`)
addToCartBtn.addEventListener(`click`, () => {
    CartInit()
    GetQuantityFromLs()
})







