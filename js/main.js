const novoItem = document.getElementById("novoItem");
const lista = document.querySelector(".lista")
const itens = JSON.parse(localStorage.getItem('itens')) || []


itens.forEach((element) => {
    criarElemento(element)
});



novoItem.addEventListener("submit", (evento) => {
    evento.preventDefault()
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome.toUpperCase() === nome.value.toUpperCase())

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }


    if (existe) {
        itemAtual.id = existe.id

        atualizarElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)][quantidade] = itemAtual.quantidade

    } else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length -1]).id + 1 : 0
        criarElemento(itemAtual)

        itens.push(itemAtual)

    }


    localStorage.setItem("itens", JSON.stringify(itens))


    nome.value = ""
    quantidade.value = ""
})

function criarElemento(item) {
   
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')
    const concluida = false;

    const numeroItem = document.createElement('Strong')
    numeroItem.innerHTML = item.quantidade
    novoItem.appendChild(numeroItem)

    numeroItem.dataset.id = item.id
    novoItem.innerHTML += item.nome

    novoItem.appendChild(criarBotao(item.id));

    lista.appendChild(novoItem)
}

function atualizarElemento(item) {
    document.querySelector("[data-id='"+ item.id +"']").innerHTML = item.quantidade
}

function criarBotao(id) {
    const botao = document.createElement("button")
    botao.innerText = "X"
    botao.classList.add('botao')

    botao.addEventListener('click', function () {
        deletaElemento(this.parentNode, id)
    })

    return botao
}


function deletaElemento(elemento, id) {
    elemento.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
