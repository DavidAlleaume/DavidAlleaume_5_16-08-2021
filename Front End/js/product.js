let params = new URLSearchParams(document.location.search);
let id = params.get("id");
const productImage = document.querySelector(`#product_img`);
const productName = document.querySelector(`#product_name`);
const productDescription = document.querySelector(`#product_description`);
const productPrice = document.querySelector(`#product_price`);
const lensOptions = document.querySelector(`#lensOptions`);

function getProductInfos() {
    fetch(`http://localhost:3000/api/cameras/${id}`)
        .then((res) =>
            res.json()
                .then((data) => {
                    console.log(data);
                    const product = data
                    productImage.src = product.imageUrl;
                    productName.innerText = product.name;
                    productDescription.innerText = product.description;
                    const price = product.price / 100;
                    productPrice.innerText = `${price} €`;
                    for (let lens of product.lenses) {
                        console.log(lens);
                        let option = lens;
                        let lensOption = `<option>${option}</option>`;
                        document.getElementById('lensOptions').innerHTML += lensOption;
                    };
                })
        )
        .catch((err) => {
            let errMessage = `<div class="m-auto alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Désolé!</strong></br>Nous ne parvenons pas à afficher le contenu de cette page.</br>Veuillez svp
                vous connecter au port 3000 puis éssayer de nouveau.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>`;
            document.getElementById('product_container').innerHTML = errMessage;
        });
}

getProductInfos();

// Récupération des données envoyées dans le panier au moment du clic sur "add to cart" sous forme d'un objet

const addToCartBtn = document.querySelector(`#addToCartBtn`);
const numberOfAddedProducts = document.querySelector(`#numberOfAddedProducts`);

addToCartBtn.addEventListener(`click`, () => {
    if (numberOfAddedProducts.value > 0 && numberOfAddedProducts.value <= 10) {
        //console.log(numberOfAddedProducts.value);
        let productAddedToCart = {
            name: productName.innerText,
            quantity: parseFloat(numberOfAddedProducts.value),
            price: parseFloat(productPrice.innerText),
            _id: id,
        };
        //console.log(productAddedToCart);

        let cartContent = [];
        //console.log(cartContent);

        // Vérification du contenu du Local Storage, si il contient déjà un objet, on l'ajoute au panier

        if (localStorage.getItem(`items`) != null) {
            cartContent = JSON.parse(localStorage.getItem(`items`));
        }
        // ...si il est vide on y ajoute le contenu de notre panier
        cartContent.push(productAddedToCart);
        localStorage.setItem(`items`, JSON.stringify(cartContent));

        //console.log(localStorage);

    } else {
        alert(`Désolé, votre panier ne peut contenir plus de 10 articles.`);
    }
})






