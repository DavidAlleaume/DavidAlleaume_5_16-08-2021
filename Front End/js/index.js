
let card = `<div class="card shadow p-3 mb-5 bg-white rounded">
    <img src="" class="card-img-top" alt="">
    <div class="card-body">
    <h5 id="name" class="card-title"></h5>
    <p id="price" class="card-text"></p>
    <a href="product.html" class="btn btn-info">Découvrir</a>
    </div>
    </div>`;

function NewCard() {
    document.getElementById('card-container').innerHTML = card;
}

function GetProductsInfos() {
    fetch("http://localhost:3000/api/cameras")
        .then((res) =>
            res.json()
                .then((data) => {
                    console.log(data);
                    for (let i = 0; i < data.length; i += 1) {
                        NewCard();
                    }
                })
        );
}

GetProductsInfos();






