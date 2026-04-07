import { useEffect, useRef } from 'react';

function drawNetwork(ctx, w, h, t, color) {
  ctx.clearRect(0, 0, w, h);
  const cols = 12;
  const rows = 8;
  const spacingX = w / (cols + 1);
  const spacingY = h / (rows + 1);
  const nodes = [];

  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const x = c * spacingX + Math.sin(t * 0.5 + r * c * 0.3) * 4;
      const y = r * spacingY + Math.cos(t * 0.7 + r * 0.5) * 3;
      nodes.push({ x, y });
    }
  }

  // connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < spacingX * 1.6) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(17,17,17,0.06)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // scanning pulse
  const pulseX = (t * 60) % w;
  for (const node of nodes) {
    const dist = Math.abs(node.x - pulseX);
    if (dist < 80) {
      const alpha = 1 - dist / 80;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,46,49,${alpha * 0.6})`;
      ctx.fill();
    }
  }

  // nodes
  for (const node of nodes) {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(17,17,17,0.15)';
    ctx.fill();
  }
}

function drawWaveform(ctx, w, h, t, color) {
  ctx.clearRect(0, 0, w, h);
  const midY = h / 2;
  const layers = 5;

  for (let l = 0; l < layers; l++) {
    ctx.beginPath();
    const isAccent = l === 2;
    for (let x = 0; x < w; x += 2) {
      const freq = 0.008 + l * 0.003;
      const amp = 20 + l * 8;
      const offset = l * 0.8;
      const y = midY + Math.sin(x * freq + t * (0.5 + l * 0.2) + offset) * amp
                     + Math.sin(x * freq * 2.3 + t * 0.3) * amp * 0.3;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    if (isAccent) {
      ctx.strokeStyle = `rgba(230,46,49,0.4)`;
      ctx.lineWidth = 1.5;
    } else {
      ctx.strokeStyle = `rgba(17,17,17,${0.06 + l * 0.02})`;
      ctx.lineWidth = 1;
    }
    ctx.stroke();
  }

  // peak dots
  for (let x = 0; x < w; x += 40) {
    const y = midY + Math.sin(x * 0.014 + t * 0.9) * 35;
    const peak = Math.abs(Math.sin(x * 0.014 + t * 0.9));
    if (peak > 0.9) {
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230,46,49,0.5)';
      ctx.fill();
    }
  }
}

function drawBars(ctx, w, h, t, color) {
  ctx.clearRect(0, 0, w, h);
  const barCount = 20;
  const barWidth = w / (barCount * 2);
  const maxH = h * 0.8;

  // reference lines
  for (let i = 0; i < 4; i++) {
    const y = h - (maxH * (i + 1) / 5);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.strokeStyle = 'rgba(17,17,17,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  for (let i = 0; i < barCount; i++) {
    const x = (i * 2 + 0.5) * barWidth;
    const val = (Math.sin(i * 0.5 + t * 0.4) + 1) / 2;
    const barH = val * maxH;
    const isAccent = i % 5 === 2;

    ctx.fillStyle = isAccent ? 'rgba(230,46,49,0.35)' : 'rgba(17,17,17,0.1)';
    ctx.fillRect(x, h - barH, barWidth * 0.8, barH);
  }
}

function drawMatrix(ctx, w, h, t, color) {
  ctx.clearRect(0, 0, w, h);
  const cellSize = 24;
  const cols = Math.ceil(w / cellSize);
  const rows = Math.ceil(h / cellSize);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wave = Math.sin(c * 0.3 + t * 0.5) * Math.cos(r * 0.3 + t * 0.3);
      const opacity = (wave + 1) / 2 * 0.15;
      ctx.fillStyle = `rgba(17,17,17,${opacity})`;
      ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
    }
  }

  // crosshair overlay
  const cx = w / 2 + Math.sin(t * 0.3) * w * 0.2;
  const cy = h / 2 + Math.cos(t * 0.4) * h * 0.2;
  ctx.beginPath();
  ctx.moveTo(cx - 15, cy);
  ctx.lineTo(cx + 15, cy);
  ctx.moveTo(cx, cy - 15);
  ctx.lineTo(cx, cy + 15);
  ctx.strokeStyle = 'rgba(230,46,49,0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawFlow(ctx, w, h, t, color) {
  ctx.clearRect(0, 0, w, h);
  const lineCount = 15;
  const spacing = h / (lineCount + 1);

  for (let i = 1; i <= lineCount; i++) {
    const baseY = i * spacing;
    const isAccent = i === 5 || i === 10;
    ctx.beginPath();
    for (let x = 0; x < w; x += 3) {
      const y = baseY + Math.sin(x * 0.01 + t * 0.6 + i * 0.5) * 8
                       + Math.sin(x * 0.005 + t * 0.2) * 4;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    if (isAccent) {
      ctx.strokeStyle = 'rgba(230,46,49,0.3)';
      ctx.lineWidth = 1.5;
    } else {
      ctx.strokeStyle = 'rgba(17,17,17,0.07)';
      ctx.lineWidth = 1;
    }
    ctx.stroke();
  }

  // floating particles
  for (let i = 0; i < 12; i++) {
    const px = ((t * 20 + i * 80) % w);
    const py = (i * spacing * 1.2 + Math.sin(t + i) * 10) % h;
    ctx.beginPath();
    ctx.arc(px, py, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(230,46,49,0.3)';
    ctx.fill();
  }
}

const drawFns = { network: drawNetwork, waveform: drawWaveform, bars: drawBars, matrix: drawMatrix, flow: drawFlow };

export default function ProjectStrip({ type = 'network', color = '#111111' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frame;

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(2, 2);
    }

    resize();

    function loop() {
      frame = requestAnimationFrame(loop);
      const t = performance.now() / 1000;
      const rect = canvas.parentElement.getBoundingClientRect();
      ctx.setTransform(2, 0, 0, 2, 0, 0);
      const fn = drawFns[type] || drawNetwork;
      fn(ctx, rect.width, rect.height, t, color);
    }

    loop();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [type, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}
