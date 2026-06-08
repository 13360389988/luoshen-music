/**
 * 洛神赋 · 双层动态背景
 * 功能：双层动态背景 | 粒子系统 | 流动线条 | 黑色半透明化
 *
 * 使用方法：在 index.html 的 </body> 前引入此文件（需在 luoshen-enhance.js 之前）
 *   <script src="js/dynamic-background.js"></script>
 *
 * 作者：Tabbit AI
 * 版本：1.0.0
 */

(function() {
  'use strict';

  // 防止重复执行
  if (window.dynamicBackgroundApplied) return;
  window.dynamicBackgroundApplied = true;

  console.log('🌌 洛神赋双层动态背景加载中...');

  // ========== 注入样式 ==========
  const style = document.createElement('style');
  style.id = 'dynamic-bg-styles';
  style.textContent = `
    /* ===== 双层动态背景容器 ===== */
    #dynamic-bg-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }

    /* ===== 第一层：深色渐变基底（不透明度50%）===== */
    .db-layer-base {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        135deg,
        rgba(10, 8, 15, 0.5) 0%,
        rgba(20, 18, 35, 0.5) 25%,
        rgba(13, 11, 24, 0.5) 50%,
        rgba(22, 33, 62, 0.5) 75%,
        rgba(13, 11, 17, 0.5) 100%
      );
      transition: background 3s ease;
    }

    /* ===== 第二层：动态粒子画布 ===== */
    .db-layer-particles {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.7;
    }

    /* ===== 第三层：流动光带画布 ===== */
    .db-layer-flow {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }

    /* ===== 第四层：墨韵漂浮层 ===== */
    .db-layer-ink {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.3;
    }

    /* ===== 覆盖原有黑色背景，降低不透明度到50% ===== */
    body.db-active {
      background: rgba(13, 11, 8, 0.5) !important;
    }

    html.db-active {
      background: rgba(13, 11, 8, 0.5) !important;
    }
  `;
  document.head.appendChild(style);

  // ========== 主函数 ==========
  function initDynamicBackground() {
    // 标记 body/html 为已激活
    document.body.classList.add('db-active');
    document.documentElement.classList.add('db-active');

    // 创建背景容器
    const bgContainer = document.createElement('div');
    bgContainer.id = 'dynamic-bg-container';

    // --- 第一层：渐变基底 ---
    const layerBase = document.createElement('div');
    layerBase.className = 'db-layer-base';

    // --- 第二层：粒子系统 ---
    const canvasParticles = document.createElement('canvas');
    canvasParticles.className = 'db-layer-particles';
    canvasParticles.id = 'db-canvas-particles';

    // --- 第三层：流动光带 ---
    const canvasFlow = document.createElement('canvas');
    canvasFlow.className = 'db-layer-flow';
    canvasFlow.id = 'db-canvas-flow';

    // --- 第四层：墨韵漂浮 ---
    const canvasInk = document.createElement('canvas');
    canvasInk.className = 'db-layer-ink';
    canvasInk.id = 'db-canvas-ink';

    // 组装
    bgContainer.appendChild(layerBase);
    bgContainer.appendChild(canvasParticles);
    bgContainer.appendChild(canvasFlow);
    bgContainer.appendChild(canvasInk);
    document.body.insertBefore(bgContainer, document.body.firstChild);

    // 初始化各层动画
    initParticles(canvasParticles);
    initFlowLines(canvasFlow);
    initInkFloat(canvasInk);

    // 渐变基底缓慢呼吸动画
    animateBaseGradient(layerBase);

    console.log('✨ 双层动态背景初始化完成');
  }

  // ========== 第一层：渐变呼吸动画 ==========
  function animateBaseGradient(layer) {
    let hueShift = 0;
    function breathe() {
      hueShift += 0.05;
      const shift1 = Math.sin(hueShift) * 5;
      const shift2 = Math.cos(hueShift * 0.7) * 8;
      layer.style.background = `
        linear-gradient(
          ${135 + shift1}deg,
          rgba(10, 8, 15, 0.5) 0%,
          rgba(${20 + shift2}, 18, ${35 + shift1}, 0.5) 25%,
          rgba(13, 11, 24, 0.5) 50%,
          rgba(${22 + shift1}, ${33 + shift2}, 62, 0.5) 75%,
          rgba(13, 11, 17, 0.5) 100%
        )
      `;
      requestAnimationFrame(breathe);
    }
    breathe();
  }

  // ========== 第二层：粒子系统 ==========
  function initParticles(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 粒子类
    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        // 古风配色：青金色调
        const colors = [
          [160, 180, 210],   // 青灰
          [201, 169, 110],   // 金色
          [140, 170, 200],   // 淡青
          [180, 160, 200],   // 淡紫
          [150, 200, 180],   // 玉绿
        ];
        const c = colors[Math.floor(Math.random() * colors.length)];
        this.r = c[0]; this.g = c[1]; this.b = c[2];
        this.alpha = Math.random() * 0.6 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.005;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      update(time) {
        this.x += this.speedX;
        this.y += this.speedY;
        // 边界环绕
        if (this.x < -10) this.x = W + 10;
        if (this.x > W + 10) this.x = -10;
        if (this.y < -10) this.y = H + 10;
        if (this.y > H + 10) this.y = -10;
        // 脉动透明度
        this.currentAlpha = this.alpha * (0.5 + 0.5 * Math.sin(time * this.pulseSpeed + this.pulsePhase));
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.currentAlpha})`;
        ctx.fill();
        // 光晕
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${this.currentAlpha * 0.25})`;
        ctx.fill();
      }
    }

    // 初始化粒子
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    // 绘制连线
    function drawConnections(time) {
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12 * (0.6 + 0.4 * Math.sin(time * 0.001));
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(140, 170, 210,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    // 动画循环
    function animate(time) {
      ctx.clearRect(0, 0, W, H);
      drawConnections(time);
      particles.forEach(p => { p.update(time); p.draw(ctx); });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ========== 第三层：流动光带 ==========
  function initFlowLines(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const lines = [];
    const LINE_COUNT = 12;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 流线类
    class FlowLine {
      constructor(index) {
        this.index = index;
        this.reset(true);
      }
      reset(initial = false) {
        this.startX = initial ? Math.random() * (W + 400) - 200 : -200;
        this.y = (this.index / LINE_COUNT) * H + (Math.random() - 0.5) * 80;
        this.length = Math.random() * 250 + 120;
        this.speed = Math.random() * 0.8 + 0.3;
        this.amplitude = Math.random() * 30 + 10;
        this.frequency = Math.random() * 0.008 + 0.003;
        this.phase = Math.random() * Math.PI * 2;
        this.thickness = Math.random() * 1.5 + 0.3;
        // 金青色调
        const gold = Math.random() > 0.4;
        if (gold) {
          this.r = 180 + Math.random() * 40;
          this.g = 150 + Math.random() * 30;
          this.b = 80 + Math.random() * 30;
        } else {
          this.r = 100 + Math.random() * 40;
          this.g = 140 + Math.random() * 40;
          this.b = 180 + Math.random() * 30;
        }
        this.alpha = Math.random() * 0.25 + 0.08;
      }
      update(offset) {
        this.startX += this.speed;
        if (this.startX > W + 200) this.reset();
      }
      draw(ctx, time) {
        ctx.beginPath();
        ctx.moveTo(this.startX, this.y);
        for (let i = 0; i <= this.length; i += 3) {
          const x = this.startX + i;
          const waveY = this.y + Math.sin((i * this.frequency) + time * 0.001 + this.phase) * this.amplitude;
          ctx.lineTo(x, waveY);
        }
        const grad = ctx.createLinearGradient(this.startX, this.y, this.startX + this.length, this.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.2, `rgba(${this.r},${this.g},${this.b},${this.alpha})`);
        grad.addColorStop(0.5, `rgba(${this.r},${this.g},${this.b},${this.alpha * 1.5})`);
        grad.addColorStop(0.8, `rgba(${this.r},${this.g},${this.b},${this.alpha})`);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    // 初始化流线
    for (let i = 0; i < LINE_COUNT; i++) {
      lines.push(new FlowLine(i));
    }

    // 动画循环
    function animate(time) {
      ctx.clearRect(0, 0, W, H);
      lines.forEach(line => { line.update(time); line.draw(ctx, time); });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ========== 第四层：墨韵漂浮 ==========
  function initInkFloat(canvas) {
    const ctx = canvas.getContext('2d');
    let W, H;
    const inkDots = [];
    const INK_COUNT = 25;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 墨点类
    class InkDot {
      constructor() {
        this.reset(true);
      }
      reset(initial = false) {
        this.x = Math.random() * W;
        this.y = initial ? Math.random() * H : H + 20;
        this.radius = Math.random() * 60 + 20;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.alpha = Math.random() * 0.06 + 0.02;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        // 墨色或淡金色
        const isInk = Math.random() > 0.3;
        if (isInk) {
          this.r = 30 + Math.random() * 20;
          this.g = 28 + Math.random() * 15;
          this.b = 35 + Math.random() * 20;
        } else {
          this.r = 160 + Math.random() * 40;
          this.g = 140 + Math.random() * 30;
          this.b = 80 + Math.random() * 30;
        }
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        if (this.y < -this.radius * 2) this.reset();
      }
      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
        grad.addColorStop(0, `rgba(${this.r},${this.g},${this.b},${this.alpha})`);
        grad.addColorStop(0.5, `rgba(${this.r},${this.g},${this.b},${this.alpha * 0.5})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        // 不规则墨点形状
        const points = 6;
        for (let i = 0; i <= points; i++) {
          const angle = (i / points) * Math.PI * 2;
          const r = this.radius * (0.7 + Math.random() * 0.3);
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    }

    // 初始化墨点
    for (let i = 0; i < INK_COUNT; i++) {
      inkDots.push(new InkDot());
    }

    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, W, H);
      inkDots.forEach(dot => { dot.update(); dot.draw(ctx); });
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }

  // ========== 启动 ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDynamicBackground);
  } else {
    initDynamicBackground();
  }
})();
