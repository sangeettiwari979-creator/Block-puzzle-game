const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 500,
  backgroundColor: "#0f172a",
  parent: "game",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 } }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player;
let blocks;
let score = 0;
let scoreText;

new Phaser.Game(config);

function preload() {}

function create() {
  player = this.add.rectangle(180, 440, 40, 40, 0x22d3ee);
  this.physics.add.existing(player);

  blocks = this.physics.add.group();

  scoreText = this.add.text(10, 10, "Score: 0", {
    fontSize: "18px",
    fill: "#fff"
  });

  this.time.addEvent({
    delay: 700,
    callback: () => spawnBlock(this),
    loop: true
  });

  this.physics.add.overlap(player, blocks, () => {
    this.scene.restart();
    score = 0;
  });

  // Touch move
  this.input.on("pointermove", p => {
    player.x = p.x;
  });
}

function update() {
  blocks.children.iterate(b => {
    if (b && b.y > 520) {
      b.destroy();
      score++;
      scoreText.setText("Score: " + score);
    }
  });
}

function spawnBlock(scene) {
  const x = Phaser.Math.Between(20, 340);
  const block = scene.add.rectangle(x, 0, 30, 30, 0xf97316);
  scene.physics.add.existing(block);
  block.body.setVelocityY(200 + score * 3);
  blocks.add(block);
      }
