const larguraTela = 600;
const alturaTela = 1300;

const jogador = {
    'aresta': larguraTela / 3,
    'eixoX': 0,
    'eixoY': alturaTela - (larguraTela / 3 + 20),
    'cor': 'yellow',
    'velocidade': larguraTela / 3
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