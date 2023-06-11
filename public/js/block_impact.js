const obstaculoHamburguer = new Image();
obstaculoHamburguer.src = '/public/img/block_impact/hamburguer2.png';

const qtdDeFaixas = 3;
const larguraFaixa = 100;

const larguraTela = qtdDeFaixas * larguraFaixa;
const alturaTela = 700;
let pontos = 0;
let coins = 0;
let recorde = 0;
let jogoEmAndamento = false; // Variável de controle do jogo

const jogador = {
    aresta: larguraFaixa,
    eixoX: 0,
    eixoY: alturaTela - (larguraFaixa + 20),
    cor: 'yellow',
    velocidade: larguraFaixa
}

const obstaculo = {
    aresta: larguraFaixa,
    eixoX: obstaculoEixoX(),
    eixoY: 0,
    velocidadeEixoX: 10,
    cor: 'green'
}


window.addEventListener('DOMContentLoaded', function () {
    info()
});

function info() {
    Swal.fire({
        imageUrl: 'public/img/block_impact/info.png',
        imageAlt: 'Imagem informativa sobre as regras do jogo'
    })
}

function iniciarAtraso() {

    // Desabilitando o btn iniciar, msg Game Over e pontos
    document.querySelector('#iniciarBtn').disabled = true;
    document.querySelector('#gameOver').style.display = 'none';
    document.querySelector('.pontos').innerHTML = `Pontos: ${pontos}`;


    let contador = 3; // Valor inicial do cronômetro

    let cronometro = document.getElementById("cronometro");
    cronometro.style.display = 'block';
    cronometro.style.fontSize = '100px';
    cronometro.innerHTML = contador; // Exibir o valor inicial

    let timer = setInterval(function () {
        contador--; // Decrementar o valor

        if (contador >= 0) {
            cronometro.innerHTML = contador; // Exibir o valor atualizado
        } else {
            clearInterval(timer); // Parar o cronômetro quando chegar a 0
            jogoEmAndamento = true; // Define o jogo como estando em andamento
            iniciar();
            cronometro.style.display = 'none';
        }
    }, 1000); // Atualizar a cada segundo (1000 milissegundos)
}

function iniciar() {
    let tela = document.querySelector('#tela');
    let ctx = tela.getContext('2d');

    // Atribuindo as dimensões da tela
    tela.width = larguraTela;
    tela.height = alturaTela;

    const ciclo = () => {
        ctx.clearRect(0, 0, larguraTela, alturaTela); // Apagando a tela

        // Adiciona um quadrado na tela
        ctx.fillStyle = jogador.cor; // Cor
        ctx.fillRect(jogador.eixoX, jogador.eixoY, jogador.aresta, jogador.aresta); // Surgimento

        // Adiciona um quadrado na tela
        ctx.fillStyle = obstaculo.cor; // Cor
        ctx.drawImage(obstaculoHamburguer, obstaculo.eixoX, obstaculo.eixoY, obstaculo.aresta, obstaculo.aresta); // Surgimento

        // Verificações
        moverObstaculo();
        dificuldade();
        gameOver();
        document.addEventListener("keydown", moverJogador);

        if (jogoEmAndamento) { // Verifica se o jogo está em andamento
            setTimeout(ciclo, 10);
        } else {
            ctx.clearRect(0, 0, larguraTela, alturaTela); // Limpa a tela 
        }
    }

    ciclo();
}

function moverJogador(event) {
    const tecla = event.key;

    if (tecla == "ArrowLeft" && jogador.eixoX >= jogador.aresta) {
        jogador.eixoX -= jogador.velocidade;
    }

    if (tecla == "ArrowRight" && jogador.eixoX < (larguraTela - jogador.aresta)) {
        jogador.eixoX += jogador.velocidade;
    }
}

