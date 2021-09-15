function NewCard(camera) {
    console.log(camera);
    const price = camera.price / 100;
    let card = `<div class="col-12 col-md-4"><div class="card shadow p-3 mb-5 bg-white rounded">
    <img src="${camera.imageUrl}" class="card-img-top" alt="">
    <div class="card-body">
    <h5 id="name" class="card-title">${camera.name}</h5>
    <p id="price" class="card-text">${price} €</p>
    <a href="./views/product.html?id=${camera._id}" class="btn btn-info">Découvrir</a>
    </div></div></div>`;
    document.getElementById('card-container').innerHTML += card;
}

function GetProductsInfos() {
    fetch("http://localhost:3000/api/cameras")
        .then((res) =>
            res.json()
                .then((data) => {
                    //console.log(data);
                    for (let i = 0; i < data.length; i += 1) {
                        NewCard(data[i]);
                    }
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
            document.getElementById('card-container').innerHTML = errMessage;
        });
};

GetProductsInfos();







