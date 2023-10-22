const form = document.querySelector('.adicionar');
const lista = document.querySelector('#lista');

// se houver um array 'itens'blz, se não crie um array
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach((element) => {
    criaElemento(element)
    }
)

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];

    // função de retorno de chamada
    const existe = itens.find( (elemento) => elemento.nome === nome.value);

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;

    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;
        
        criaElemento(itemAtual);
    
        itens.push(itemAtual);
    }

    localStorage.setItem('itens', JSON.stringify(itens));

    // quando adicionar item, apaga os valores
    nome.value = '';
    quantidade.value = '';

}
)

function criaElemento(item) {

    // Exemplo: <li class="item"><strong>7</strong>Camisas</li>
    const novoItem = document.createElement('li');
    novoItem.classList.add("item");

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;

    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem);

}

function atualizaElemento(item) {
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "x";
     
    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));

}