function obstaculoEixoX() {
    let opcoes = [0, larguraFaixa, larguraFaixa * (qtdDeFaixas - 1)];
    let ultimoIndice = null;
    let indiceAleatorio = Math.floor(Math.random() * opcoes.length);

    if (ultimoIndice == indiceAleatorio) {
        if (indiceAleatorio.length == indiceAleatorio) {
            return ultimoIndice = opcoes[indiceAleatorio - 1];
        } else {
            return ultimoIndice = opcoes[indiceAleatorio + 1]
        }
    } else {
        return ultimoIndice = opcoes[indiceAleatorio];
    }
}

function moverObstaculo() {
    obstaculo.eixoY += obstaculo.velocidadeEixoX; // Incrementa a posição do obstáculo no eixo Y

    if (obstaculo.eixoY > alturaTela) {
        obstaculo.eixoY = -obstaculo.aresta; // Reinicia a posição do obstáculo no topo da tela
        obstaculo.eixoX = obstaculoEixoX(); // Define uma nova posição aleatória no eixo X

        pontos++;
        document.querySelector('.pontos').innerHTML = `Pontos: ${pontos}`;
        console.log(pontos);
    }
}

const aumentarDificuldade = [6, 15, 30, 40, 55, 65, 75, 90]; // Pontos para aumentar a dificuldade
let dificuldadeAumentada = 0; // Contador de aumentos de dificuldade

function dificuldade() {
    if (pontos == 0) {
        obstaculo.velocidadeEixoX = 10; // Velocidade inicial
    }
    if (aumentarDificuldade.includes(pontos) && pontos > dificuldadeAumentada) {
        obstaculo.velocidadeEixoX += 3;
        dificuldadeAumentada = pontos;
        console.log("velocidade " + obstaculo.velocidadeEixoX);
    }
}

function gameOver() {
    const jogadorRect = {
        x: jogador.eixoX,
        y: jogador.eixoY,
        width: jogador.aresta,
        height: jogador.aresta
    };

    const obstaculoRect = {
        x: obstaculo.eixoX,
        y: obstaculo.eixoY,
        width: obstaculo.aresta,
        height: obstaculo.aresta
    };

    if (rectsSobrepostos(jogadorRect, obstaculoRect)) {
        document.querySelector('#gameOver').style.display = 'block';

        verificaRecorde(pontos);
        addCoin(pontos);
        pontos = 0;
        dificuldadeAumentada = 0;
        jogoEmAndamento = false;

        // Redefinir jogador para sua posição padrão
        jogador.eixoX = 0;
        jogador.eixoY = alturaTela - (larguraFaixa + 20);

        // Redefinir obstáculo para sua posição padrão
        obstaculo.eixoX = obstaculoEixoX();
        obstaculo.eixoY = 0;
    }

    // Habilitando o btn iniciar
    document.querySelector('#iniciarBtn').disabled = false;
}

// Função auxiliar para verificar a sobreposição entre dois retângulos
function rectsSobrepostos(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function mudarCor(cor, id) {

    // Apagando todos os checks 
    const checks = document.querySelectorAll("#check");
    checks.forEach((elemento) => {
        elemento.style.display = "none";
    });

    jogador.cor = cor;
    document.querySelector(`#${id} #check`).style.display = 'block';
}

function verificaRecorde(pontos) {
    if (pontos > recorde) {
        recorde = pontos;
        document.querySelector('#recorde').innerHTML = `Recorde: ${recorde}`;
    }
}

function addCoin(pontos) {
    coins += pontos;
    document.querySelector('.quantia').innerHTML = `x ${coins}`;
}


// TABELA DE PREÇOS*************
// const red = 0;
// const green = 50;
// const blue = 70;
// const yellow = 0;
// const orange = 80;
// const purple = 100;
//******************************

// const precoCores = {
//     red: 0,
//     green: 50,
//     blue: 70,
//     yellow: 0,
//     orange: 80,
//     purple: 100
// }


// function compra(cor, coins){
//     this.cor = cor;

//     if(precoCores.cor <= coins){
//         coins - precoCores.cor;
//         return true;
//     }else{
//         return true;
//     }
// }