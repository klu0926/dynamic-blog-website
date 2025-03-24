const canvas = document.getElementById("staticCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function drawStatic() {
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const buffer = new Uint32Array(imageData.data.buffer);

  for (let i = 0; i < buffer.length; i++) {
    const grayscale = Math.random() * 255 | 0;
    buffer[i] =
      (255 << 24) |    // Alpha
      (grayscale << 16) | // Red
      (grayscale << 8) | // Green
      grayscale;          // Blue
  }

  ctx.putImageData(imageData, 0, 0);
}

function loop() {
  drawStatic();
  requestAnimationFrame(loop);
}

loop();