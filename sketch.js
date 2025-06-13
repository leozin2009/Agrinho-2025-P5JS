function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let farmerX = 400; // Posição inicial do fazendeiro
let farmerY = 300; // Posição inicial do fazendeiro (Y)
let plants = [];
let truckX = 0; // Posição inicial do caminhão

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < 10; i++) {
    plants.push(new Plant(random(width / 2), height - 50)); // Plantas no campo
  }
}

function draw() {
  background(135, 206, 235); // Céu azul
  
  drawGround(); // Solo (campo)
  drawRoad(); // Estrada
  drawBuildings(); // Edifícios da cidade
  drawFarmer(farmerX, farmerY); // Fazendeiro na posição atual
  
  // Movimenta o fazendeiro com as teclas WASD
  if (keyIsDown(65)) { // 'A' para mover para a esquerda
    farmerX -= 3;
  }

  if (keyIsDown(68)) { // 'D' para mover para a direita
    farmerX += 3;
  }

  if (keyIsDown(87)) { // 'W' para mover para cima
    farmerY -= 3;
  }

  if (keyIsDown(83)) { // 'S' para mover para baixo
    farmerY += 3;
  }

  // Reseta a posição do fazendeiro quando ele sair da tela
  if (farmerX < -50) {
    farmerX = width;
  } else if (farmerX > width) {
    farmerX = -50;
  }

  if (farmerY < -50) {
    farmerY = height;
  } else if (farmerY > height) {
    farmerY = -50;
  }

  // Caminhão se movendo na estrada
  truckX += 1;
  if (truckX > width) {
    truckX = -100; // Reseta a posição do caminhão quando sair da tela
  }
  drawTruck(truckX, height - 120); // Caminhão

  // Desenha e faz as plantas crescerem no campo
  for (let plant of plants) {
    plant.grow();
    plant.display();
  }
}

// Função para desenhar o solo (campo)
function drawGround() {
  fill(34, 139, 34); // Cor do solo (campo)
  rect(0, height - 110, width, 150); // Campo na parte inferior
}

// Função para desenhar a estrada
function drawRoad() {
  fill(50); // Cor da estrada
  rect(0, height - 150, width, 100); // Estrada conectando a cidade ao campo
}

// Função para desenhar o caminhão
function drawTruck(x, y) {
  fill(255, 0, 0); // Cor do caminhão (vermelho)
  rect(x, y - 40, 100, 40); // Parte de cima do caminhão
  rect(x + 60, y - 20, 40, 20); // Carga do caminhão

  // Rodas do caminhão
  fill(0); // Cor das rodas (preto)
  ellipse(x + 20, y, 20, 20); // Roda dianteira esquerda
  ellipse(x + 80, y, 20, 20); // Roda traseira esquerda
}

// Função para desenhar os edifícios da cidade
function drawBuildings() {
  fill(169, 169, 169); // Cor dos edifícios (cidade)
  rect(100, height - 150, 110, 100); // Edifício à esquerda
  rect(250, height - 150, 110, 100); // Edifício do meio
  rect(450, height - 150, 110, 100); // Edifício à direita
}

// Classe para as plantas no campo
class Plant {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = random(20, 40);
    this.growthRate = random(0.1, 0.5);
    this.isGrowing = true;
  }

  // Método para fazer a planta crescer
  grow() {
    if (this.isGrowing) {
      this.height += this.growthRate;
      if (this.height > 60) {
        this.isGrowing = false; // Para de crescer
      }
    }
  }

  // Método para exibir a planta
  display() {
    fill(139, 69, 19); // Cor do caule
    rect(this.x - 5, this.y - this.height, 10, this.height);

    fill(0, 128, 0); // Cor das folhas
    ellipse(this.x, this.y - this.height, 20, 20);
    ellipse(this.x - 10, this.y - this.height + 10, 20, 20);
    ellipse(this.x + 10, this.y - this.height + 10, 20, 20);
  }
}

// Função para desenhar o fazendeiro
function drawFarmer(x, y) {
  // Corpo do fazendeiro
  fill(139, 69, 19); // Cor do corpo (marrom)
  rect(x, y - 40, 30, 60); // Corpo

  // Cabeça do fazendeiro
  fill(255, 220, 185); // Cor da pele (bege)
  ellipse(x + 15, y - 60, 30, 30); // Cabeça

  // Chapéu do fazendeiro
  fill(255, 215, 0); // Cor do chapéu (amarelo)
  rect(x + 5, y - 80, 20, 20); // Parte de cima do chapéu
}
