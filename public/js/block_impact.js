const qtdDeFaixas = 3;
const larguraFaixa = 100;

const larguraTela = qtdDeFaixas * larguraFaixa;
const alturaTela = 700;
let pontos = 0;

const jogador = {
    'aresta': larguraFaixa,
    'eixoX': 0,
    'eixoY': alturaTela - (larguraFaixa + 20),
    'cor': 'yellow',
    'velocidade': larguraFaixa
}

const obstaculo = {
    'aresta': larguraFaixa,
    'eixoX': obstaculoEixoX(),
    'eixoY': 0,
    'velocidadeEixoX': 10,
    'cor': 'green'
}

window.addEventListener('DOMContentLoaded', () => {

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
        ctx.fillRect(obstaculo.eixoX, obstaculo.eixoY, obstaculo.aresta, obstaculo.aresta); // Surgimento
        moverObstaculo(); // Movimenta o obstáculo

        dificuldade()
        gameOver()

        document.addEventListener("keydown", moverJogador);
        setTimeout(ciclo, 10);

    }

    ciclo()

})

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
    let indiceAleatorio = Math.floor(Math.random() * opcoes.length);
    return opcoes[indiceAleatorio];
}

function moverObstaculo() {
    obstaculo.eixoY += obstaculo.velocidadeEixoX; // Incrementa a posição do obstáculo no eixo Y

    if (obstaculo.eixoY > alturaTela) {
        obstaculo.eixoY = -obstaculo.aresta; // Reinicia a posição do obstáculo no topo da tela
        obstaculo.eixoX = obstaculoEixoX(); // Define uma nova posição aleatória no eixo X

        pontos++
        document.querySelector('.pontos').innerHTML = `Pontos: ${pontos}`;
        console.log(pontos);
    }
}


const aumentarDificuldade = [6, 10, 20, 30, 40, 50, 60]; // Pontos para aumentar a dificuldade
let dificuldadeAumentada = 0; // Contador de aumentos de dificuldade

function dificuldade() {

    if(pontos == 0){
        obstaculo.velocidadeEixoX = 10;
    }
    if (aumentarDificuldade.includes(pontos) && pontos > dificuldadeAumentada) {
        obstaculo.velocidadeEixoX += 3;
        dificuldadeAumentada = pontos;
        console.log("vel " + obstaculo.velocidadeEixoX);
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
        alert(`Game Over - Pontos: ${pontos}`);
        pontos = 0;
    }
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