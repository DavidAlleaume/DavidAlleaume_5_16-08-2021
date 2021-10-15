/*Fonction contenant le code html d'une carte "produit". 
Elle sera appelée via la fonction "GetProductsInfos" autant de fois que l'API renverra de produits 
et injectera pour chaque produit le code de sa carte dans le fichier index.html*/
function NewCard(camera) {
    //console.log(camera)
    //formatage du prix
    const price = camera.price / 100
    // Variable contenant le code html et les valeurs d'une carte "produit"
    let card = `<div class="col-12 col-md-4"><div class="card shadow p-3 mb-5 bg-white rounded">
    <img src="${camera.imageUrl}" class="card-img-top" alt="">
    <div class="card-body">
    <h5 id="name" class="card-title">${camera.name}</h5>
    <p id="price" class="card-text">${price} €</p>
    <a href="./views/product.html?id=${camera._id}" class="btn btn-info">Découvrir</a>
    </div></div></div>`
    //Sélection de l'élément du DOM dans lequel on injectera le code html de chaque nouvelle carte
    document.getElementById('card-container').innerHTML += card
}
// Fonction permettant de récupérer les produits
function GetProductsInfos() {
    /*Requête de type GET via Fetch à l'adresse fournie dans les spécifications pour récupérer
     tous les produits*/
    fetch("http://localhost:3000/api/cameras")
        /*Récupération du résultat de la requête au format json sous forme d'objet Promise avec 
        sa fonction then() (qui exécute le code dès que la promesse est résolue)*/
        .then((res) =>
            res.json()
                // Récupération de la vraie valeur du résultat dans une nouvelle Promise
                .then((data) => {
                    //console.log(data)
                    // Boucle permettant de parcourir le tableau de datas (produits) 
                    for (let product of data) {
                        // Création d'une carte "produit" en passant chaque index du tableau 
                        //dans la fonction NewCard
                        NewCard(product)
                    }
                })
        )
        // On prévoit un message d'erreur qui sera appelé avec la fonction catch si une erreur survient lors de la requête
        .catch((err) => {
            let errMessage = `<div class="m-auto alert alert-warning alert-dismissible fade show" role="alert">
            <strong>Désolé!</strong></br>Nous ne parvenons pas à afficher le contenu de cette page.</br>Veuillez svp
            vous connecter au port 3000 puis éssayer de nouveau.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>`
            document.getElementById('card-container').innerHTML = errMessage
        })
}
// Appelle la fonction GetProductsInfos à chaque chargement de la page
GetProductsInfos()






