const larguraTela = 600;
const alturaTela = 1300;
let pontos = 0;

const jogador = {
    'aresta': larguraTela / 3,
    'eixoX': 0,
    'eixoY': alturaTela - (larguraTela / 3 + 20),
    'cor': 'yellow',
    'velocidade': larguraTela / 3
}

const obstaculo = {
    'aresta': jogador.aresta,
    'eixoX': obstaculoEixoX(),
    'eixoY': 0,
    'velocidadeEixoX': 5,
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

        gameOver()

        document.addEventListener("keydown", moverJogador);
        setTimeout(ciclo, 10);
    }

    ciclo()

})

function moverJogador(event) {
    const tecla = event.key;
    
    if(tecla == "ArrowLeft" && jogador.eixoX >= jogador.aresta){
        jogador.eixoX -= jogador.velocidade;
    }

    if(tecla == "ArrowRight" && jogador.eixoX < (larguraTela - jogador.aresta)){
        jogador.eixoX += jogador.velocidade;
    }
}

function obstaculoEixoX(){
    let opcoes = [0, larguraTela/3, larguraTela - larguraTela / 3];
    let indiceAleatorio = Math.floor(Math.random() * opcoes.length);
    return opcoes[indiceAleatorio];
}

function moverObstaculo() {
    obstaculo.eixoY += obstaculo.velocidadeEixoX; // Incrementa a posição do obstáculo no eixo Y

    if (obstaculo.eixoY > alturaTela) {
        obstaculo.eixoY = -obstaculo.aresta; // Reinicia a posição do obstáculo no topo da tela
        obstaculo.eixoX = obstaculoEixoX(); // Define uma nova posição aleatória no eixo X

        pontos++
        console.log(pontos);
    }
}

function gameOver(){
    if(jogador.eixoY == obstaculo.eixoY + obstaculo.aresta && jogador.eixoX === obstaculo.eixoX){
        alert('Game Over');
        pontos = 0
    }
}