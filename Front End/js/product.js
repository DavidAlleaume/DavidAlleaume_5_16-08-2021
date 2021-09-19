let params = new URLSearchParams(document.location.search);
let id = params.get("id");
const productImage = document.querySelector(`#product_img`);
const productName = document.querySelector(`#product_name`);
const productDescription = document.querySelector(`#product_description`);
const productPrice = document.querySelector(`#product_price`);



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
                })
        )
        .catch((err) => {
            let errMessage = `<div class="m-auto alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Désolé!</strong></br>Nous ne parvenons pas à afficher les produits sur cette page.</br>Veuillez svp
                vous connecter au port 3000 puis éssayer de nouveau.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>`;
            document.getElementById('product_container').innerHTML = errMessage;
        });
}

getProductInfos();



