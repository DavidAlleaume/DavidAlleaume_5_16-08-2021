const ORDERID = document.querySelector(`#orderId`)
const TOTAL = document.querySelector(`#total`)
const closeMessageBtn = document.querySelector(`#closeMessageBtn`)

function DisplayValues() {
    ORDERID.innerText = JSON.parse(localStorage.getItem(`orderId`))
    TOTAL.innerText = JSON.parse(localStorage.getItem(`total`))
    closeMessageBtn.addEventListener(`click`, () => {
        window.location.href = `http://127.0.0.1:5500/index.html`
        localStorage.clear()
    })
}

DisplayValues()


