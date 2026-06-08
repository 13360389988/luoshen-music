/**
 * 洛神赋数字艺术网页增强脚本
 * 功能：动态视觉元素 | 视差滚动 | 美化音乐播放器 | 留言墙
 * 
 * 使用方法：在 index.html 的 </body> 前引入此文件
 *   <script src="js/luoshen-enhance.js"></script>
 * 
 * 作者：Tabbit AI
 * 版本：1.0.0
 */

(function() {
  'use strict';

  // 防止重复执行
  if (window.luoshenEnhanced) return;
  window.luoshenEnhanced = true;

  console.log('🎨 洛神赋网页增强脚本加载中...');

  // ========== 注入样式 ==========
  const style = document.createElement('style');
  style.id = 'luoshen-enhance-styles';
  style.textContent = `
    /* ===== 动态视觉元素 ===== */
    @keyframes lsRibbonFloat {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-6px) rotate(0.5deg); }
      50% { transform: translateY(0px) rotate(0deg); }
      75% { transform: translateY(6px) rotate(-0.5deg); }
    }

    @keyframes lsWaterRipple {
      0% { transform: scale(0.8); opacity: 0.8; }
      100% { transform: scale(1.5); opacity: 0; }
    }

    @keyframes lsPetalFall {
      0% { transform: translateY(-100px) rotate(0deg) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg) translateX(80px); opacity: 0; }
    }

    @keyframes lsInkFloat {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
      50% { transform: translateY(-20px) scale(1.05); opacity: 0.7; }
    }

    @keyframes lsDragonSparkle {
      0% { transform: scale(0) rotate(0deg); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: scale(2) rotate(180deg); opacity: 0; }
    }

    /* 衣带飘动 */
    .ls-ribbon-float {
      animation: lsRibbonFloat 6s ease-in-out infinite !important;
    }

    /* 水波纹 */
    .ls-water-ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 350px;
      height: 350px;
      pointer-events: none;
      z-index: 1;
    }

    .ls-water-ripple .ripple-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      border: 2px solid rgba(100, 200, 255, 0.35);
      border-radius: 50%;
      animation: lsWaterRipple 3.5s ease-out infinite;
      transform: translate(-50%, -50%);
    }

    .ls-water-ripple .ripple-circle:nth-child(2) { animation-delay: 1.16s; }
    .ls-water-ripple .ripple-circle:nth-child(3) { animation-delay: 2.33s; }

    /* 桃花飘落 */
    .ls-petal-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }

    .ls-petal-fall {
      position: absolute;
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      animation: lsPetalFall linear infinite;
      border-radius: 2px;
    }

    /* 墨点漂浮 */
    .ls-ink-particle-extra {
      position: absolute;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(40,40,60,0.6), transparent);
      border-radius: 50%;
      animation: lsInkFloat 4s ease-in-out infinite;
      pointer-events: none;
    }

    /* 龙光闪烁 */
    .ls-dragon-spark {
      position: absolute;
      width: 6px;
      height: 6px;
      background: radial-gradient(circle, rgba(255,215,0,0.9), rgba(255,140,0,0));
      border-radius: 50%;
      animation: lsDragonSparkle 2s ease-out infinite;
      pointer-events: none;
    }

    /* ===== 视差滚动 ===== */
    .ls-parallax-bg {
      position: absolute;
      top: -10%;
      left: 0;
      width: 100%;
      height: 120%;
      z-index: -1;
      will-change: transform;
      transition: none;
    }

    #cover .ls-parallax-bg {
      background: radial-gradient(ellipse at center, rgba(30,20,45,0.15), transparent 70%);
    }

    #chapter1 .ls-parallax-bg {
      background: linear-gradient(180deg, rgba(20,40,60,0.12), rgba(40,60,80,0.08), transparent);
    }

    #chapter2 .ls-parallax-bg {
      background: radial-gradient(circle at 30% 50%, rgba(255,150,180,0.06), transparent 60%);
    }

    #chapter3 .ls-parallax-bg {
      background: linear-gradient(180deg, rgba(60,40,20,0.1), rgba(100,60,30,0.06), transparent);
    }

    #epilogue .ls-parallax-bg {
      background: radial-gradient(ellipse at center, rgba(40,30,60,0.1), transparent 70%);
    }

    /* ===== 增强音乐播放器 ===== */
    .ls-player-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      margin-top: 32px;
    }

    .ls-enhanced-player {
      background: rgba(255, 255, 255, 0.07);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 22px;
      padding: 28px 32px;
      max-width: 520px;
      width: 90%;
      box-shadow:
        0 12px 40px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
      box-sizing: border-box;
    }

    .ls-player-info-row {
      text-align: center;
      margin-bottom: 20px;
    }

    .ls-song-title {
      font-size: 17px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }

    .ls-song-artist {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.45);
      letter-spacing: 1px;
    }

    .ls-player-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 28px;
      margin-bottom: 20px;
    }

    .ls-play-btn {
      width: 56px;
      height: 56px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .ls-play-btn:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 22px rgba(102, 126, 234, 0.55);
    }

    .ls-play-btn svg {
      width: 24px;
      height: 24px;
      fill: white;
    }

    .ls-skip-btn {
      width: 38px;
      height: 38px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.25s ease;
    }

    .ls-skip-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      transform: scale(1.06);
    }

    .ls-skip-btn svg {
      width: 16px;
      height: 16px;
      fill: rgba(255, 255, 255, 0.65);
    }

    .ls-progress-section {
      margin-bottom: 16px;
    }

    .ls-progress-bar {
      height: 5px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .ls-progress-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: linear-gradient(90deg, #667eea, #a78bfa);
      border-radius: 3px;
      width: 0%;
      transition: width 0.1s linear;
    }

    .ls-time-row {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.4);
      margin-top: 6px;
      font-variant-numeric: tabular-nums;
    }

    .ls-volume-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .ls-volume-btn {
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
    }

    .ls-volume-btn svg {
      width: 18px;
      height: 18px;
      fill: rgba(255, 255, 255, 0.5);
    }

    .ls-volume-slider {
      flex: 1;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }

    .ls-volume-fill {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 2px;
      width: 75%;
    }

    .ls-original-hidden {
      visibility: hidden !important;
      pointer-events: none !important;
      height: 0 !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
    }

    /* ===== 留言墙 ===== */
    #messageWall {
      background: linear-gradient(160deg, rgba(15,23,42,0.96) 0%, rgba(30,41,82,0.94) 50%, rgba(17,24,39,0.97) 100%);
      min-height: auto;
      padding: 80px 20px 100px;
      position: relative;
      overflow: hidden;
    }

    #messageWall::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
        background:
        radial-gradient(circle at 20% 30%, rgba(102,126,234,0.04), transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(118,75,162,0.04), transparent 50%);
      pointer-events: none;
    }

    .ls-msg-container {
      max-width: 720px;
      margin: 0 auto;
      position: relative;
      z-index: 1;
    }

    .ls-msg-title {
      text-align: center;
      font-size: 34px;
      font-weight: 700;
      letter-spacing: 6px;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #818cf8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .ls-msg-subtitle {
      text-align: center;
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px;
      margin-bottom: 44px;
      letter-spacing: 2px;
    }

    .ls-form-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 28px 26px;
      margin-bottom: 36px;
      backdrop-filter: blur(8px);
    }

    .ls-input-field {
      width: 100%;
      padding: 13px 16px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
      box-sizing: border-box;
      transition: border-color 0.25s, background 0.25s;
      font-family: inherit;
    }

    .ls-input-field:focus {
      outline: none;
      border-color: rgba(167, 139, 250, 0.5);
      background: rgba(255, 255, 255, 0.09);
    }

    .ls-input-field::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .ls-textarea-wrap {
      position: relative;
    }

    .ls-textarea {
      width: 100%;
      padding: 13px 16px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 10px;
      color: #fff;
      font-size: 14px;
      resize: vertical;
      min-height: 88px;
      box-sizing: border-box;
      transition: border-color 0.25s, background 0.25s;
      font-family: inherit;
      line-height: 1.6;
    }

    .ls-textarea:focus {
      outline: none;
      border-color: rgba(167, 139, 250, 0.5);
      background: rgba(255, 255, 255, 0.09);
    }

    .ls-textarea::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .ls-char-count {
      text-align: right;
      font-size: 11px;
      color: rgba(255, 255, 255, 0.3);
      margin-top: 6px;
      transition: color 0.2s;
    }

    .ls-char-count.warning { color: #f59e0b; }
    .ls-char-count.danger { color: #ef4444; }

    .ls-submit-btn {
      display: block;
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 4px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      margin-top: 8px;
    }

    .ls-submit-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    }

    .ls-submit-btn:active {
      transform: translateY(0);
    }

    .ls-messages-area {
      max-height: 420px;
      overflow-y: auto;
      margin-bottom: 32px;
      padding-right: 6px;
    }

    .ls-messages-area::-webkit-scrollbar {
      width: 4px;
    }

    .ls-messages-area::-webkit-scrollbar-track {
      background: transparent;
    }

    .ls-messages-area::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.12);
      border-radius: 2px;
    }

    .ls-empty-state {
      text-align: center;
      padding: 56px 20px;
      color: rgba(255, 255, 255, 0.3);
    }

    .ls-empty-icon {
      font-size: 42px;
      margin-bottom: 14px;
      opacity: 0.5;
    }

    .ls-message-card {
      background: rgba(255, 255, 255, 0.035);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-radius: 14px;
      padding: 18px 20px;
      margin-bottom: 12px;
      animation: lsMsgFadeIn 0.45s ease-out both;
    }

    @keyframes lsMsgFadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .ls-msg-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }

    .ls-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      color: #fff;
      flex-shrink: 0;
      margin-right: 12px;
    }

    .ls-meta-col { flex: 1; }

    .ls-author-name {
      font-weight: 600;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      margin-bottom: 2px;
    }

    .ls-msg-time {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.3);
    }

    .ls-like-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 18px;
      padding: 5px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.25s ease;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    .ls-like-btn:hover {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.3);
      color: #fca5a5;
    }

    .ls-like-btn.liked {
      background: rgba(239, 68, 68, 0.15);
      border-color: rgba(239, 68, 68, 0.35);
      color: #fca5a5;
    }

    .ls-like-btn .like-icon { font-style: normal; }

    .ls-msg-body {
      line-height: 1.75;
      color: rgba(255, 255, 255, 0.72);
      font-size: 14px;
      word-break: break-word;
    }

    .ls-stats-row {
      display: flex;
      justify-content: center;
      gap: 52px;
    }

    .ls-stat {
      text-align: center;
    }

    .ls-stat-num {
      display: block;
      font-size: 30px;
      font-weight: 800;
      background: linear-gradient(135deg, #c4b5fd, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.2;
    }

    .ls-stat-label {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.35);
      letter-spacing: 2px;
      margin-top: 2px;
    }

    /* Toast 提示 */
    .ls-toast {
      position: fixed;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%) translateY(24px);
      background: rgba(15, 23, 42, 0.92);
      color: #fff;
      padding: 12px 28px;
      border-radius: 10px;
      font-size: 13px;
      z-index: 99999;
      opacity: 0;
      transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      letter-spacing: 1px;
      pointer-events: none;
    }

    .ls-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }

    .ls-toast.success { border-left: 3px solid #34d399; }
    .ls-toast.warning { border-left: 3px solid #fbbf24; }
    .ls-toast.error   { border-left: 3px solid #f87171; }

    /* 导航栏留言链接 */
    .nav-dots a[href="#messageWall"] { color: rgba(255,255,255,0.5); }
    .nav-dots a[href="#messageWall"].active { color: #fff; }

    /* 响应式 */
    @media (max-width: 640px) {
      .ls-enhanced-player { padding: 20px 18px; }
      .ls-play-btn { width: 48px; height: 48px; }
      .ls-play-btn svg { width: 20px; height: 20px; }
      .ls-msg-title { font-size: 26px; letter-spacing: 3px; }
      .ls-form-card { padding: 20px 16px; }
      .ls-stats-row { gap: 28px; }
      .ls-stat-num { font-size: 24px; }
      #messageWall { padding: 56px 16px 80px; }
    }
  `;
  document.head.appendChild(style);

  // ========== 动态视觉元素 ==========

  // 1. 衣带飘动
  const luoshenImages = document.querySelectorAll('.ch2-image-wrap img, .cover-image-wrap img');
  luoshenImages.forEach(img => img.classList.add('ls-ribbon-float'));

  // 2. 水波纹（邂逅章节）
  const chapter1 = document.getElementById('chapter1');
  if (chapter1) {
    const waterRipple = document.createElement('div');
    waterRipple.className = 'ls-water-ripple';
    waterRipple.innerHTML =
      '<div class="ripple-circle"></div>' +
      '<div class="ripple-circle"></div>' +
      '<div class="ripple-circle"></div>';
    chapter1.appendChild(waterRipple);
  }

  // 3. 桃花飘落（凝视章节）
  const chapter2 = document.getElementById('chapter2');
  if (chapter2) {
    const petalContainer = document.createElement('div');
    petalContainer.className = 'ls-petal-container';
    for (let i = 0; i < 18; i++) {
      const petal = document.createElement('div');
      petal.className = 'ls-petal-fall';
      petal.style.cssText = `left:${Math.random() * 100}%;animation-duration:${8 + Math.random() * 8}s;animation-delay:${Math.random() * 5}s;width:${12 + Math.random() * 10}px;height:${12 + Math.random() * 10}px;`;
      petalContainer.appendChild(petal);
    }
    chapter2.appendChild(petalContainer);
  }

  // 4. 封面额外墨点
  const coverSection = document.getElementById('cover');
  if (coverSection) {
    for (let i = 0; i < 6; i++) {
      const ink = document.createElement('div');
      ink.className = 'ls-ink-particle-extra';
      ink.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 4}s;`;
      coverSection.appendChild(ink);
    }
  }

  // 5. 离别章节龙光
  const chapter3 = document.getElementById('chapter3');
  if (chapter3) {
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement('div');
      spark.className = 'ls-dragon-spark';
      spark.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 2}s;`;
      chapter3.appendChild(spark);
    }
  }

  // ========== 视差滚动 ==========
  const sectionSpeedMap = { cover: 0.08, chapter1: 0.22, chapter2: 0.18, chapter3: 0.28, epilogue: 0.15 };

  document.querySelectorAll('.section').forEach(section => {
    const id = section.id;
    if (!id || section.querySelector('.ls-parallax-bg')) return;
    const pBg = document.createElement('div');
    pBg.className = 'ls-parallax-bg';
    section.style.position = section.style.position || 'relative';
    section.style.overflow = 'hidden';
    section.insertBefore(pBg, section.firstChild);
  });

  let scrollTicking = false;
  function updateParallax() {
    const sy = window.scrollY || window.pageYOffset;
    document.querySelectorAll('.section').forEach(section => {
      const speed = sectionSpeedMap[section.id] || 0.2;
      const bg = section.querySelector('.ls-parallax-bg');
      if (!bg) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight + 300 && rect.bottom > -300) {
        bg.style.transform = `translateY(${sy * speed}px)`;
      }
    });
    scrollTicking = false;
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(updateParallax);
      scrollTicking = true;
    }
  }, { passive: true });

  updateParallax();

  // ========== 增强音乐播放器 ==========
  const playBtnEl = document.getElementById('playBtn');

  if (playBtnEl) {
    const playerWrapper = document.createElement('div');
    playerWrapper.className = 'ls-player-wrapper';
    playerWrapper.innerHTML = `
      <div class="ls-enhanced-player">
        <div class="ls-player-info-row">
          <div class="ls-song-title">洛水之声</div>
          <div class="ls-song-artist">数字画卷 · 解构洛神</div>
        </div>
        <div class="ls-player-controls">
          <button class="ls-skip-btn" title="上一曲">
            <svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button class="ls-play-btn" title="播放/暂停" id="lsPlayToggle">
            <svg class="ls-icon-play" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg class="ls-icon-pause" viewBox="0 0 24 24" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <button class="ls-skip-btn" title="下一曲">
            <svg viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>
        <div class="ls-progress-section">
          <div class="ls-progress-bar" id="lsProgressBar">
            <div class="ls-progress-fill" id="lsProgressFill"></div>
          </div>
          <div class="ls-time-row">
            <span id="lsCurrentTime">0:00</span>
            <span id="lsDuration">3:45</span>
          </div>
        </div>
        <div class="ls-volume-row">
          <button class="ls-volume-btn" title="音量">
            <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          </button>
          <div class="ls-volume-slider" id="lsVolumeSlider">
            <div class="ls-volume-fill" id="lsVolumeFill"></div>
          </div>
        </div>
      </div>
    `;

    playBtnEl.parentNode.insertBefore(playerWrapper, playBtnEl.nextSibling);
    playBtnEl.classList.add('ls-original-hidden');

    const lsPlayToggle = document.getElementById('lsPlayToggle');
    const lsIconPlay = lsPlayToggle.querySelector('.ls-icon-play');
    const lsIconPause = lsPlayToggle.querySelector('.ls-icon-pause');
    const lsProgressFill = document.getElementById('lsProgressFill');
    const lsCurrentTime = document.getElementById('lsCurrentTime');
    const lsProgressBar = document.getElementById('lsProgressBar');
    const lsVolumeSlider = document.getElementById('lsVolumeSlider');
    const lsVolumeFill = document.getElementById('lsVolumeFill');
    const visualizer = document.getElementById('visualizer');
    const audioToast = document.getElementById('audioToast');

    let isPlaying = true;
    let progress = 0;
    const TOTAL_SECONDS = 225;

    setInterval(() => {
      if (isPlaying && progress < 100) {
        progress += 0.08;
        if (progress > 100) progress = 100;
        lsProgressFill.style.width = progress + '%';
        const curSec = Math.floor(TOTAL_SECONDS * progress / 100);
        lsCurrentTime.textContent = Math.floor(curSec / 60) + ':' + ('0' + (curSec % 60)).slice(-2);
        if (visualizer) {
          visualizer.querySelectorAll('.bar').forEach((bar, idx) => {
            bar.style.height = (20 + Math.sin(Date.now() / 180 + idx * 0.8) * 18) + '%';
          });
        }
      }
    }, 100);

    lsPlayToggle.addEventListener('click', () => {
      isPlaying = !isPlaying;
      lsIconPlay.style.display = isPlaying ? 'none' : 'block';
      lsIconPause.style.display = isPlaying ? 'block' : 'none';
      if (audioToast) audioToast.style.display = isPlaying ? 'flex' : 'none';
    });

    lsProgressBar.addEventListener('click', e => {
      const rect = lsProgressBar.getBoundingClientRect();
      progress = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      lsProgressFill.style.width = progress + '%';
    });

    lsVolumeSlider.addEventListener('click', e => {
      const rect = lsVolumeSlider.getBoundingClientRect();
      lsVolumeFill.style.width = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)) + '%';
    });
  }

  // ========== 留言墙 ==========
  const epilogue = document.getElementById('epilogue');

  if (epilogue) {
    const STORAGE_KEY = 'luoshen_messages_v2';

    const wall = document.createElement('section');
    wall.className = 'section';
    wall.id = 'messageWall';
    wall.innerHTML = `
      <div class="section-divider"><div class="diamond"></div></div>
      <div class="ls-msg-container fade-in visible">
        <h2 class="ls-msg-title">观者留言</h2>
        <p class="ls-msg-subtitle">分享您对《洛神赋》数字艺术的感受</p>
        <div class="ls-form-card">
          <div style="margin-bottom:14px;">
            <input type="text" class="ls-input-field" id="lsMsgName" placeholder="您的名字（可选）" maxlength="20">
          </div>
          <div class="ls-textarea-wrap">
            <textarea class="ls-textarea" id="lsMsgContent" placeholder="写下您的感受...（最多200字）" maxlength="200" rows="4"></textarea>
            <div class="ls-char-count" id="lsCharCount">0 / 200</div>
          </div>
          <button class="ls-submit-btn" id="lsSubmitMsg">留下足迹</button>
        </div>
        <div class="ls-messages-area" id="lsMessagesArea">
          <div class="ls-empty-state" id="lsEmptyState">
            <div class="ls-empty-icon">💬</div>
            <p>暂无留言，成为第一个分享感受的人吧</p>
          </div>
        </div>
        <div class="ls-stats-row">
          <div class="ls-stat">
            <span class="ls-stat-num" id="lsStatCount">0</span>
            <span class="ls-stat-label">条留言</span>
          </div>
          <div class="ls-stat">
            <span class="ls-stat-num" id="lsStatChars">0</span>
            <span class="ls-stat-label">字真情</span>
          </div>
        </div>
      </div>
    `;
    epilogue.parentNode.insertBefore(wall, epilogue.nextSibling);

    // 导航栏添加留言链接
    const navDots = document.querySelector('.nav-dots');
    if (navDots) {
      const msgLink = document.createElement('li');
      msgLink.innerHTML = '<a href="#messageWall">留言</a>';
      navDots.appendChild(msgLink);
    }

    // --- 留言交互 ---
    function showToast(text, type) {
      const existing = document.querySelector('.ls-toast');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.className = `ls-toast ${type}`;
      toast.textContent = text;
      document.body.appendChild(toast);
      requestAnimationFrame(() => toast.classList.add('show'));
      setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2800);
    }

    function loadMessages() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; } }
    function saveMessages(arr) { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }

    function getAvatarGradient(name) {
      const colors = [
        'linear-gradient(135deg,#667eea,#764ba2)',
        'linear-gradient(135deg,#f093fb,#f5576c)',
        'linear-gradient(135deg,#4facfe,#00f2fe)',
        'linear-gradient(135deg,#43e97b,#38f9d7)',
        'linear-gradient(135deg,#fa7099,#fee140)',
        'linear-gradient(135deg,#a18cd1,#fbc2eb)',
        'linear-gradient(135deg,#fccb90,#d57eeb)',
        'linear-gradient(135deg,#e0c3fc,#8ec5fc)'
      ];
      let hash = 0;
      for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
      return colors[Math.abs(hash) % colors.length];
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function renderMessage(msg) {
      const card = document.createElement('div');
      card.className = 'ls-message-card';
      card.dataset.id = msg.id;
      card.innerHTML = `
        <div class="ls-msg-header">
          <div class="ls-avatar" style="background:${getAvatarGradient(msg.name)}">${msg.name.charAt(0).toUpperCase()}</div>
          <div class="ls-meta-col">
            <div class="ls-author-name">${escapeHtml(msg.name)}</div>
            <div class="ls-msg-time">${msg.time}</div>
          </div>
          <button class="ls-like-btn" data-id="${msg.id}">
            <span class="like-icon">♡</span>
            <span class="like-count">${msg.likes}</span>
          </button>
        </div>
        <div class="ls-msg-body">${escapeHtml(msg.content)}</div>
      `;
      card.querySelector('.ls-like-btn').addEventListener('click', function () {
        const msgs = loadMessages();
        const idx = msgs.findIndex(m => m.id === msg.id);
        if (idx === -1) return;
        msgs[idx].likes++;
        saveMessages(msgs);
        this.querySelector('.like-count').textContent = msgs[idx].likes;
        this.classList.add('liked');
        setTimeout(() => this.classList.remove('liked'), 500);
        updateStats();
      });
      return card;
    }

    function updateStats() {
      const msgs = loadMessages();
      document.getElementById('lsStatCount').textContent = msgs.length;
      document.getElementById('lsStatChars').textContent = msgs.reduce((sum, m) => sum + m.content.length, 0);
    }

    const messagesArea = document.getElementById('lsMessagesArea');
    const emptyState = document.getElementById('lsEmptyState');
    const msgContent = document.getElementById('lsMsgContent');
    const charCount = document.getElementById('lsCharCount');

    function refreshMessages() {
      const msgs = loadMessages();
      messagesArea.querySelectorAll('.ls-message-card').forEach(el => el.remove());
      if (msgs.length === 0) {
        emptyState.style.display = '';
      } else {
        emptyState.style.display = 'none';
        msgs.forEach(m => messagesArea.appendChild(renderMessage(m)));
      }
      updateStats();
    }

    refreshMessages();

    msgContent.addEventListener('input', () => {
      const len = msgContent.value.length;
      charCount.textContent = `${len} / 200`;
      charCount.classList.remove('warning', 'danger');
      if (len >= 195) charCount.classList.add('danger');
      else if (len >= 170) charCount.classList.add('warning');
    });

    document.getElementById('lsSubmitMsg').addEventListener('click', () => {
      const name = document.getElementById('lsMsgName').value.trim() || '匿名观者';
      const content = msgContent.value.trim();
      if (!content) { showToast('请写下您的感受 ⚠️', 'warning'); return; }
      if (content.length > 200) { showToast('留言内容不能超过200字 ⚠️', 'warning'); return; }
      const newMsg = { id: Date.now(), name, content, time: new Date().toLocaleString('zh-CN'), likes: 0 };
      const msgs = loadMessages();
      msgs.unshift(newMsg);
      saveMessages(msgs);
      msgContent.value = '';
      document.getElementById('lsMsgName').value = '';
      charCount.textContent = '0 / 200';
      charCount.classList.remove('warning', 'danger');
      refreshMessages();
      showToast('留言已保存，感谢分享 ✨', 'success');
    });
  }

  console.log('✅ 洛神赋网页增强脚本加载完成！');
})();
