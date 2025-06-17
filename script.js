const cartas = [
    { nome: "Dragão", atributos: { forca: 95, defesa: 85, velocidade: 70 } },
    { nome: "Fênix", atributos: { forca: 88, defesa: 90, velocidade: 95 } },
    { nome: "Gigante", atributos: { forca: 90, defesa: 95, velocidade: 40 } },
    { nome: "Elfo", atributos: { forca: 70, defesa: 65, velocidade: 98 } },
    { nome: "Golem", atributos: { forca: 85, defesa: 100, velocidade: 30 } }
];

let cartaJogador;
let cartaMaquina;

function sortearCarta() {
    const indiceMaquina = parseInt(Math.random() * cartas.length);
    cartaMaquina = cartas[indiceMaquina];

    let indiceJogador;
    do {
        indiceJogador = parseInt(Math.random() * cartas.length);
    } while (indiceJogador === indiceMaquina);

    cartaJogador = cartas[indiceJogador];

    document.getElementById('btnJogar').disabled = false;
    exibirCartaJogador();
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('carta-maquina').innerHTML = "";
}

function exibirCartaJogador() {
    const divCarta = document.getElementById('carta-jogador');
    divCarta.innerHTML = `<h2>${cartaJogador.nome}</h2>`;

    const opcoes = document.getElementById('opcoes');
    let opcoesTexto = "";

    for (let atributo in cartaJogador.atributos) {
        opcoesTexto += `<input type="radio" name="atributo" value="${atributo}"> ${atributo}: ${cartaJogador.atributos[atributo]} <br>`;
    }

    opcoes.innerHTML = opcoesTexto;
}

function obterAtributoSelecionado() {
    const radioAtributos = document.getElementsByName('atributo');
    for (let i = 0; i < radioAtributos.length; i++) {
        if (radioAtributos[i].checked) {
            return radioAtributos[i].value;
        }
    }
    return null;
}

function jogar() {
    const atributoSelecionado = obterAtributoSelecionado();

    if (!atributoSelecionado) {
        alert("Escolha um atributo!");
        return;
    }

    const valorJogador = cartaJogador.atributos[atributoSelecionado];
    const valorMaquina = cartaMaquina.atributos[atributoSelecionado];

    const divResultado = document.getElementById('resultado');

    if (valorJogador > valorMaquina) {
        divResultado.innerHTML = "<p><strong>🎉 Você venceu!</strong></p>";
    } else if (valorJogador < valorMaquina) {
        divResultado.innerHTML = "<p><strong>💀 Você perdeu!</strong></p>";
    } else {
        divResultado.innerHTML = "<p><strong>🤝 Empate!</strong></p>";
    }

    exibirCartaMaquina();
}

function exibirCartaMaquina() {
    const divCarta = document.getElementById('carta-maquina');
    let html = `<h2>${cartaMaquina.nome}</h2>`;
    for (let atributo in cartaMaquina.atributos) {
        html += `<p>${atributo}: ${cartaMaquina.atributos[atributo]}</p>`;
    }
    divCarta.innerHTML = html;
}
