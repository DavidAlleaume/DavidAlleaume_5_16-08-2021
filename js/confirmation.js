const ORDERID = document.querySelector(`#orderId`)
const TOTAL = document.querySelector(`#total`)
const closeMessageBtn = document.querySelector(`#closeMessageBtn`)

function DisplayValues() {
    // on récupère l'order ID dans le local Storage puis on l'injecte dans le html
    ORDERID.innerText = JSON.parse(localStorage.getItem(`orderId`))
    // idem pour le montant total
    TOTAL.innerText = JSON.parse(localStorage.getItem(`total`))
    // redirection automatique vers la page d'accueil au clic sur le bouton "fermer" 
    closeMessageBtn.addEventListener(`click`, () => {
        window.location.href = `http://127.0.0.1:5500/index.html`
        // On vide le Local Storage
        localStorage.clear()
    })
}

DisplayValues()


