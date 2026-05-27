(function () {
  const PHONE = '917791811181';
  const COMPANY = 'NR CONSTRUCTION & CONSULTANCY';

  const styles = document.createElement('style');
  styles.textContent = `
.wa-chat-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #a23a00;
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(162,58,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.wa-chat-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 24px rgba(162,58,0,0.55);
}
.wa-chat-btn svg {
  width: 28px;
  height: 28px;
  transition: transform 0.3s ease;
}
.wa-chat-btn.active svg {
  transform: rotate(45deg);
}

.wa-panel {
  position: fixed;
  bottom: 92px;
  right: 24px;
  z-index: 9998;
  width: 360px;
  max-width: calc(100vw - 48px);
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.18);
  overflow: hidden;
  display: none;
  flex-direction: column;
  animation: waSlideUp 0.35s cubic-bezier(0.16,1,0.3,1);
  border: 1px solid #e3bfb2;
}
.wa-panel.open {
  display: flex;
}
@keyframes waSlideUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.wa-header {
  background: #2f3131;
  color: #f9f9f9;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 3px solid #a23a00;
}
.wa-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #a23a00;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.wa-avatar svg {
  width: 22px;
  height: 22px;
  fill: #fff;
}
.wa-header-text {
  flex: 1;
}
.wa-header-text h3 {
  font-family: Sora, sans-serif;
  font-size: 15px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}
.wa-header-text p {
  font-family: 'Work Sans', sans-serif;
  font-size: 12px;
  margin: 2px 0 0;
  opacity: 0.7;
}

.wa-body {
  padding: 16px;
  overflow-y: auto;
  max-height: 380px;
}
.wa-msg {
  background: #fff;
  border: 1px solid #e3bfb2;
  border-radius: 4px 12px 12px 12px;
  padding: 14px 16px;
  margin-bottom: 14px;
  font-family: 'Work Sans', sans-serif;
  font-size: 14px;
  color: #1a1c1c;
  line-height: 1.5;
  position: relative;
}
.wa-msg::before {
  content: '';
  position: absolute;
  left: -1px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: #a23a00;
  border-radius: 3px 0 0 3px;
}

.wa-quick-reply {
  display: block;
  width: 100%;
  text-align: left;
  background: #fff;
  border: 1px solid #e3bfb2;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 8px;
  cursor: pointer;
  font-family: 'Work Sans', sans-serif;
  font-size: 13px;
  color: #1a1c1c;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 10px;
}
.wa-quick-reply:hover {
  background: #a23a00;
  color: #fff;
  border-color: #a23a00;
  transform: translateX(4px);
}
.wa-quick-reply:hover .wa-q-icon {
  color: #fff;
}
.wa-q-icon {
  font-size: 18px;
  color: #a23a00;
  flex-shrink: 0;
  transition: color 0.25s ease;
}

.wa-footer {
  padding: 12px 16px;
  border-top: 1px solid #e3bfb2;
  background: #fff;
}
.wa-footer a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #a23a00;
  color: #fff;
  text-decoration: none;
  font-family: 'Work Sans', sans-serif;
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 12px;
  border-radius: 6px;
  transition: background 0.25s ease;
}
.wa-footer a:hover {
  background: #ca4b00;
}
.wa-footer a svg {
  width: 18px;
  height: 18px;
  fill: #fff;
}

@media (max-width: 480px) {
  .wa-panel {
    right: 12px;
    bottom: 84px;
    width: calc(100vw - 24px);
  }
  .wa-chat-btn {
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
  }
}
`;

  document.head.appendChild(styles);

  const container = document.createElement('div');
  container.innerHTML = `
<button class="wa-chat-btn" id="waChatBtn" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.88.54 3.63 1.48 5.12L2 22l5.12-1.48C8.37 21.46 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.54 0-2.99-.44-4.22-1.2l-.38-.22-3.18.92.92-3.18-.22-.38C4.44 14.99 4 13.54 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.5-6.68c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.16.23-.64.8-.78.97-.14.16-.28.18-.53.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.38.1-.5.1-.1.23-.28.35-.42.12-.14.16-.23.24-.38.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.5-.4-.42-.56-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.28c-.23.23-.84.82-.84 2 .01 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.52.58.19 1.11.16 1.52.1.46-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
  </svg>
</button>

<div class="wa-panel" id="waPanel">
  <div class="wa-header">
    <div class="wa-avatar">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.88.54 3.63 1.48 5.12L2 22l5.12-1.48C8.37 21.46 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.54 0-2.99-.44-4.22-1.2l-.38-.22-3.18.92.92-3.18-.22-.38C4.44 14.99 4 13.54 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.5-6.68c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.56.12-.16.23-.64.8-.78.97-.14.16-.28.18-.53.06-.25-.12-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.38.1-.5.1-.1.23-.28.35-.42.12-.14.16-.23.24-.38.08-.16.04-.3-.02-.42-.06-.12-.56-1.35-.77-1.85-.2-.5-.4-.42-.56-.42-.14 0-.3-.02-.46-.02s-.42.06-.64.28c-.23.23-.84.82-.84 2 .01 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.65.58.25 1.03.4 1.38.52.58.19 1.11.16 1.52.1.46-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.28z"/>
      </svg>
    </div>
    <div class="wa-header-text">
      <h3>${COMPANY}</h3>
      <p>We typically reply within minutes</p>
    </div>
  </div>

  <div class="wa-body">
    <div class="wa-msg">
      Hello! Welcome to ${COMPANY}.<br>
      How can we help you today?
    </div>
    <button class="wa-quick-reply" data-msg="Hello! I want to know about your construction services.">
      <span class="wa-q-icon">🏗️</span>
      Services &amp; Expertise
    </button>
    <button class="wa-quick-reply" data-msg="Hello! I would like to request a free quote for my project.">
      <span class="wa-q-icon">📋</span>
      Request a Free Quote
    </button>
    <button class="wa-quick-reply" data-msg="Hello! I have a project inquiry and would like to discuss it with your team.">
      <span class="wa-q-icon">📐</span>
      Project Inquiry
    </button>
    <button class="wa-quick-reply" data-msg="Hello! I want to know more about NR CONSTRUCTION & CONSULTANCY.">
      <span class="wa-q-icon">ℹ️</span>
      General Information
    </button>
  </div>

  <div class="wa-footer">
    <a href="https://wa.me/${PHONE}?text=Hello%20NR%20CONSTRUCTION%20%26%20CONSULTANCY%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.88.54 3.63 1.48 5.12L2 22l5.12-1.48C8.37 21.46 10.12 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.54 0-2.99-.44-4.22-1.2l-.38-.22-3.18.92.92-3.18-.22-.38C4.44 14.99 4 13.54 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
      Start Chat
    </a>
  </div>
</div>
`;

  document.body.appendChild(container);

  const btn = document.getElementById('waChatBtn');
  const panel = document.getElementById('waPanel');

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    panel.classList.toggle('open');
    btn.classList.toggle('active');
  });

  document.addEventListener('click', function (e) {
    if (panel.classList.contains('open') && !panel.contains(e.target) && e.target !== btn) {
      panel.classList.remove('open');
      btn.classList.remove('active');
    }
  });

  panel.querySelectorAll('.wa-quick-reply').forEach(function (el) {
    el.addEventListener('click', function () {
      var msg = this.getAttribute('data-msg');
      var url = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
    });
  });
})();
