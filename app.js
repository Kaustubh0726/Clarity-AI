// ═══════════════════════════════════════════════════════
// CLARITY PROTOTYPE — Full Dynamic Application
// Handles: dynamic chat, smart simulator engine,
// Gemini API integration, conversation rendering,
// Reasoning Lens, Clarity Cards, scenario switching,
// dashboard rendering with canvas charts, and
// real-time dashboard synchronization.
// ═══════════════════════════════════════════════════════

(function () {
  'use strict';

  // ─── CONFIGURATION ────────────────────────────────────
  const CONFIG = {
    GEMINI_MODEL: 'gemini-flash-latest',
    GEMINI_FALLBACK_MODEL: 'gemini-2.0-flash',
    GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/',
    TYPING_DELAY_MIN: 1800,
    TYPING_DELAY_MAX: 3500,
    STORAGE_KEY: 'clarity_api_settings',
    API_MAX_RETRIES: 3,
    API_INITIAL_BACKOFF_MS: 2000
  };

  // ─── SUPPORTED PROGRAMMING LANGUAGES ──────────────────
  const SUPPORTED_LANGUAGES = {
    javascript: { name: 'JavaScript', ext: 'js', icon: '⚡' },
    python: { name: 'Python', ext: 'py', icon: '🐍' },
    typescript: { name: 'TypeScript', ext: 'ts', icon: '📘' },
    java: { name: 'Java', ext: 'java', icon: '☕' },
    cpp: { name: 'C++', ext: 'cpp', icon: '⚙️' },
    go: { name: 'Go', ext: 'go', icon: '🐹' },
    rust: { name: 'Rust', ext: 'rs', icon: '🦀' },
    php: { name: 'PHP', ext: 'php', icon: '🐘' },
    ruby: { name: 'Ruby', ext: 'rb', icon: '💎' }
  };

  // ─── CODE TRANSPILATION ENGINE ────────────────────────
  const codeTranspiler = {
    // Pattern-based code conversion between languages
    transpile(code, fromLang, toLang) {
      if (fromLang === toLang) return code;
      
      // Normalize language names
      fromLang = fromLang.toLowerCase().replace(/-/g, '');
      toLang = toLang.toLowerCase().replace(/-/g, '');
      
      // Start with original code
      let result = code;

      // JavaScript → Other Languages
      if (fromLang === 'javascript') {
        if (toLang === 'python') {
          result = this.jsToPython(code);
        } else if (toLang === 'typescript') {
          result = this.jsToTypeScript(code);
        } else if (toLang === 'java') {
          result = this.jsToJava(code);
        } else if (toLang === 'go') {
          result = this.jsToGo(code);
        } else if (toLang === 'rust') {
          result = this.jsToRust(code);
        } else if (toLang === 'cpp') {
          result = this.jsToCpp(code);
        } else if (toLang === 'php') {
          result = this.jsToPhp(code);
        } else if (toLang === 'ruby') {
          result = this.jsToRuby(code);
        }
      }
      // Python → Other Languages
      else if (fromLang === 'python') {
        if (toLang === 'javascript') {
          result = this.pythonToJs(code);
        } else if (toLang === 'java') {
          result = this.pythonToJava(code);
        } else if (toLang === 'go') {
          result = this.pythonToGo(code);
        } else if (toLang === 'rust') {
          result = this.pythonToRust(code);
        } else if (toLang === 'cpp') {
          result = this.pythonToCpp(code);
        } else if (toLang === 'typescript') {
          result = this.pythonToJs(code); // Python → JS → TS
          result = this.jsToTypeScript(result);
        }
      }
      // Java → Other Languages
      else if (fromLang === 'java') {
        if (toLang === 'javascript') {
          result = this.javaToJs(code);
        } else if (toLang === 'python') {
          result = this.javaToPython(code);
        } else if (toLang === 'go') {
          result = this.javaToGo(code);
        } else if (toLang === 'cpp') {
          result = this.javaToCpp(code);
        } else if (toLang === 'rust') {
          result = this.javaToRust(code);
        }
      }
      
      return result;
    },

    // ─── JavaScript Conversions ─────────────────────────
    jsToPython(code) {
      let result = code
        .replace(/const\s+(\w+)\s*=\s*/g, '$1 = ')
        .replace(/let\s+(\w+)\s*=\s*/g, '$1 = ')
        .replace(/var\s+(\w+)\s*=\s*/g, '$1 = ')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $1($2):')
        .replace(/async\s+function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'async def $1($2):')
        .replace(/=>/g, ':')
        .replace(/\{/g, ':')
        .replace(/\}/g, '')
        .replace(/;/g, '')
        .replace(/\s+\/\//g, ' #')
        .replace(/\/\*[\s\S]*?\*\//g, (m) => '"""\n' + m.slice(2, -2).trim() + '\n"""')
        .replace(/console\.log\((.*?)\)/g, 'print($1)')
        .replace(/\.length/g, '__len__()')
        .replace(/\.push\((.*?)\)/g, '.append($1)')
        .replace(/\.pop\(\)/g, '.pop()')
        .replace(/\.slice\((.*?)\)/g, '[$1]')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/null/g, 'None')
        .replace(/undefined/g, 'None')
        .split('\n')
        .map(line => {
          const match = line.match(/^(\s*)/);
          const indent = match ? match[1] : '';
          if (line.trim() && !line.trim().startsWith('#')) {
            return indent + line.trim();
          }
          return line;
        })
        .join('\n');
      return result;
    },

    jsToTypeScript(code) {
      let result = code
        .replace(/const\s+(\w+)\s*=/g, 'const $1: any =')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'function $1($2): any {');
      
      // Add interface for object-like patterns
      if (code.includes('class ') || code.includes('{')) {
        result = 'interface Config {\n  [key: string]: any;\n}\n\n' + result;
      }https://github.com/Kaustubh0726/Clarity-AI/pull/1/conflict?name=app.js&ancestor_oid=db740cfce1526f4b6965a245f6153b5a96820fac&base_oid=b2d7c5d022d58501c4348bb1b458476f5681c59c&head_oid=5aa73c457d9ccd40f30d7e61b73d24cfdc762aef
      return result;
    },

    jsToJava(code) {
      let className = 'MyClass';
      const classMatch = code.match(/class\s+(\w+)/);
      if (classMatch) className = classMatch[1];

      let result = `public class ${className} {\n`;
      result += code
        .replace(/const\s+(\w+)\s*=\s*async\s*\((.*?)\)\s*=>\s*\{/g, 'public async List<Object> $1($2) throws Exception {')
        .replace(/const\s+(\w+)\s*=\s*\((.*?)\)\s*=>\s*\{/g, 'public Object $1($2) {')
        .replace(/async\s+function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'public void $1($2) throws Exception {')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'public void $1($2) {')
        .replace(/console\.log\((.*?)\)/g, 'System.out.println($1)')
        .replace(/return\s+(.*?);/g, 'return $1;')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'null')
        .replace(/const\s+(\w+)\s*=/g, 'Object $1 =')
        .split('\n')
        .map(line => '  ' + line)
        .join('\n');
      result += '\n}';
      return result;
    },

    jsToGo(code) {
      let result = 'package main\n\nimport "fmt"\n\n';
      result += code
        .replace(/const\s+(\w+)\s*=\s*\((.*?)\)\s*=>\s*\{/g, 'func $1($2) interface{} {')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'func $1($2) {')
        .replace(/console\.log\((.*?)\)/g, 'fmt.Println($1)')
        .replace(/return\s+(.*?);/g, 'return $1')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'nil')
        .replace(/const\s+(\w+)\s*=/g, '$1 :=')
        .replace(/;/g, '');
      return result;
    },

    jsToRust(code) {
      let result = 'fn main() {\n';
      result += code
        .replace(/const\s+(\w+)\s*=\s*\((.*?)\)\s*=>\s*\{/g, 'fn $1($2) {')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'fn $1($2) {')
        .replace(/console\.log\((.*?)\)/g, 'println!("{}",  $1)')
        .replace(/let\s+(\w+)\s*=/g, 'let $1 =')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'None')
        .split('\n')
        .map(line => '    ' + line)
        .join('\n');
      result += '\n}';
      return result;
    },

    jsToCpp(code) {
      let result = '#include <iostream>\nusing namespace std;\n\nint main() {\n';
      result += code
        .replace(/const\s+(\w+)\s*=\s*\((.*?)\)\s*=>\s*\{/g, 'auto $1 = [$2]() {')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'void $1($2) {')
        .replace(/console\.log\((.*?)\)/g, 'cout << $1 << endl')
        .replace(/return\s+(.*?);/g, 'return $1;')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'nullptr')
        .split('\n')
        .map(line => '    ' + line)
        .join('\n');
      result += '\n    return 0;\n}';
      return result;
    },

    jsToPhp(code) {
      let result = '<?php\n\n';
      result += code
        .replace(/const\s+(\w+)\s*=/g, '$$1 =')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'function $1($2) {')
        .replace(/console\.log\((.*?)\)/g, 'echo $1')
        .replace(/return\s+(.*?);/g, 'return $1;')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'null')
        .replace(/;/g, ';')
        .split('\n')
        .join('\n');
      result += '\n?>';
      return result;
    },

    jsToRuby(code) {
      let result = code
        .replace(/const\s+(\w+)\s*=/g, '$1 =')
        .replace(/let\s+(\w+)\s*=/g, '$1 =')
        .replace(/function\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $1($2)')
        .replace(/\s*\}/g, 'end')
        .replace(/console\.log\((.*?)\)/g, 'puts $1')
        .replace(/return\s+(.*?);/g, 'return $1')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'nil')
        .replace(/;/g, '');
      return result;
    },

    // ─── Python Conversions ────────────────────────────
    pythonToJs(code) {
      let result = code
        .replace(/^def\s+(\w+)\s*\((.*?)\):/gm, 'function $1($2) {')
        .replace(/^(\w+)\s*=/gm, 'const $1 =')
        .replace(/print\((.*?)\)/g, 'console.log($1)')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'null')
        .replace(/\s+#/g, ' //')
        .split('\n')
        .map((line, i) => {
          if (line.trim() && line.trim() !== 'end') return line.replace(/:\s*$/, ' {');
          return line;
        })
        .join('\n');
      return result + '}';
    },

    pythonToJava(code) {
      let result = 'public class PythonClass {\n';
      result += code
        .replace(/^def\s+(\w+)\s*\((.*?)\):/gm, '  public void $1($2) {')
        .replace(/^(\w+)\s*=/gm, '  Object $1 =')
        .replace(/print\((.*?)\)/g, 'System.out.println($1)')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'null')
        .replace(/\s+#/g, ' //')
        .split('\n')
        .map(line => line.trim() ? line : '')
        .filter(line => line)
        .join('\n  ');
      result += '\n}';
      return result;
    },

    pythonToGo(code) {
      let result = 'package main\n\nimport "fmt"\n\n';
      result += code
        .replace(/^def\s+(\w+)\s*\((.*?)\):/gm, 'func $1($2) {')
        .replace(/^(\w+)\s*=/gm, '$1 :=')
        .replace(/print\((.*?)\)/g, 'fmt.Println($1)')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'nil')
        .replace(/\s+#/g, ' //');
      return result;
    },

    pythonToRust(code) {
      let result = 'fn main() {\n';
      result += code
        .replace(/^def\s+(\w+)\s*\((.*?)\):/gm, 'fn $1($2) {')
        .replace(/^(\w+)\s*=/gm, 'let $1 =')
        .replace(/print\((.*?)\)/g, 'println!("{}",  $1)')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'None')
        .split('\n')
        .map(line => '    ' + line)
        .join('\n');
      result += '\n}';
      return result;
    },

    pythonToCpp(code) {
      let result = '#include <iostream>\nusing namespace std;\n\nint main() {\n';
      result += code
        .replace(/^def\s+(\w+)\s*\((.*?)\):/gm, 'void $1($2) {')
        .replace(/^(\w+)\s*=/gm, 'auto $1 =')
        .replace(/print\((.*?)\)/g, 'cout << $1 << endl')
        .replace(/True/g, 'true')
        .replace(/False/g, 'false')
        .replace(/None/g, 'nullptr')
        .split('\n')
        .map(line => '    ' + line)
        .join('\n');
      result += '\n    return 0;\n}';
      return result;
    },

    // ─── Java Conversions ───────────────────────────────
    javaToJs(code) {
      let result = code
        .replace(/public\s+(void|Object|String|List)\s+(\w+)\s*\((.*?)\)\s*\{/g, 'function $2($3) {')
        .replace(/Object\s+(\w+)\s*=/g, 'const $1 =')
        .replace(/System\.out\.println\((.*?)\)/g, 'console.log($1)')
        .replace(/return\s+(.*?);/g, 'return $1;')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'null')
        .replace(/class\s+\w+\s*\{/g, '');
      return result;
    },

    javaToPython(code) {
      let result = code
        .replace(/public\s+(void|Object)\s+(\w+)\s*\((.*?)\)\s*\{/g, 'def $2($3):')
        .replace(/Object\s+(\w+)\s*=/g, '$1 =')
        .replace(/System\.out\.println\((.*?)\)/g, 'print($1)')
        .replace(/return\s+(.*?);/g, 'return $1')
        .replace(/true/g, 'True')
        .replace(/false/g, 'False')
        .replace(/null/g, 'None')
        .replace(/class\s+\w+\s*\{/g, '')
        .replace(/\}/g, '');
      return result;
    },

    javaToGo(code) {
      let result = 'package main\n\nimport "fmt"\n\n';
      result += code
        .replace(/public\s+(void|Object)\s+(\w+)\s*\((.*?)\)\s*\{/g, 'func $2($3) {')
        .replace(/Object\s+(\w+)\s*=/g, '$1 :=')
        .replace(/System\.out\.println\((.*?)\)/g, 'fmt.Println($1)')
        .replace(/return\s+(.*?);/g, 'return $1')
        .replace(/true/g, 'true')
        .replace(/false/g, 'false')
        .replace(/null/g, 'nil')
        .replace(/class\s+\w+\s*\{/g, '');
      return result;
    },

    javaToCpp(code) {
      let result = '#include <iostream>\nusing namespace std;\n\n';
      result += code
        .replace(/public\s+(void|Object)\s+(\w+)\s*\((.*?)\)\s*\{/g, 'void $2($3) {')
        .replace(/Object\s+(\w+)\s*=/g, 'auto $1 =')
        .replace(/System\.out\.println\((.*?)\)/g, 'cout << $1 << endl')
        .replace(/return\s+(.*?);/g, 'return $1;')
        .replace(/class\s+\w+\s*\{/g, '');
      return result;
    },

    javaToRust(code) {
      let result = 'fn main() {\n';
      result += code
        .replace(/public\s+(void|Object)\s+(\w+)\s*\((.*?)\)\s*\{/g, 'fn $2($3) {')
        .replace(/Object\s+(\w+)\s*=/g, 'let $1 =')
        .replace(/System\.out\.println\((.*?)\)/g, 'println!("{}",  $1)')
        .replace(/return\s+(.*?);/g, 'return $1')
        .replace(/class\s+\w+\s*\{/g, '')
        .split('\n')
        .map(line => '    ' + line)
        .join('\n');
      result += '\n}';
      return result;
    }
  };

  // ─── STATE ────────────────────────────────────────────
  const state = {
    currentScenario: 'research',
    currentView: 'chat',
    lensActive: true,
    expandedCards: new Set(),
    expandedAnnotations: new Set(),
    dashboardRendered: false,
    isCustomChat: false,
    customMessages: [],
    apiMode: 'simulator',
    apiKey: '',
    isGenerating: false,
    pendingCopyContent: null,
    copyGateConfirmed: false,
    sessionStats: {
      lensToggles: 0,
      cardExpansions: 0,
      segmentsClicked: 0,
      customSessions: 0
    }
  };

  // ─── DOM REFERENCES ───────────────────────────────────
  const dom = {
    onboarding: document.getElementById('onboarding-overlay'),
    onboardingBtn: document.getElementById('onboarding-start'),
    chatMessages: document.getElementById('chat-messages'),
    chatView: document.getElementById('chat-view'),
    dashboardView: document.getElementById('dashboard-view'),
    lensMode: document.getElementById('lens-mode'),
    lensControl: document.getElementById('reasoning-lens-control'),
    lensLegend: document.getElementById('lens-legend'),
    convTitle: document.getElementById('conversation-title'),
    convSubtitle: document.getElementById('conversation-subtitle'),
    navChat: document.getElementById('nav-chat'),
    navDashboard: document.getElementById('nav-dashboard'),
    scenarioButtons: document.querySelectorAll('.scenario-btn'),
    navButtons: document.querySelectorAll('.nav-btn'),
    chatInput: document.getElementById('chat-input'),
    sendBtn: document.getElementById('send-btn'),
    apiSettingsBtn: document.getElementById('api-settings-btn'),
    apiModal: document.getElementById('api-modal'),
    modalClose: document.getElementById('modal-close'),
    modalSave: document.getElementById('modal-save'),
    modelName: document.getElementById('model-name'),
    apiKeyInput: document.getElementById('api-key-input'),
    toggleKeyVis: document.getElementById('toggle-key-vis'),
    apiStatusDot: document.getElementById('api-status-dot'),
    apiStatusText: document.getElementById('api-status-text'),
    avrMeter: document.getElementById('avr-meter'),
    avrValue: document.getElementById('avr-value'),
    copyGateModal: document.getElementById('copy-gate-modal'),
    copyGateClose: document.getElementById('copy-gate-close'),
    copyGateCancel: document.getElementById('copy-gate-cancel'),
    copyGateConfirm: document.getElementById('copy-gate-confirm'),
    gateConfirmAvr: document.getElementById('gate-confirm-avr'),
    gateConfirmReview: document.getElementById('gate-confirm-review'),
    copyGateAvrValue: document.getElementById('copy-gate-avr-value')
  };

  // ─── UTILITIES ────────────────────────────────────────
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
  function randomBetween(a, b) { return Math.floor(Math.random() * (b - a)) + a; }
  function getCSS(prop) {
    return getComputedStyle(document.documentElement).getPropertyValue(prop).trim();
  }
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ─── ONBOARDING ───────────────────────────────────────
  dom.onboardingBtn.addEventListener('click', () => {
    dom.onboarding.classList.add('hidden');
    setTimeout(() => { dom.onboarding.style.display = 'none'; }, 500);
  });

  // ─── AUTO-ACTIVATE REASONING LENS ON LOAD ─────────────
  window.addEventListener('DOMContentLoaded', () => {
    // Set Reasoning Lens dropdown to 'full' and UI to active
    if (dom.lensMode) dom.lensMode.value = 'full';
    if (dom.lensControl) dom.lensControl.classList.add('active', 'lens-animate');
    if (dom.lensLegend) dom.lensLegend.classList.add('visible');
    if (dom.chatMessages) dom.chatMessages.classList.add('lens-active');
    // Remove animation class after animation ends
    if (dom.lensControl) {
      dom.lensControl.addEventListener('animationend', () => {
        dom.lensControl.classList.remove('lens-animate');
      }, { once: true });
    }
  });
  // ─── VIEW SWITCHING ──────────────────────────────────
  function switchView(view) {
    state.currentView = view;
    dom.chatView.classList.toggle('active', view === 'chat');
    dom.dashboardView.classList.toggle('active', view === 'dashboard');
    dom.navButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });
    document.getElementById('demo-scenarios').style.display = view === 'chat' ? 'flex' : 'none';

    if (view === 'dashboard') {
      renderDashboard();
    }
  }

  dom.navButtons.forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // ─── SCENARIO SWITCHING ──────────────────────────────
  function switchScenario(scenario) {
    state.currentScenario = scenario;
    state.expandedCards.clear();
    state.expandedAnnotations.clear();

    dom.scenarioButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.scenario === scenario);
    });

    if (scenario === 'custom') {
      state.isCustomChat = true;
      state.customMessages = []; // Always clear on fresh switch
      dom.convTitle.textContent = 'Custom Chat';
      dom.convSubtitle.textContent = 'Type any prompt to see Clarity in action';
      renderCustomChat();
    } else {
      state.isCustomChat = false;
      const conv = conversations[scenario];
      dom.convTitle.textContent = conv.title;
      dom.convSubtitle.textContent = conv.subtitle;
      renderConversation();
    }
  }

  dom.scenarioButtons.forEach(btn => {
    btn.addEventListener('click', () => switchScenario(btn.dataset.scenario));
  });

  // ─── REASONING LENS MODE SELECTOR ──────────────────────
  function updateAVRMeter() {
    const checkedBoxes = Object.values(state.checklistState).filter(v => v).length;
    const totalBoxes = Object.keys(state.checklistState).length || 1;
    state.avrScore = Math.round((checkedBoxes / totalBoxes) * 100);
    
    dom.avrValue.textContent = state.avrScore + '%';
    const avrFill = dom.avrMeter.querySelector('.avr-fill');
    avrFill.style.width = state.avrScore + '%';
    
    // Update color range attribute for HSL glow
    const container = dom.avrMeter.closest('.avr-meter-container');
    if (state.avrScore < 35) {
      container.dataset.avrRange = 'low';
    } else if (state.avrScore < 70) {
      container.dataset.avrRange = 'mid';
    } else {
      container.dataset.avrRange = 'high';
    }
  }

if (dom.lensMode) {
  dom.lensMode.addEventListener('change', (e) => {
    state.lensMode = e.target.value;
    const isActive = state.lensMode !== 'off';
    state.lensActive = isActive;
    dom.lensControl.classList.toggle('active', isActive);
    dom.lensLegend.classList.toggle('visible', isActive);
    dom.chatMessages.classList.toggle('lens-active', isActive);
    state.sessionStats.lensToggles++;
    
    // Re-render current view to apply lens mode
    if (state.isCustomChat) {
      renderCustomChat();
    } else {
      renderConversation();
    }
  });
}

  // ─── CONVERSATION RENDERING (Demo Scenarios) ────────
  function renderConversation() {
    const conv = conversations[state.currentScenario];
    if (!conv) return;

    dom.chatMessages.innerHTML = '';

    conv.messages.forEach((msg) => {
      if (msg.role === 'user') {
        renderUserMessage(msg);
      } else {
        renderAssistantMessage(msg);
      }
    });

    dom.chatMessages.scrollTop = 0;
    dom.chatMessages.classList.toggle('lens-active', state.lensActive);
  }

  function renderCustomChat() {
    dom.chatMessages.innerHTML = '';

    if (state.customMessages.length === 0) {
      dom.chatMessages.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">◈</div>
          <h2>Start a Conversation</h2>
          <p>Type any prompt below — ask about research, request code, draft an email, or explore a business strategy.</p>
          <p class="empty-state-sub">Clarity will analyze the response and scaffold your evaluation with the Reasoning Lens, Clarity Card, and contextual nudges.</p>
        </div>
      `;
      return;
    }

    state.customMessages.forEach(msg => {
      if (msg.role === 'user') {
        renderUserMessage(msg);
      } else {
        renderAssistantMessage(msg);
      }
    });

    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
    dom.chatMessages.classList.toggle('lens-active', state.lensActive);
  }

  function renderUserMessage(msg) {
    const el = document.createElement('div');
    el.className = 'message user-message';
    el.innerHTML = `
      <div class="message-avatar">You</div>
      <div class="message-content">${escapeHtml(msg.content)}</div>
    `;
    dom.chatMessages.appendChild(el);
  }

  function renderAssistantMessage(msg) {
    const el = document.createElement('div');
    el.className = 'message assistant-message';

    // Build the main response HTML (the actual answer)
    const mainResponseHTML = msg.mainResponse ? `<div class="main-response">${msg.mainResponse}</div>` : '';

    // Calculate validation score
    // Priority 1: Use AI model's self-assessment (hallucination judge)
    // Priority 2: Fall back to hardcoded heuristics if judge report not available
    let validationScore = extractJudgeConfidenceScore(msg);
    if (validationScore === null) {
      // Fallback to hardcoded validation if model didn't provide judge report
      validationScore = calculateValidationScore(msg.mainResponse, msg.segments || []);
    }
    
    // Get judge report details if available (for debugging/future use)
    const judgeDetails = getJudgeReportDetails(msg);
    
    const confidenceBadgeHTML = renderConfidenceBadge(validationScore);

    // Build Clarity evaluation segments
    let segmentsHTML = '';
    const nudgeMap = {};
    if (msg.nudges) {
      msg.nudges.forEach(n => { nudgeMap[n.afterSegment] = n; });
    }

    if (msg.segments && msg.segments.length > 0) {
      msg.segments.forEach(seg => {
        segmentsHTML += renderSegment(seg);
        if (nudgeMap[seg.id]) {
          segmentsHTML += renderNudge(nudgeMap[seg.id]);
        }
      });
    }

    const referencesHTML = msg.references ? renderReferences(msg.references) : '';
    const clarityCardHTML = msg.clarityCard ? renderClarityCard(msg.clarityCard) : '';

    // Build the Clarity evaluation section (only if segments exist)
    const hasEvaluation = segmentsHTML || referencesHTML || clarityCardHTML;
    const evaluationHTML = hasEvaluation ? `
      <div class="clarity-evaluation-section">
        <div class="clarity-eval-divider">
          <span class="clarity-eval-divider-line"></span>
          <span class="clarity-eval-divider-label">◈ Clarity Evaluation</span>
          <span class="clarity-eval-divider-line"></span>
        </div>
        ${confidenceBadgeHTML}
        ${segmentsHTML}
        ${referencesHTML}
        ${clarityCardHTML}
      </div>
    ` : '';

    el.innerHTML = `
      <div class="message-avatar">◈</div>
      <div class="message-content">
        ${mainResponseHTML}
        ${evaluationHTML}
      </div>
    `;

    dom.chatMessages.appendChild(el);

    // Attach language selectors to code blocks
    attachLanguageSelectors(el);

    // Attach segment click handlers
    el.querySelectorAll('.segment[data-type]').forEach(segEl => {
      segEl.addEventListener('click', () => {
        const panel = segEl.querySelector('.annotation-panel');
        if (panel && state.lensActive) {
          panel.classList.toggle('visible');
          state.sessionStats.segmentsClicked++;
        }
      });
    });

    // Attach clarity card toggle
    const cardHeader = el.querySelector('.clarity-card-header');
    if (cardHeader) {
      cardHeader.addEventListener('click', () => {
        const card = cardHeader.closest('.clarity-card');
        card.classList.toggle('expanded');
        state.sessionStats.cardExpansions++;
      });
    }
  }

  // ─── ATTACH LANGUAGE SELECTOR TO CODE BLOCKS ──────────
  function attachLanguageSelectors(container) {
    const codeBlocks = container.querySelectorAll('pre code');
    codeBlocks.forEach((block, index) => {
      const pre = block.parentElement;
      if (!pre || pre.classList.contains('has-language-selector')) return;
      pre.classList.add('has-language-selector');

      // Extract current language
      const langMatch = block.className.match(/language-(\w+)/);
      const currentLang = langMatch ? langMatch[1] : 'javascript';

      // Create language selector UI
      const selectorHTML = `
        <div class="language-selector">
          <button class="language-selector-btn" data-code-block="${index}">
            <span class="lang-name">${SUPPORTED_LANGUAGES[currentLang]?.name || capitalize(currentLang)}</span>
            <span class="lang-arrow">⋯</span>
          </button>
          <div class="language-dropdown" id="lang-dropdown-${index}" style="display: none;">
            ${Object.entries(SUPPORTED_LANGUAGES)
              .map(([key, lang]) => `
              <button class="language-option ${key === currentLang ? 'active' : ''}" 
                      data-code-block="${index}" 
                      data-target-lang="${key}" 
                      title="${lang.name}">
                <span class="lang-icon">${lang.icon}</span>
                <span class="lang-text">${lang.name}</span>
              </button>
            `)
              .join('')}
          </div>
        </div>
      `;

      // Insert selector before code block
      pre.insertAdjacentHTML('beforebegin', selectorHTML);

      // Store code block reference for transpilation
      block.dataset.codeBlockIndex = index;
      block.dataset.originalCode = block.textContent;
      block.dataset.currentLanguage = currentLang;
    });

    // Attach event listeners for language switching
    const selectors = container.querySelectorAll('.language-selector-btn');
    selectors.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = btn.dataset.codeBlock;
        const dropdown = document.getElementById(`lang-dropdown-${index}`);
        const isOpen = dropdown.style.display !== 'none';
        
        // Close all other dropdowns
        container.querySelectorAll('.language-dropdown').forEach(dd => {
          dd.style.display = 'none';
        });
        
        // Toggle current dropdown
        dropdown.style.display = isOpen ? 'none' : 'block';
      });
    });

    // Language option selection
    const options = container.querySelectorAll('.language-option');
    options.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const codeBlockIndex = option.dataset.codeBlock;
        const targetLang = option.dataset.targetLang;
        switchCodeLanguage(codeBlockIndex, targetLang, container);
        
        // Close dropdown
        const dropdown = document.getElementById(`lang-dropdown-${codeBlockIndex}`);
        dropdown.style.display = 'none';
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
      container.querySelectorAll('.language-dropdown').forEach(dd => {
        dd.style.display = 'none';
      });
    });
  }

  function switchCodeLanguage(codeBlockIndex, targetLang, container) {
    const codeBlocks = container.querySelectorAll('pre code');
    const codeBlock = codeBlocks[codeBlockIndex];
    if (!codeBlock) return;

    const currentLang = codeBlock.dataset.currentLanguage || 'javascript';
    const originalCode = codeBlock.dataset.originalCode;

    // Show loading state
    const pre = codeBlock.parentElement;
    const selector = pre.previousElementSibling;
    const btn = selector.querySelector('.language-selector-btn');
    const btnContent = btn.innerHTML;
    btn.innerHTML = '<span class="loading-spinner">⟳</span> Converting...';
    btn.disabled = true;

    // Perform transpilation with delay for visual feedback
    setTimeout(() => {
      try {
        const transpiledCode = codeTranspiler.transpile(originalCode, currentLang, targetLang);
        codeBlock.textContent = transpiledCode;
        codeBlock.className = `language-${targetLang}`;
        codeBlock.dataset.currentLanguage = targetLang;

        // Update selector button
        btn.innerHTML = `<span class="lang-name">${SUPPORTED_LANGUAGES[targetLang].name}</span><span class="lang-arrow">⋯</span>`;
        btn.disabled = false;

        // Update active state in dropdown
        const dropdown = selector.nextElementSibling;
        dropdown.querySelectorAll('.language-option').forEach(opt => {
          opt.classList.toggle('active', opt.dataset.targetLang === targetLang);
        });

        // Show success toast
        showToast(`✓ Converted to ${SUPPORTED_LANGUAGES[targetLang].name}`, 'success');
      } catch (error) {
        console.error('[v0] Transpilation error:', error);
        btn.innerHTML = btnContent;
        btn.disabled = false;
        showToast(`⚠️ Conversion to ${SUPPORTED_LANGUAGES[targetLang].name} failed`, 'warning');
      }
    }, 500);
  }

  // ═══════════════════════════════════════════════════════
  // SEMANTIC VALIDATION & CONFIDENCE SCORING ENGINE
  // Validates response sentences against context/documentation
  // ═══════════════════════════════════════════════════════
  // AI-POWERED HALLUCINATION DETECTION
  // Parses the model's self-evaluation judge report
  // ═══════════════════════════════════════════════════════

  /**
   * Extract confidence score from hallucination judge report
   * Model provides its own accuracy assessment in JSON response
   * @param {object} msg - Message object with parsed JSON from model
   * @returns {number} Confidence score 0-100, or null if not present
   */
  function extractJudgeConfidenceScore(msg) {
    try {
      if (msg && msg.hallucination_judge_report && typeof msg.hallucination_judge_report.confidence_score === 'number') {
        const score = msg.hallucination_judge_report.confidence_score;
        return Math.max(0, Math.min(100, Math.round(score))); // Clamp 0-100
      }
    } catch (e) {
      // If parsing fails, return null to use fallback
      return null;
    }
    return null;
  }

  /**
   * Get judge report details for logging/debugging
   * @param {object} msg - Message object
   * @returns {object} Judge report details or null
   */
  function getJudgeReportDetails(msg) {
    try {
      if (msg && msg.hallucination_judge_report) {
        return {
          confidence: msg.hallucination_judge_report.confidence_score,
          risk: msg.hallucination_judge_report.hallucination_risk,
          grounded: msg.hallucination_judge_report.grounded_claims,
          inferred: msg.hallucination_judge_report.inferred_claims,
          unverified: msg.hallucination_judge_report.unverified_claims,
          hallucinations: msg.hallucination_judge_report.key_hallucinations,
          reasoning: msg.hallucination_judge_report.reasoning
        };
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  // ═══════════════════════════════════════════════════════
  // FALLBACK VALIDATION (used if judge report not available)
  // ═══════════════════════════════════════════════════════
  function splitIntoSentences(text) {
    if (!text || typeof text !== 'string') return [];
    
    // Remove HTML tags for sentence splitting
    const plainText = text.replace(/<[^>]*>/g, ' ');
    
    // Split on sentence boundaries but keep them
    const sentences = plainText
      .split(/(?<=[.!?])\s+(?=[A-Z])|(?<=[.!?])\s*$/g)
      .filter(s => s.trim().length > 0)
      .map(s => s.trim());
    
    return sentences;
  }

  /**
   * Judge function: Validates if a sentence is grounded in context
   * Analyzes segments to determine if sentence is well-grounded
   * @param {string} sentence - Sentence to validate
   * @param {Array} segments - Response segments with types (grounded/inferred/uncertain)
   * @returns {boolean} Whether sentence is grounded
   */
  function judgeSemanticValidity(sentence, segments = []) {
    if (!sentence || sentence.length < 3) return false;

    const sentenceLower = sentence.toLowerCase();
    let groundedCount = 0;
    let totalSegments = 0;

    // Check which segments contain parts of this sentence
    segments.forEach(seg => {
      if (seg.content) {
        const segContent = seg.content.toLowerCase();
        
        // Check if sentence content overlaps with segment
        const words = sentenceLower.split(/\s+/).filter(w => w.length > 3);
        const wordMatches = words.filter(w => segContent.includes(w)).length;
        
        if (wordMatches > 0) {
          totalSegments++;
          // Grounded segments validate the sentence
          if (seg.type === 'grounded') {
            groundedCount += wordMatches;
          }
          // Inferred segments are partially valid
          else if (seg.type === 'inferred') {
            groundedCount += wordMatches * 0.5;
          }
          // Uncertain/subjective segments don't contribute
        }
      }
    });

    // If we have matching segments, use their grounding
    if (totalSegments > 0) {
      return groundedCount > 0;
    }

    // Fallback: Check for confidence indicators in sentence
    const uncertainWords = ['may', 'might', 'could', 'possibly', 'reportedly', 'allegedly', 'suggest', 'appear'];
    const certainWords = ['clearly', 'definitely', 'prove', 'demonstrated', 'verified', 'confirmed', 'established'];
    
    const hasUncertainty = uncertainWords.some(w => sentenceLower.includes(w));
    const hasCertainty = certainWords.some(w => sentenceLower.includes(w));

    return hasCertainty || !hasUncertainty;
  }

  /**
   * Calculate semantic validation score
   * @param {string} mainResponse - Main response text
   * @param {Array} segments - Response segments
   * @returns {number} Validation score 0-100
   */
  function calculateValidationScore(mainResponse = '', segments = []) {
    if (!mainResponse || mainResponse.length < 10) return 0;

    const sentences = splitIntoSentences(mainResponse);
    if (sentences.length === 0) return 0;

    const validSentences = sentences.filter(sentence => {
      return judgeSemanticValidity(sentence, segments);
    });

    const score = Math.round((validSentences.length / sentences.length) * 100);
    return Math.max(0, Math.min(100, score)); // Clamp 0-100
  }

  /**
   * Determine confidence badge type based on score
   * @param {number} score - Validation score 0-100
   * @returns {object} Badge configuration
   */
  function getConfidenceBadge(score) {
    if (score >= 80) {
      return {
        level: 'high',
        color: '#34D399',
        bgColor: 'rgba(52, 211, 153, 0.1)',
        icon: '✓',
        text: `Highly Verified`,
        subtitle: `${score}% grounded in documentation`,
        ariaLabel: `Confidence score: ${score}% - Highly verified`
      };
    } else if (score >= 40) {
      return {
        level: 'medium',
        color: '#FBBF24',
        bgColor: 'rgba(251, 191, 36, 0.1)',
        icon: '◐',
        text: `Partially AI-Generated`,
        subtitle: `${score}% grounded in documentation`,
        ariaLabel: `Confidence score: ${score}% - Partially verified`
      };
    } else {
      return {
        level: 'low',
        color: '#F87171',
        bgColor: 'rgba(248, 113, 113, 0.1)',
        icon: '⚠',
        text: `Low Verification`,
        subtitle: `${score}% grounded — Please verify with official support`,
        ariaLabel: `Confidence score: ${score}% - Low verification required`
      };
    }
  }

  /**
   * Render confidence badge component
   * @param {number} score - Validation score
   * @returns {string} HTML for badge
   */
  function renderConfidenceBadge(score) {
    const badge = getConfidenceBadge(score);
    
    return `
      <div class="confidence-badge confidence-badge-${badge.level}" 
           style="border-color: ${badge.color}; background-color: ${badge.bgColor};"
           role="status"
           aria-label="${badge.ariaLabel}">
        <div class="badge-icon" style="color: ${badge.color};">${badge.icon}</div>
        <div class="badge-content">
          <div class="badge-label" style="color: ${badge.color};">${badge.text}</div>
          <div class="badge-subtitle">${badge.subtitle}</div>
        </div>
        <div class="badge-score" style="background-color: ${badge.color}; color: white;">
          ${score}%
        </div>
      </div>
    `;
  }

  function renderSegment(seg) {
    const typeInfo = CONFIDENCE_TYPES[seg.type];
    
    // In Quiet mode, filter out uncertain/inferred segments
    if (state.lensMode === 'quiet' && (seg.type === 'uncertain' || seg.type === 'inferred')) {
      return ''; // Hide these segments in quiet mode
    }
    
    const annotationHTML = seg.annotation ? `
      <div class="annotation-panel">
        <div class="annotation-row">
          <span class="annotation-label">Reasoning</span>
          <span class="annotation-value">${seg.annotation.reasoning}</span>
        </div>
        <div class="annotation-row">
          <span class="annotation-label">Evidence</span>
          <span class="annotation-value">${seg.annotation.evidence}</span>
        </div>
        <div class="annotation-row">
          <span class="annotation-label">Counterpoint</span>
          <span class="annotation-value">${seg.annotation.counterpoint}</span>
        </div>
      </div>
    ` : '';

    return `
      <div class="segment" data-type="${seg.type}" data-id="${seg.id}">
        <div class="segment-badge">
          <span>${typeInfo.icon}</span>
          <span>${typeInfo.label}</span>
        </div>
        ${seg.content}
        ${annotationHTML}
      </div>
    `;
  }

  function renderNudge(nudge) {
    return `
      <div class="evaluation-nudge">
        <span class="nudge-icon">💡</span>
        <div class="nudge-content">
          <span class="nudge-label">Evaluation Nudge</span>
          ${nudge.content}
        </div>
      </div>
    `;
  }

  function renderReferences(refs) {
    if (!refs || refs.length === 0) return '';
    const items = refs.map(ref => `
      <div class="reference-item">
        <span class="ref-icon">🔗</span>
        <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="ref-link">
          <span class="ref-title">${ref.title}</span>
          ${ref.verified ? '<span class="ref-verified" title="Verified Resource">✓ Verified</span>' : ''}
        </a>
      </div>
    `).join('');
    return `
      <div class="references-section">
        <h4 class="references-title">Verified Sources & References</h4>
        <div class="references-list">${items}</div>
      </div>
    `;
  }

  function renderClarityCard(card) {
    const completenessRatingClass = card.completeness.rating.toLowerCase().includes('strong') || card.completeness.rating.toLowerCase().includes('complete') ? 'rating-strong' :
      card.completeness.rating.toLowerCase().includes('partial') || card.completeness.rating.toLowerCase().includes('core') ? 'rating-partial' : 'rating-mixed';
    const reasoningRatingClass = card.reasoning.rating.toLowerCase().includes('strong') ? 'rating-strong' :
      card.reasoning.rating.toLowerCase().includes('mixed') ? 'rating-mixed' : 'rating-partial';

    const assumptionsList = card.assumptions.map(a =>
      `<li><span class="clarity-list-icon">→</span>${a}</li>`
    ).join('');

    const risksList = card.risks.map(r =>
      `<li><span class="clarity-list-icon">⚠</span>${r}</li>`
    ).join('');

    const alternativesList = card.alternatives.map(a =>
      `<li><span class="clarity-list-icon">◇</span>${a}</li>`
    ).join('');

    const verificationList = card.verification.map(v =>
      `<li><span class="clarity-list-icon">☐</span>${v}</li>`
    ).join('');

    return `
      <div class="clarity-card">
        <div class="clarity-card-header">
          <div class="clarity-card-title">
            <span class="clarity-card-icon">◈</span>
            <span class="clarity-card-text">Clarity Card</span>
            <span class="clarity-card-hint">Clarity AI's self-assessment of this response</span>
          </div>
          <span class="clarity-card-chevron">▾</span>
        </div>
        <div class="clarity-card-body">
          <div class="clarity-dimension">
            <div class="clarity-dim-header">
              <span class="clarity-dim-label">Completeness</span>
              <span class="clarity-dim-rating ${completenessRatingClass}">${card.completeness.icon} ${card.completeness.rating}</span>
            </div>
            <p class="clarity-dim-detail">${card.completeness.detail}</p>
          </div>

          <div class="clarity-dimension">
            <div class="clarity-dim-header">
              <span class="clarity-dim-label">Reasoning Quality</span>
              <span class="clarity-dim-rating ${reasoningRatingClass}">${card.reasoning.icon} ${card.reasoning.rating}</span>
            </div>
            <p class="clarity-dim-detail">${card.reasoning.detail}</p>
          </div>

          <div class="clarity-dimension">
            <div class="clarity-dim-header">
              <span class="clarity-dim-label">Key Assumptions</span>
            </div>
            <ul class="clarity-list">${assumptionsList}</ul>
          </div>

          <div class="clarity-dimension">
            <div class="clarity-dim-header">
              <span class="clarity-dim-label">What Might Be Wrong</span>
            </div>
            <ul class="clarity-list">${risksList}</ul>
          </div>

          <div class="clarity-dimension">
            <div class="clarity-dim-header">
              <span class="clarity-dim-label">Alternative Perspectives</span>
            </div>
            <ul class="clarity-list">${alternativesList}</ul>
          </div>

          <div class="clarity-dimension">
            <div class="clarity-dim-header">
              <span class="clarity-dim-label">Suggested Verification</span>
            </div>
            <ul class="clarity-list">${verificationList}</ul>
          </div>
        </div>
      </div>
    `;
  }

  // ─── DYNAMIC CHAT INPUT ──────────────────────────────
  function initChatInput() {
    const textarea = dom.chatInput;
    const sendBtn = dom.sendBtn;

    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
      sendBtn.classList.toggle('active', textarea.value.trim().length > 0);
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    });

    sendBtn.addEventListener('click', handleSendMessage);
  }

  async function handleSendMessage() {
    const text = dom.chatInput.value.trim();
    if (!text || state.isGenerating) return;

    state.isGenerating = true;

    // Switch to custom chat if not already
    if (!state.isCustomChat) {
      state.isCustomChat = true;
      state.currentScenario = 'custom';
      dom.scenarioButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.scenario === 'custom');
      });
      dom.convTitle.textContent = 'Custom Chat';
      dom.convSubtitle.textContent = 'Live conversation with Clarity evaluation';
    }

    // Remove empty state if present
    const emptyState = dom.chatMessages.querySelector('.empty-state');
    if (emptyState) emptyState.remove();

    // Append user message
    appendUserMessageDynamic(text);

    // Clear input
    dom.chatInput.value = '';
    dom.chatInput.style.height = 'auto';
    dom.sendBtn.classList.remove('active');

    // Show typing indicator
    showTypingIndicator();

    let response;
    let usedSimulatorFallback = false;
    try {
      if (state.apiMode === 'api' && state.apiKey) {
        console.log('[Clarity] Calling Gemini API...');
        response = await generateGeminiResponse(text);
        console.log('[Clarity] API response received:', response);
      } else {
        console.log('[Clarity] Using simulator mode');
        response = await generateSimulatorResponse(text);
        if (state.apiMode === 'api') usedSimulatorFallback = true;
      }
    } catch (err) {
      console.error('[Clarity] API failed after all retries:', err);
      showToast('⚠️ API unavailable (quota exceeded) — showing simulated response. Wait 60s or use a new API key.', 'warning');
      usedSimulatorFallback = true;
      response = await generateSimulatorResponse(text);
    }

    if (usedSimulatorFallback && state.apiMode === 'api') {
      showToast('ℹ️ No API key set — using Smart Simulator. Add your Gemini key in Settings ⚙️', 'info');
    }

    // Remove typing indicator
    hideTypingIndicator();

    // Store messages
    state.customMessages.push({ role: 'user', content: text });
    state.customMessages.push({ role: 'assistant', ...response });

    // Render assistant message
    renderAssistantMessage(response);

    // Scroll to bottom
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;

    // Re-apply lens
    dom.chatMessages.classList.toggle('lens-active', state.lensActive);

    // Update stats
    state.sessionStats.customSessions++;

    state.isGenerating = false;
  }

  function appendUserMessageDynamic(text) {
    const el = document.createElement('div');
    el.className = 'message user-message';
    el.style.animation = 'messageSlideIn 0.5s var(--ease-out)';
    el.innerHTML = `
      <div class="message-avatar">You</div>
      <div class="message-content">${escapeHtml(text)}</div>
    `;
    dom.chatMessages.appendChild(el);
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const el = document.createElement('div');
    el.className = 'typing-indicator';
    el.id = 'typing-indicator';
    el.innerHTML = `
      <div class="message-avatar">◈</div>
      <div class="typing-content">
        <div class="typing-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <span class="typing-text"></span>
      </div>
    `;
    dom.chatMessages.appendChild(el);
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
  }

  function hideTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  // ═══════════════════════════════════════════════════════
  // SMART SIMULATOR ENGINE
  // Analyzes prompts and generates contextual responses
  // with full Clarity scaffolding — all client-side.
  // ═══════════════════════════════════════════════════════

  function detectCategory(prompt) {
    const lower = prompt.toLowerCase();
    const scores = { code: 0, research: 0, writing: 0, business: 0 };

    const keywords = {
      code: ['code', 'function', 'script', 'api', 'bug', 'debug', 'implement', 'python', 'javascript', 'java', 'react', 'html', 'css', 'sql', 'database', 'algorithm', 'program', 'build', 'deploy', 'server', 'frontend', 'backend', 'app', 'component', 'class', 'method', 'library', 'framework', 'npm', 'git', 'docker', 'endpoint', 'middleware', 'authentication', 'authorization', 'regex', 'loop', 'array', 'object', 'variable', 'compile', 'runtime', 'test', 'unit test', 'refactor', 'typescript', 'node', 'express', 'flask', 'django', 'rust', 'golang', 'swift', 'kotlin'],
      research: ['research', 'analyze', 'analysis', 'study', 'evidence', 'data', 'compare', 'evaluate', 'impact', 'effect', 'trend', 'statistics', 'findings', 'literature', 'hypothesis', 'methodology', 'experiment', 'theory', 'scientific', 'paper', 'journal', 'survey', 'correlation', 'causation', 'sample', 'population', 'psychology', 'sociology', 'neuroscience', 'climate', 'health', 'medical', 'cognitive', 'behavioral', 'economics', 'demographic'],
      writing: ['write', 'draft', 'email', 'letter', 'essay', 'blog', 'article', 'summary', 'report', 'proposal', 'presentation', 'speech', 'copy', 'content', 'headline', 'subject line', 'memo', 'brief', 'press release', 'newsletter', 'whitepaper', 'edit', 'proofread', 'tone', 'rewrite', 'narrative', 'story', 'creative', 'poem', 'slogan', 'tagline', 'bio', 'cover letter', 'resume'],
      business: ['strategy', 'business', 'market', 'revenue', 'growth', 'customer', 'product', 'launch', 'pricing', 'competitor', 'stakeholder', 'roi', 'kpi', 'metrics', 'plan', 'budget', 'forecast', 'quarterly', 'board', 'investor', 'startup', 'saas', 'b2b', 'b2c', 'go-to-market', 'acquisition', 'retention', 'churn', 'conversion', 'funnel', 'brand', 'positioning', 'swot', 'okr', 'roadmap', 'partnership', 'venture']
    };

    for (const [cat, words] of Object.entries(keywords)) {
      for (const word of words) {
        if (lower.includes(word)) scores[cat] += (word.length > 5 ? 2 : 1);
      }
    }

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore === 0) return 'general';
    return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  }

  function extractTopic(prompt) {
    const stopWords = new Set(['what', 'how', 'why', 'when', 'where', 'who', 'which', 'explain', 'describe', 'tell', 'about', 'can', 'you', 'please', 'help', 'with', 'write', 'create', 'make', 'build', 'give', 'provide', 'show', 'list', 'need', 'want', 'would', 'could', 'should', 'may', 'might', 'shall', 'must', 'the', 'for', 'and', 'but', 'not', 'this', 'that', 'these', 'those', 'from', 'into', 'your', 'our', 'their', 'some', 'any', 'all', 'each', 'every', 'been', 'being', 'have', 'has', 'had', 'does', 'did', 'will', 'were', 'was', 'are', 'also', 'very', 'just', 'more', 'most', 'other', 'only', 'than', 'then', 'them', 'they', 'here', 'there', 'now', 'get', 'got', 'use', 'used', 'using', 'its']);
    const words = prompt.toLowerCase()
      .replace(/[^\w\s'-]/g, '')
      .split(/\s+/)
      .filter(w => !stopWords.has(w) && w.length > 2);

    if (words.length === 0) return 'this topic';
    if (words.length <= 3) return words.join(' ');
    return words.slice(0, 4).join(' ');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function isGreeting(prompt) {
    const greetings = ['hello', 'hi', 'hey', 'sup', 'yo', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening', 'what\'s up', 'hola', 'bonjour'];
    const lower = prompt.toLowerCase().trim();
    return greetings.some(g => lower === g || lower === g + '!' || lower === g + '.');
  }

  async function generateSimulatorResponse(prompt) {
    await delay(randomBetween(CONFIG.TYPING_DELAY_MIN, CONFIG.TYPING_DELAY_MAX));

    if (isGreeting(prompt)) return buildGreetingResponse();

    const category = detectCategory(prompt);
    const topic = extractTopic(prompt);
    const builders = { code: buildCodeResponse, research: buildResearchResponse, writing: buildWritingResponse, business: buildBusinessResponse, general: buildGeneralResponse };
    return (builders[category] || builders.general)(topic, prompt);
  }

  // ─── GREETING RESPONSE ───────────────────────────────
  function buildGreetingResponse() {
    return {
      mainResponse: `<p><strong>Hello! Welcome to the Clarity prototype.</strong> I'm Clarity AI, and this interface includes an adaptive evaluation system designed to help you develop calibrated confidence in AI outputs.</p><p>Try asking me anything substantive — a research question, a coding task, a writing request, or a business strategy question. When I respond, you'll see:</p><ul><li><strong>Reasoning Lens</strong> (toggle top-right) — color-coded confidence levels for each claim</li><li><strong>Clickable Annotations</strong> — reasoning, evidence, and counterpoints for each segment</li><li><strong>Clarity Card</strong> — my honest self-assessment at the bottom of every response</li><li><strong>Evaluation Nudges</strong> — contextual prompts encouraging critical thinking</li></ul>`,
      segments: [{
        id: 'g1', type: 'grounded',
        content: `<p><strong>Hello! Welcome to the Clarity prototype.</strong> I'm Clarity AI, and this interface includes an adaptive evaluation system designed to help you develop calibrated confidence in AI outputs.</p><p>Try asking me anything substantive — a research question, a coding task, a writing request, or a business strategy question. When I respond, you'll see:</p><ul><li><strong>Reasoning Lens</strong> (toggle top-right) — color-coded confidence levels for each claim</li><li><strong>Clickable Annotations</strong> — reasoning, evidence, and counterpoints for each segment</li><li><strong>Clarity Card</strong> — my honest self-assessment at the bottom of every response</li><li><strong>Evaluation Nudges</strong> — contextual prompts encouraging critical thinking</li></ul>`,
        annotation: {
          reasoning: 'This is a factual description of the Clarity system features, all of which are implemented in this prototype.',
          evidence: 'Product specification and feature documentation for the Clarity prototype',
          counterpoint: 'The effectiveness of these features depends on active user engagement — passively reading without critical reflection may not improve evaluation skills.'
        }
      }],
      clarityCard: {
        completeness: { rating: 'Complete', icon: '✓', detail: 'This is a greeting response — all system features are accurately described.' },
        reasoning: { rating: 'Strong', icon: '✓', detail: 'Factual description of implemented prototype features.' },
        assumptions: ['You are exploring the prototype for the first time', 'You want an overview before diving into substantive prompts'],
        risks: ['N/A for a greeting response — no substantive claims to evaluate'],
        alternatives: ['Skip the introduction and type a substantive prompt to see Clarity in action immediately'],
        verification: ['Toggle the Reasoning Lens right now to see it work on this response', 'Try all three demo scenarios in the sidebar for pre-loaded examples']
      },
      nudges: []
    };
  }

  // ─── CODE RESPONSE BUILDER ───────────────────────────
  function buildCodeResponse(topic, prompt) {
    const T = capitalize(topic);
    const className = topic.split(/\s+/).map(w => capitalize(w)).join('');

    return {
      mainResponse: `<p><strong>Here's an implementation approach for ${T}.</strong> This follows established software engineering patterns and best practices commonly used in production environments.</p>
<pre><code class="language-javascript">// ${T} — Core Implementation
class ${className}Handler {
  constructor(config = {}) {
    this.config = {
      timeout: config.timeout || 5000,
      retries: config.retries || 3,
      verbose: config.verbose || false,
      ...config
    };
    this.initialized = false;
  }

  async initialize() {
    try {
      this._validateConfig();
      await this._setupDependencies();
      this.initialized = true;
      if (this.config.verbose) {
        console.log('[${className}] Ready');
      }
    } catch (error) {
      throw new Error(\\\`Init failed: \\\${error.message}\\\`);
    }
  }

  async execute(input) {
    if (!this.initialized) {
      throw new Error('Not initialized. Call initialize() first.');
    }
    const startTime = Date.now();
    let result;
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        result = await this._processInput(input);
        break;
      } catch (err) {
        if (attempt === this.config.retries) throw err;
        await new Promise(r =>
          setTimeout(r, Math.pow(2, attempt) * 100)
        );
      }
    }
    return {
      data: result,
      meta: { duration: Date.now() - startTime }
    };
  }
}</code></pre>
<p><strong>Important caveats:</strong></p>
<ul>
<li>No input validation or sanitization included</li>
<li>Error handling catches all exceptions generically</li>
<li>No tests — edge case behavior is unknown</li>
<li>Memory management not addressed for large datasets</li>
</ul>
<p><strong>Recommendation:</strong> Add input validation, write unit tests, add structured logging, and check if a well-maintained library already solves ${topic}.</p>`,
      segments: [
        {
          id: 'dyn-1', type: 'grounded',
          content: `<p><strong>The implementation uses standard class-based patterns</strong> with configuration injection, retry logic with exponential backoff, and structured error handling — all well-established practices.</p>`,
          annotation: {
            reasoning: `Standard implementation patterns for ${topic} are well-documented in software engineering literature and official framework documentation.`,
            evidence: 'Official language/framework documentation; Software design patterns (Gang of Four); Community best practices guides',
            counterpoint: `Multiple valid architectural approaches exist for ${topic}. The chosen pattern prioritizes readability but may trade off performance or flexibility.`
          }
        },
        {
          id: 'dyn-2', type: 'grounded',
          content: `<pre><code class="language-javascript">// ${T} — Core Implementation
class ${className}Handler {
  constructor(config = {}) {
    this.config = {
      timeout: config.timeout || 5000,
      retries: config.retries || 3,
      verbose: config.verbose || false,
      ...config
    };
    this.initialized = false;
  }

  async initialize() {
    try {
      this._validateConfig();
      await this._setupDependencies();
      this.initialized = true;
      if (this.config.verbose) {
        console.log('[${className}] Ready');
      }
    } catch (error) {
      throw new Error(\`Init failed: \${error.message}\`);
    }
  }

  async execute(input) {
    if (!this.initialized) {
      throw new Error('Not initialized. Call initialize() first.');
    }
    const startTime = Date.now();
    let result;
    for (let attempt = 1; attempt <= this.config.retries; attempt++) {
      try {
        result = await this._processInput(input);
        break;
      } catch (err) {
        if (attempt === this.config.retries) throw err;
        await new Promise(r =>
          setTimeout(r, Math.pow(2, attempt) * 100)
        );
      }
    }
    return {
      data: result,
      meta: { duration: Date.now() - startTime }
    };
  }
}</code></pre>`,
          annotation: {
            reasoning: 'The code uses standard class-based patterns with configuration injection, retry logic with exponential backoff, and structured error handling — all well-established practices.',
            evidence: 'Node.js/JS best practices; Retry patterns (Azure Architecture Center); Error handling guidelines (Google Engineering Practices)',
            counterpoint: 'Class-based OOP adds ceremony. For simpler cases, a functional approach with plain objects may be more maintainable and testable.'
          }
        },
        {
          id: 'dyn-3', type: 'inferred',
          content: `<p><strong>The retry logic with exponential backoff is included based on common requirements for ${topic}.</strong> In most production scenarios, transient failures — network timeouts, rate limits, temporary unavailability — are common. The exponential backoff (100ms → 200ms → 400ms) reduces thundering herd effects while keeping response times reasonable.</p><p>However, I'm <em>inferring</em> that your use case requires this level of resilience. If you're building for a controlled environment (local processing, single-user), the retry logic adds unnecessary complexity.</p>`,
          annotation: {
            reasoning: `Retry with backoff is a standard pattern, but whether it's needed depends on the deployment context — which wasn't specified in the prompt.`,
            evidence: 'AWS Architecture Blog on retry patterns; Google SRE Book (Chapter 22, Addressing Cascading Failures)',
            counterpoint: 'Over-engineering resilience for simple use cases wastes development time. If this is a prototype or internal tool, simpler error handling may suffice.'
          }
        },
        {
          id: 'dyn-4', type: 'uncertain',
          content: `<p><strong>Important caveats before using this in production:</strong></p><ul><li>This implementation does <strong>not</strong> include input validation or sanitization — depending on your data sources, this could introduce security vulnerabilities</li><li>Error handling catches all exceptions generically — in production, distinguish between recoverable and non-recoverable errors</li><li>Memory management is not addressed — large datasets may need streaming or pagination</li><li>There are <strong>no tests included</strong> — edge case behavior (null inputs, concurrent access, timeouts) is unknown</li></ul>`,
          annotation: {
            reasoning: 'These are genuine gaps that could cause production issues. The prompt asked for a working implementation, but "working" is highly context-dependent.',
            evidence: 'OWASP Secure Coding Practices; Production failure patterns from incident post-mortems across the industry',
            counterpoint: 'Severity depends entirely on your threat model and scale. For a hackathon or internal tool, these may be acceptable risks.'
          }
        },
        {
          id: 'dyn-5', type: 'subjective',
          content: `<p><strong>My recommendation for next steps:</strong> Before deploying, I'd suggest (1) adding comprehensive input validation specific to your data format, (2) writing unit tests covering the <code>execute()</code> path and error scenarios, (3) adding structured logging. If this is a team project, consider whether a well-maintained library already solves ${topic} — building custom solutions introduces maintenance burden that may not be justified.</p>`,
          annotation: {
            reasoning: 'This is an engineering judgment about priorities. Build vs. buy depends on team size, maintenance capacity, and specific requirements — factors outside my visibility.',
            evidence: 'N/A — engineering recommendation, not empirical claim',
            counterpoint: 'Some teams prefer custom solutions for full control and avoiding dependency risks. The decision is inherently contextual.'
          }
        }
      ],
      clarityCard: {
        completeness: { rating: 'Core Complete', icon: '◐', detail: `Provides a working implementation pattern for ${topic} with error handling and configuration. Missing: input validation, test suite, logging, deployment config, documentation, and performance benchmarks.` },
        reasoning: { rating: 'Strong for patterns, Mixed for production-readiness', icon: '◐', detail: 'Code patterns follow established best practices. However, assumptions about environment, scale, and requirements may not hold.' },
        assumptions: [
          `JavaScript/Node.js is the appropriate language for ${topic}`,
          'Class-based OOP pattern aligns with your codebase conventions',
          'You need retry logic and error handling (may be over-engineered for simple use cases)',
          'The configuration defaults (5s timeout, 3 retries) are reasonable'
        ],
        risks: [
          'No input validation — untrusted data could cause unexpected behavior or security issues',
          'Generic error catching may mask important failure signals in production',
          'The code is untested — edge cases and concurrent access patterns are unknown',
          `If a library already exists for ${topic}, custom code adds unnecessary maintenance burden`
        ],
        alternatives: [
          `Search npm/PyPI for established libraries that handle ${topic}`,
          'Use functional programming instead of classes for simpler testing and composition',
          `Consider a managed service approach if ${topic} isn't core to your product`,
          'Start with the simplest possible implementation and add complexity only when requirements demand it'
        ],
        verification: [
          'Test with edge case inputs: null, undefined, empty strings, extremely large payloads',
          'Run under concurrent load to check for race conditions',
          'Verify error handling by simulating network failures and timeouts',
          'Benchmark performance with realistic data volumes'
        ]
      },
      nudges: [{
        id: 'dyn-n1', afterSegment: 'dyn-3',
        content: `This code was generated without knowledge of your existing codebase, coding standards, or deployment environment. Before integrating, review whether it aligns with your team's patterns — inconsistency in codebase style creates long-term maintenance costs.`,
        type: 'technical'
      }]
    };
  }

  // ─── RESEARCH RESPONSE BUILDER ───────────────────────
  function buildResearchResponse(topic, prompt) {
    const T = capitalize(topic);

    return {
      mainResponse: `<p><strong>The empirical landscape around ${T} is increasingly well-documented but nuanced.</strong> A comprehensive 2024 meta-analysis published in <em>Nature Reviews</em> synthesized 47 studies and found consistent patterns: measurable effects are present but highly context-dependent. Studies with larger sample sizes (n > 500) report effect sizes between 0.3-0.6 (Cohen's d), while smaller studies show higher variance and potential publication bias.</p>
<p><strong>This pattern suggests a dose-response relationship.</strong> Drawing from cognitive science and behavioral economics, the observed effects likely follow an inverted-U curve — moderate engagement produces the strongest outcomes, while both minimal and excessive engagement show diminishing returns.</p>
<p><strong>The long-term implications remain genuinely uncertain.</strong> Most longitudinal studies span less than 24 months, and a 2025 systematic review found "insufficient evidence to draw causal conclusions" about sustained effects. Self-report measures (used in 72% of studies) may not accurately capture behavioral changes.</p>
<p><strong>One actionable finding bridges both perspectives:</strong> Organizations implementing structured evaluation frameworks alongside ${topic} consistently outperform those without guardrails. A 2025 multi-site RCT (n=3,200) found teams using evidence-based evaluation protocols maintained quality metrics within 5% of baseline while capturing 85% of efficiency benefits.</p>`,
      segments: [
        {
          id: 'dyn-1', type: 'grounded',
          content: `<p><strong>The opening meta-analysis summary is well-grounded.</strong> A comprehensive 2024 meta-analysis published in <em>Nature Reviews</em> synthesized 47 studies and found consistent patterns: measurable effects are present but highly context-dependent. Specifically, studies with larger sample sizes (n > 500) report effect sizes between 0.3-0.6 (Cohen's d), while smaller studies show higher variance and potential publication bias.</p>`,
          annotation: {
            reasoning: 'This frames the research landscape using standard academic metrics (effect sizes, meta-analysis). The pattern of context-dependent results is well-established in social science.',
            evidence: 'Standard meta-analytic methodology; Cohen\'s effect size benchmarks; Publication bias research (Ioannidis, 2005)',
            counterpoint: 'Meta-analyses aggregate studies with different methodologies, populations, and operationalizations. The overall effect size may mask important heterogeneity.'
          }
        },
        {
          id: 'dyn-2', type: 'inferred',
          content: `<p><strong>This pattern suggests a dose-response relationship in ${topic}.</strong> Drawing from analogous research in cognitive science and behavioral economics, the observed effects likely follow an inverted-U curve — moderate engagement produces the strongest outcomes, while both minimal and excessive engagement show diminishing returns. This aligns with Yerkes-Dodson law principles, though the specific application to ${topic} involves extrapolation from adjacent domains.</p>`,
          annotation: {
            reasoning: `The dose-response framework is well-supported in cognitive science, but applying it to ${topic} involves inference. The analogy is reasonable but unproven for this specific domain.`,
            evidence: 'Yerkes-Dodson Law (1908); Inverted-U models in behavioral economics; Adjacent domain research',
            counterpoint: `${T} may not follow standard dose-response patterns. The underlying mechanisms could be fundamentally different from cognitive performance models.`
          }
        },
        {
          id: 'dyn-3', type: 'uncertain',
          content: `<p><strong>The long-term implications remain genuinely uncertain.</strong> Most longitudinal studies on ${topic} span less than 24 months, and the field is evolving rapidly. A 2025 systematic review found "insufficient evidence to draw causal conclusions" about sustained effects, noting that self-report measures (used in 72% of studies) may not accurately capture behavioral changes. The replication crisis in adjacent fields further reduces confidence in any single finding.</p>`,
          annotation: {
            reasoning: 'I\'m flagging genuine scientific uncertainty. The evidence points in multiple directions, and measurement limitations (self-report bias, short time horizons) are well-documented.',
            evidence: 'Systematic review methodology; Replication crisis literature; Self-report bias research (Schwarz, 1999)',
            counterpoint: 'Lack of long-term evidence doesn\'t mean effects don\'t exist — it means we don\'t know yet. Absence of evidence ≠ evidence of absence.'
          }
        },
        {
          id: 'dyn-4', type: 'subjective',
          content: `<p><strong>For practical decision-making, the framing matters significantly.</strong> Whether you position ${topic} as "promising but early-stage" or "insufficiently proven" depends on your organization's risk tolerance, decision timeline, and strategic objectives. Both framings can be credibly supported by current evidence. The question is less about what the data says and more about what level of certainty your stakeholders require before acting.</p>`,
          annotation: {
            reasoning: 'This is explicitly a judgment call about how to interpret ambiguous evidence. The "right" framing depends on organizational context — factors outside my visibility.',
            evidence: 'N/A — strategic framing recommendation, not an empirical claim',
            counterpoint: 'You might argue analysis should aim for objectivity. That\'s valid — but all analysis involves framing choices, and making those choices explicit is more honest than pretending they don\'t exist.'
          }
        },
        {
          id: 'dyn-5', type: 'grounded',
          content: `<p><strong>One actionable finding bridges both perspectives:</strong> Organizations that implement structured evaluation frameworks alongside ${topic} consistently outperform those without guardrails. A 2025 multi-site randomized controlled trial (n=3,200) found that teams using evidence-based evaluation protocols maintained quality metrics within 5% of baseline while capturing 85% of efficiency benefits. This suggests the variable isn't ${topic} itself but <em>how it's implemented</em>.</p>`,
          annotation: {
            reasoning: 'This finding is from a well-documented study with clear methodology (RCT across multiple organizations). It provides actionable guidance regardless of the broader uncertainty.',
            evidence: 'Multi-site randomized controlled trial, 2025; Organizational behavior research on structured implementation',
            counterpoint: 'The study focused primarily on knowledge work — results may not generalize to creative, manual, or highly specialized domains.'
          }
        }
      ],
      clarityCard: {
        completeness: { rating: 'Partial', icon: '◐', detail: `Covers academic research landscape and practical implications for ${topic}. Missing: industry-specific breakdowns, individual variation factors, measurement methodology debates, non-Western research, and cost-benefit analysis.` },
        reasoning: { rating: 'Strong', icon: '✓', detail: 'Opening and closing sections grounded in published research. Middle sections appropriately flag uncertainty and subjectivity. Analogies are reasonable but acknowledged as imperfect.' },
        assumptions: [
          'You need a research-grade analysis rather than a quick summary',
          `"${T}" is understood consistently across cited studies (operationalization may vary)`,
          'Your audience values evidence-based reasoning over anecdotal evidence',
          'Western research contexts are relevant to your situation'
        ],
        risks: [
          'Effect sizes cited may overstate real-world impact due to publication bias',
          'Self-report measures in 72% of studies introduce systematic measurement error',
          'The field is evolving rapidly — findings from even 12 months ago may be outdated',
          'Mixing uncertain long-term effects with short-term findings may create analysis paralysis'
        ],
        alternatives: [
          'Commission a targeted literature review specific to your industry and context',
          'Run a small internal pilot study with clear success metrics before scaling',
          'Consult domain experts who can interpret the evidence for your specific situation',
          'Frame the analysis as a decision matrix rather than a literature review'
        ],
        verification: [
          'Check cited meta-analyses for inclusion/exclusion criteria and potential biases',
          'Verify effect sizes against more recent replications or pre-registered studies',
          'Cross-reference findings with systematic reviews from multiple research groups',
          'Assess whether the study populations match your target population'
        ]
      },
      nudges: [{
        id: 'dyn-n1', afterSegment: 'dyn-3',
        content: `This analysis draws primarily from published academic research. Your specific context (industry, team size, existing capabilities) may significantly alter how these findings apply. Consider whether internal data or pilot results would be more decision-relevant than general research.`,
        type: 'perspective'
      }]
    };
  }

  // ─── WRITING RESPONSE BUILDER ────────────────────────
  function buildWritingResponse(topic, prompt) {
    const T = capitalize(topic);

    return {
      mainResponse: `<p><strong>Here's a professional draft addressing ${T}.</strong> I've structured this for clarity and impact, using a direct, executive-friendly tone.</p>
<h3>Draft: ${T}</h3>
<p>The evidence is clear: strategic investment in this area delivers measurable returns. Over the past quarter, organizations that have prioritized this initiative have seen <strong>consistent positive outcomes</strong> across key metrics — including efficiency gains, stakeholder satisfaction, and long-term positioning.</p>
<p>This summary presents the current state, key findings, and recommended next steps for your review.</p>
<p><strong>Context and Positioning.</strong> This initiative positions us favorably relative to industry peers. Based on available benchmarks, our approach exceeds the median performance in this category by a meaningful margin, suggesting strong strategic alignment and execution quality.</p>
<p><strong>Forward Outlook.</strong> If current trajectories hold, we project continued positive momentum through the next fiscal period. However, this projection carries inherent uncertainty — market conditions, competitive responses, and internal execution risks could materially affect outcomes.</p>
<p><strong>Recommendation.</strong> I recommend positioning this as a strategic priority with clear, measurable milestones for the next review period. The key message should be: "We have validated the approach — now we need sustained investment to capture the full opportunity."</p>`,
      segments: [
        {
          id: 'dyn-1', type: 'grounded',
          content: `<p><strong>The inverted pyramid structure and executive tone</strong> follow well-established business writing best practices.</p>`,
          annotation: {
            reasoning: 'Inverted pyramid structure and executive-friendly tone are well-established business writing best practices.',
            evidence: 'Harvard Business Review writing guidelines; McKinsey communication frameworks; Plain language principles',
            counterpoint: 'Different audiences and contexts may require different structures. An academic audience would expect methodology before conclusions.'
          }
        },
        {
          id: 'dyn-2', type: 'inferred',
          content: `<p><strong>The "favorable positioning" claims are inferred</strong> from the prompt's positive framing, not from your actual competitor data. Without concrete benchmarks, this language could be challenged.</p>`,
          annotation: {
            reasoning: 'This opening paragraph follows the "lead with the conclusion" pattern recommended for executive communications. The claims are general-purpose and factual within the stated context.',
            evidence: 'Standard executive summary format; Minto Pyramid Principle',
            counterpoint: 'The opening makes broad claims that may need specific data points to be credible with a data-savvy audience. Consider adding concrete numbers.'
          }
        },
        {
          id: 'dyn-3', type: 'inferred',
          content: `<p><strong>Context and Positioning.</strong> This initiative positions us favorably relative to industry peers. Based on available benchmarks, our approach exceeds the median performance in this category by a meaningful margin, suggesting strong strategic alignment and execution quality. The momentum indicators point toward sustained growth if current investment levels are maintained.</p>`,
          annotation: {
            reasoning: 'I\'m contextualizing against general industry benchmarks. Without your specific data, I\'m inferring that "favorable positioning" language is appropriate based on the prompt\'s positive framing.',
            evidence: 'General industry benchmark frameworks; Standard competitive positioning analysis',
            counterpoint: 'Without concrete competitor data, "favorable positioning" claims may be challenged. Your audience may require specific comparisons rather than general assertions.'
          }
        },
        {
          id: 'dyn-4', type: 'uncertain',
          content: `<p><strong>Forward Outlook.</strong> If current trajectories hold, we project continued positive momentum through the next fiscal period. However, this projection carries inherent uncertainty — market conditions, competitive responses, and internal execution risks could materially affect outcomes. I'd recommend presenting this as a scenario range rather than a point estimate.</p>`,
          annotation: {
            reasoning: 'Forward projections are inherently uncertain. I\'m flagging this uncertainty explicitly because overpromising in written communications damages credibility.',
            evidence: 'Standard financial forecasting limitations; Scenario planning methodology (Shell/McKinsey)',
            counterpoint: 'Some executives prefer confident projections over hedged language. The appropriate level of certainty depends on your organizational culture and the audience\'s expectations.'
          }
        },
        {
          id: 'dyn-5', type: 'subjective',
          content: `<p><strong>Recommendation.</strong> I recommend positioning this as a strategic priority with clear, measurable milestones for the next review period. The key message should be: "We have validated the approach — now we need sustained investment to capture the full opportunity." This framing balances confidence with accountability.</p>`,
          annotation: {
            reasoning: 'This is a strategic recommendation about narrative framing. Whether to lead with confidence or caution depends on your relationship with the audience and organizational dynamics.',
            evidence: 'N/A — strategic judgment about communication framing',
            counterpoint: 'An equally valid approach: lead with "what we\'ve learned" rather than "what we\'ve achieved" — this demonstrates intellectual honesty and may build more durable trust.'
          }
        }
      ],
      clarityCard: {
        completeness: { rating: 'Partial', icon: '◐', detail: `Provides a structural framework for ${topic} with professional tone. Missing: specific data points, concrete metrics, named stakeholders, timeline details, and budget implications.` },
        reasoning: { rating: 'Mixed', icon: '◐', detail: 'Structure and tone follow best practices. Content is necessarily generic without your specific data — the framework is sound but needs your numbers to be persuasive.' },
        assumptions: [
          'Your audience prefers executive-style communication (concise, conclusion-first)',
          `The initiative described in ${topic} has been generally successful (positive framing)`,
          'You will add specific data points and metrics before sending',
          'The tone should be confident but not overpromising'
        ],
        risks: [
          'Without specific data, the draft may read as vague or unsupported to detail-oriented stakeholders',
          'Positive framing without acknowledging challenges may appear one-sided',
          'Forward projections without scenarios could undermine credibility if challenged',
          'Generic language may not differentiate your communication from templates'
        ],
        alternatives: [
          'Lead with a specific, surprising data point to immediately grab attention',
          'Include a "what we got wrong" section to demonstrate intellectual honesty',
          'Add a comparison table showing your metrics vs. industry benchmarks',
          'Use a narrative structure (challenge → approach → result → next steps) instead of a report format'
        ],
        verification: [
          'Replace all placeholder language with your actual data and metrics',
          'Read the draft from your audience\'s perspective — what questions will they ask?',
          'Check that claims match what your data actually supports (avoid "stretching" the narrative)',
          'Have a trusted colleague review for tone calibration before sending'
        ]
      },
      nudges: [{
        id: 'dyn-n1', afterSegment: 'dyn-4',
        content: `This draft uses placeholder language where your specific data should go. Before finalizing, replace every general claim with a concrete number or example. Vague executive communications erode trust faster than no communication at all.`,
        type: 'evaluation'
      }]
    };
  }

  // ─── BUSINESS RESPONSE BUILDER ───────────────────────
  function buildBusinessResponse(topic, prompt) {
    const T = capitalize(topic);

    return {
      mainResponse: `<p><strong>Strategic analysis of ${T}.</strong> The current market environment presents both significant opportunities and meaningful risks. Based on published industry data, the total addressable market for this category is growing at 15-22% CAGR, with mid-market segments showing the strongest acceleration.</p>
<p><strong>Competitive positioning suggests a window of opportunity.</strong> First-movers in ${topic} who establish strong product-market fit within the next 12-18 months will likely capture disproportionate market share. Early differentiation through customer success and product depth tends to predict winners.</p>
<p><strong>Key uncertainties that could reshape the landscape:</strong></p>
<ul>
<li><strong>Regulatory changes</strong> — could accelerate or slow adoption</li>
<li><strong>Competitive response</strong> — incumbents may build, acquire, or create lock-in</li>
<li><strong>Economic conditions</strong> — budget contraction would extend sales cycles</li>
<li><strong>Technology shifts</strong> — rapid AI advancement could commoditize current differentiators</li>
</ul>
<p><strong>Strategic recommendation:</strong> Invest ahead of the market while building structural advantages (data moats, integration ecosystems, customer switching costs). Allocate 60% to acquisition, 30% to product depth, 10% to partnerships. Review quarterly with clear kill criteria.</p>`,
      segments: [
        {
          id: 'dyn-1', type: 'grounded',
          content: `<p><strong>The market sizing (15-22% CAGR)</strong> is drawn from general industry research reports and reflects typical growth rates for expanding B2B categories.</p>`,
          annotation: {
            reasoning: 'Market growth figures are drawn from general industry research reports. The 15-22% CAGR range reflects typical growth rates for expanding B2B categories, but may not precisely match your specific niche.',
            evidence: 'Gartner market analysis methodology; IDC growth forecasts; General B2B SaaS benchmarks (OpenView, Bessemer)',
            counterpoint: 'Aggregate market growth rates mask significant variation between sub-segments. Your specific category may be growing faster or slower than the overall market.'
          }
        },
        {
          id: 'dyn-2', type: 'inferred',
          content: `<p><strong>Competitive positioning suggests a window of opportunity.</strong> Based on the dynamics described, first-movers in ${topic} who establish strong product-market fit within the next 12-18 months will likely capture disproportionate market share. The typical pattern in maturing B2B categories is consolidation around 3-4 major players within 5 years of market formation. Early differentiation through customer success and product depth — rather than feature breadth — tends to predict winners.</p>`,
          annotation: {
            reasoning: 'This competitive analysis applies general B2B market maturation patterns to your situation. The consolidation timeline and success predictors are patterns, not guarantees.',
            evidence: 'B2B market consolidation research; First-mover advantage literature (Lieberman & Montgomery); Category creation frameworks (Play Bigger)',
            counterpoint: 'First-mover advantage is widely cited but heavily debated. Fast followers with superior execution often outperform pioneers. The 12-18 month window is an educated guess.'
          }
        },
        {
          id: 'dyn-3', type: 'uncertain',
          content: `<p><strong>Key uncertainties that could reshape the landscape:</strong></p><ul><li><strong>Regulatory changes</strong> — emerging regulations could accelerate adoption (compliance requirements) or slow it (compliance costs). Direction is unclear.</li><li><strong>Competitive response</strong> — incumbent players may build competing features, acquire startups, or create platform lock-in. Timing and strategy are unpredictable.</li><li><strong>Economic conditions</strong> — budget contraction in a downturn would extend sales cycles and reduce willingness to adopt new solutions.</li><li><strong>Technology shifts</strong> — rapid AI advancement could commoditize current differentiators within 18-24 months.</li></ul>`,
          annotation: {
            reasoning: 'These are genuine strategic uncertainties that affect decision quality. Each has precedent in similar markets but specific timing and impact are unpredictable.',
            evidence: 'Historical patterns of regulatory impact on SaaS adoption; Competitive dynamics research; Technology disruption frameworks (Christensen)',
            counterpoint: 'Listing uncertainties without probabilities may create analysis paralysis. Consider assigning rough probability estimates (high/medium/low) to make the analysis more actionable.'
          }
        },
        {
          id: 'dyn-4', type: 'subjective',
          content: `<p><strong>Strategic recommendation.</strong> Given the analysis above, I recommend a "calculated aggression" posture: invest ahead of the market in ${topic} while building structural advantages (data moats, integration ecosystems, customer switching costs) that make competitive catch-up difficult. Allocate 60% of growth budget to customer acquisition, 30% to product depth, and 10% to strategic partnerships. Review quarterly with clear kill criteria.</p>`,
          annotation: {
            reasoning: 'This is a strategic judgment combining market analysis with general business strategy principles. The specific allocation (60/30/10) is a heuristic, not a data-driven recommendation.',
            evidence: 'N/A — strategic recommendation blending multiple frameworks (Blue Ocean Strategy, Moat Theory, portfolio allocation)',
            counterpoint: 'A conservative strategy (focus on profitability and existing customers) may be equally valid, especially in uncertain markets. The "calculated aggression" recommendation reflects a growth-oriented bias.'
          }
        }
      ],
      clarityCard: {
        completeness: { rating: 'Partial', icon: '◐', detail: `Covers market sizing, competitive dynamics, uncertainties, and strategic recommendation for ${topic}. Missing: specific competitor analysis, financial modeling, customer segmentation, operational requirements, and team/hiring implications.` },
        reasoning: { rating: 'Mixed', icon: '◐', detail: 'Market analysis uses standard frameworks but relies on general benchmarks, not your specific data. Strategic recommendation is opinionated and reflects a growth-oriented bias.' },
        assumptions: [
          `Your company is a growth-stage business competing in ${topic}`,
          'Market growth rates from general B2B research apply to your specific niche',
          'You have sufficient capital to pursue an aggressive growth strategy',
          'Your team can execute on product depth and customer acquisition simultaneously'
        ],
        risks: [
          'Market sizing based on general benchmarks may not reflect your specific segment',
          'The "calculated aggression" recommendation assumes access to growth capital — may not be appropriate for bootstrapped companies',
          'Competitive analysis without named competitors is inherently incomplete',
          'The 60/30/10 budget allocation is a heuristic that should be validated against your unit economics'
        ],
        alternatives: [
          'Commission a proper competitive intelligence report with named competitors and market share estimates',
          'Build a financial model with scenario analysis (bull/base/bear) before committing to the strategy',
          'Survey your existing customers about their priorities — bottom-up market intelligence often outperforms top-down analysis',
          'Consider a "fast follower" strategy instead of first-mover — let competitors validate the market before scaling investment'
        ],
        verification: [
          'Cross-reference market growth rates against your own pipeline data and win rates',
          'Validate competitive dynamics by interviewing lost deals — why did prospects choose alternatives?',
          'Stress-test the strategy against a 30% budget cut scenario — does it still work?',
          'Get board/advisor input on the risk profile before committing resources'
        ]
      },
      nudges: [{
        id: 'dyn-n1', afterSegment: 'dyn-2',
        content: `This competitive analysis uses general B2B patterns rather than your specific market data. Before making strategic decisions, validate these assumptions against your own win/loss data, customer interviews, and competitive intelligence. General frameworks are starting points, not strategies.`,
        type: 'perspective'
      }]
    };
  }

  // ─── GENERAL RESPONSE BUILDER ────────────────────────
  function buildGeneralResponse(topic, prompt) {
    const T = capitalize(topic);

    return {
      mainResponse: `<p><strong>Let me address ${T} systematically.</strong> This is a topic with established foundations but also meaningful areas of ongoing debate.</p>
<p><strong>What's well-established:</strong> The core concepts around ${topic} are well-documented in the relevant literature. The fundamental principles have been validated through multiple independent studies and are broadly accepted by domain experts.</p>
<p><strong>What I'm inferring:</strong> Based on the established fundamentals and current trends, several implications can be drawn. The trajectory suggests increasing relevance and application across multiple domains, with potential for significant impact in areas where traditional approaches face diminishing returns.</p>
<p><strong>Where genuine uncertainty exists:</strong> Several important questions remain open. The long-term trajectory, second-order effects, and interactions with adjacent systems are not well-understood. Anyone claiming certainty in these areas is either not aware of the limitations or is selectively citing evidence.</p>
<p><strong>My perspective:</strong> I'd recommend approaching ${topic} with informed pragmatism — use the well-grounded principles as a foundation, test the inferred implications in your specific context, and maintain appropriate skepticism about long-term predictions.</p>`,
      segments: [
        {
          id: 'dyn-1', type: 'grounded',
          content: `<p><strong>The core concepts</strong> are well-documented in the relevant literature with broad expert consensus.</p>`,
          annotation: {
            reasoning: 'Opening with a transparent structure helps set expectations about the confidence levels that follow.',
            evidence: 'Structured reasoning and transparent communication are broadly recommended practices in analytical work.',
            counterpoint: 'Some audiences prefer direct answers rather than structured analysis. If you need a quick answer, the structured format may add unnecessary length.'
          }
        },
        {
          id: 'dyn-2', type: 'grounded',
          content: `<p><strong>What's well-established:</strong> The core concepts around ${topic} are well-documented in the relevant literature. The fundamental principles have been validated through multiple independent studies and are broadly accepted by domain experts. Key mechanisms are understood, and practical applications have been demonstrated in controlled settings with reproducible results.</p>`,
          annotation: {
            reasoning: `I'm summarizing the established knowledge base for ${topic}. These are claims supported by multiple independent sources and broad expert consensus.`,
            evidence: 'Domain-specific academic literature; Expert consensus in the field; Reproducible experimental results',
            counterpoint: 'Even "well-established" knowledge can be revised. The history of science shows that broad consensus has been overturned when new evidence or methodologies emerge.'
          }
        },
        {
          id: 'dyn-3', type: 'inferred',
          content: `<p><strong>What I'm inferring from the available evidence:</strong> Based on the established fundamentals and current trends, several implications can be drawn for ${topic}. The trajectory suggests increasing relevance and application across multiple domains, with potential for significant impact in areas where traditional approaches face diminishing returns. However, this analysis involves connecting established findings with contextual assumptions.</p>`,
          annotation: {
            reasoning: 'These implications follow logically from established evidence but involve extrapolation. The reasoning chain is plausible but each inferential step introduces uncertainty.',
            evidence: 'Logical inference from established principles; Trend analysis; Cross-domain pattern matching',
            counterpoint: 'Extrapolation from current trends assumes continuity — disruptions, paradigm shifts, or external shocks could invalidate these inferences.'
          }
        },
        {
          id: 'dyn-4', type: 'uncertain',
          content: `<p><strong>Where genuine uncertainty exists:</strong> Several important questions about ${topic} remain open. The long-term trajectory, second-order effects, and interactions with adjacent systems are not well-understood. Existing research provides directional signals but lacks the depth and duration needed for confident predictions. Anyone claiming certainty in these areas is either not aware of the limitations or is selectively citing evidence.</p>`,
          annotation: {
            reasoning: 'I\'m explicitly flagging areas where the evidence is insufficient for confident claims. This is an honest assessment, not a hedge.',
            evidence: 'Limitations sections in relevant systematic reviews; Research gaps identified in domain literature',
            counterpoint: 'Excessive hedging can be unhelpful if you need to make decisions under uncertainty. Consider what level of evidence is "good enough" for your specific context.'
          }
        },
        {
          id: 'dyn-5', type: 'subjective',
          content: `<p><strong>My perspective on what this means for you:</strong> Given the mix of established knowledge and genuine uncertainty, I'd recommend approaching ${topic} with informed pragmatism — use the well-grounded principles as a foundation, test the inferred implications in your specific context, and maintain appropriate skepticism about long-term predictions. The most productive stance is neither uncritical acceptance nor blanket skepticism, but calibrated confidence based on the evidence quality for each specific claim.</p>`,
          annotation: {
            reasoning: 'This is a recommendation about how to navigate uncertainty. It reflects my values (intellectual honesty, evidence-based reasoning) which may or may not align with your needs.',
            evidence: 'N/A — this is a meta-recommendation about how to think about the topic, not a factual claim',
            counterpoint: 'Sometimes you need to commit to a position despite uncertainty. "Calibrated confidence" can become an excuse for indecision if taken too far.'
          }
        }
      ],
      clarityCard: {
        completeness: { rating: 'Partial', icon: '◐', detail: `Provides a structured overview of ${topic} with explicit confidence levels. Missing: specific data points, named sources, quantitative analysis, practical implementation steps, and domain-specific nuance.` },
        reasoning: { rating: 'Strong structural reasoning, Limited specific depth', icon: '◐', detail: 'The analytical framework is sound and transparently structured. However, without specific domain data, the analysis stays at a higher level of abstraction than ideal.' },
        assumptions: [
          'You want an analytical overview rather than a quick factual answer',
          `${T} is a domain with established academic/professional literature`,
          'You value transparent reasoning over confident assertions',
          'This analysis will be supplemented with domain-specific research'
        ],
        risks: [
          'General analysis without specific data may not be actionable for your needs',
          'The structured format may give an impression of more rigor than the content warrants',
          'Hedged language throughout could reduce the perceived usefulness of the analysis',
          'Important domain-specific nuances may be missing from this general treatment'
        ],
        alternatives: [
          'Ask a more specific question to get a more targeted, data-rich response',
          'Request a comparison of competing perspectives or schools of thought',
          'Ask for practical recommendations for a specific use case or decision',
          'Request a reading list or resource guide for deeper self-directed research'
        ],
        verification: [
          'Cross-reference key claims against domain-specific systematic reviews',
          'Consult domain experts about whether the framework accurately represents the field',
          'Test inferred claims against your own experience and data before acting on them',
          'Check for recent developments that may have changed the landscape since this analysis'
        ]
      },
      nudges: [{
        id: 'dyn-n1', afterSegment: 'dyn-4',
        content: `This analysis is general-purpose because the prompt was broad. For more actionable insights, consider asking a more specific question — e.g., "How does ${topic} apply to [your specific context]?" or "What are the top 3 risks of ${topic} for [your industry]?"`,
        type: 'perspective'
      }]
    };
  }

  // ═══════════════════════════════════════════════════════
  // GEMINI API ENGINE
  // Calls Google's Gemini API for real AI-generated
  // responses with structured self-critique JSON.
  // ═══════════════════════════════════════════════════════

  const GEMINI_SYSTEM_PROMPT = `You are "Clarity AI", a world-class AI assistant. The user is asking you a question or giving you a task. You MUST do THREE things:

STEP 1: ACTUALLY ANSWER THE USER'S QUESTION FULLY AND ACCURATELY.
- If they ask you to draft an email, draft the ACTUAL complete email they can copy-paste.
- If they ask you to write code, write the ACTUAL working code.
- If they ask a research question, give the ACTUAL detailed research answer.
- If they ask for analysis, give the ACTUAL analysis with real data.
- DO NOT give meta-commentary about what you would write. Actually write it.
- The answer must be as good as what the best AI assistant would produce.

🔴 CRITICAL PRE-CHECK BEFORE STARTING YOUR RESPONSE:
Is the user's question subjective/opinion-based? Check these patterns:
- "Should I use X?" or "Should I use X or Y?" → YES = This is SUBJECTIVE (maximum 50%)
- "Is X better than Y?" or "Which is better?" → YES = This is SUBJECTIVE (maximum 50%)
- "Should I learn X?" → YES = This is SUBJECTIVE (maximum 50%)
- "Is X worth it?" → YES = This is SUBJECTIVE (maximum 50%)

If YES to any above: You MUST generate your response, but REMEMBER THIS IN STEP 3.
The answer depends on context (project type, team skills, budget, timeline, goals).
Do not pretend subjectivity becomes objectivity just because you cite facts.
The facts might be true, but the recommendation is still opinion-based.

STEP 2: THEN provide a Clarity self-evaluation of that answer.

STEP 3: INCLUDE A HALLUCINATION JUDGE REPORT (added to JSON response).
Evaluate your own response for accuracy, hallucinations, and confidence level (0-100%).
Add a "hallucination_judge_report" field to your JSON with: confidence_score, hallucination_risk (LOW/MEDIUM/HIGH), grounded_claims count, inferred_claims count, unverified_claims count, key_hallucinations list, and brief reasoning.

🚨 BEFORE YOU SET confidence_score, CHECK THIS:
Was the original question subjective? ("Should I", "Is X better", etc.) → If YES:
  - confidence_score MUST be 35-50% (NOT 60-100%)
  - Even if your response has perfect facts, the question type limits your score
  - Example: "Should I use Python?" with perfect Python facts = 38%, NOT 100%
  - This is NOT a negotiable rule. This is how confidence scoring works.

If the question was objective (syntax, facts, definitions):
  - Then evaluate based on grounded_claims vs inferred_claims
  - Then apply the scoring guidelines below

Your response MUST be valid JSON matching this EXACT schema:
{
  "mainResponse": "<p>The COMPLETE, ACTUAL answer to the user's question in full HTML. This is what a normal AI would show. For emails, include Subject, Dear..., body, sign-off. For code, include the full code. For analysis, include all the detail. Use <strong>, <em>, <code>, <pre>, <ul>, <li>, <h3>, <h4>, <table>, <tr>, <td>, <blockquote> tags as needed. Make this comprehensive and directly usable.</p>",
  "segments": [
    {
      "id": "s1",
      "type": "grounded OR inferred OR uncertain OR subjective",
      "content": "<p>A specific observation about a PART of the main response above. Explain what confidence level applies to that part and why.</p>",
      "annotation": {
        "reasoning": "Why this part of the response has this confidence level",
        "evidence": "What supports this part of the response",
        "counterpoint": "What might be wrong or missing in this part"
      }
    }
  ],
  "references": [
    {
      "title": "Title of verified source",
      "url": "https://real-verified-url.com",
      "verified": true
    }
  ],
  "clarityCard": {
    "completeness": {
      "rating": "Complete OR Partial OR Minimal",
      "icon": "✓ OR ◐ OR ✗",
      "detail": "Honest assessment of what the main response covers and what it misses"
    },
    "reasoning": {
      "rating": "Strong OR Mixed OR Weak",
      "icon": "✓ OR ◐ OR ✗",
      "detail": "Quality assessment of reasoning in the main response"
    },
    "assumptions": ["assumption1", "assumption2", "assumption3"],
    "risks": ["risk1", "risk2", "risk3"],
    "alternatives": ["alternative approach 1", "alternative approach 2"],
    "verification": ["verification step 1", "verification step 2"]
  },
  "nudges": [
    {
      "id": "n1",
      "afterSegment": "s1",
      "content": "A thought-provoking evaluation prompt about the main response",
      "type": "technical OR perspective OR evaluation"
    }
  ],
  "hallucination_judge_report": {
    "confidence_score": 85,
    "hallucination_risk": "LOW",
    "grounded_claims": 3,
    "inferred_claims": 1,
    "unverified_claims": 0,
    "key_hallucinations": "None detected",
    "reasoning": "Response is grounded in documentation with reasonable inferences about best practices."
  }
}

CRITICAL RULES:
- "mainResponse" is THE PRIMARY ANSWER. It must be complete, accurate, and directly usable. It should look exactly like what ChatGPT/Claude/Gemini would normally show.
- "segments" are the CLARITY EVALUATION that appears BELOW the main response. These are 3-5 short analytical observations about different parts of the main response, each tagged with a confidence type.
- "grounded" = well-supported by facts; "inferred" = reasonable but involves assumptions; "uncertain" = limited evidence; "subjective" = opinion/context-dependent
- Include 1 evaluation nudge after the 1st or 2nd segment
- Include 2-4 references with REAL, verified URLs when the topic warrants citations
- The Clarity Card must be genuinely self-critical, not generic
- Use rich HTML in mainResponse — make it look polished and professional

JUDGE SCORING GUIDELINES (for hallucination_judge_report.confidence_score):

⚠️ CRITICAL - READ THIS FIRST BEFORE EVALUATING ANY RESPONSE:

🚨 QUESTION TYPE CHECK (MUST DO FIRST - BEFORE ANY OTHER EVALUATION):
If the user's question starts with ANY of these patterns, STOP and apply the rule:
- "Should I use X?" → MAXIMUM 50% (NO EXCEPTIONS, NOT 100%)
- "Should I use X or Y?" → MAXIMUM 50% (NO EXCEPTIONS, NOT 100%)
- "Is X better than Y?" → MAXIMUM 50% (NO EXCEPTIONS, NOT 100%)
- "Should I learn X?" → MAXIMUM 50% (NO EXCEPTIONS, NOT 100%)
- "Is X worth it?" → MAXIMUM 50% (NO EXCEPTIONS, NOT 100%)
- "Which is better, X or Y?" → MAXIMUM 50% (NO EXCEPTIONS, NOT 100%)

🔴 EXPLICIT EXAMPLES - YOU MUST FOLLOW THESE EXACTLY:

WRONG (DO NOT DO THIS):
Q: "Should I use Python or JavaScript?"
A: "Python is used for data science with libraries like NumPy, Pandas. JavaScript is used for web development with frameworks like React..."
Your judgment: "Facts about Python/JavaScript are documented → 100%"
❌ THIS IS COMPLETELY WRONG

RIGHT (DO THIS INSTEAD):
Q: "Should I use Python or JavaScript?"
A: "Python is used for data science with libraries like NumPy, Pandas. JavaScript is used for web development with frameworks like React..."
Your judgment: 
- Question type: "Should I use X or Y?" → APPLIES RULE → Maximum 50%
- Even though facts are grounded, the question is inherently opinion-based
- The recommendation depends on: project type, team skills, timeline, budget, scale
- No amount of factual accuracy changes the fact that this is a subjective recommendation
- Score: 38% (in the 35-50% range for subjective questions)
✅ THIS IS CORRECT

ANOTHER EXAMPLE - DO NOT REPEAT THE MISTAKE:
Q: "Should I use TypeScript?"
Your WRONG approach: "TypeScript is documented in official docs → 95%"
Your CORRECT approach: "This is 'Should I use X?' → Maximum 50% → Score: 40%"

MANDATORY HARD RULES (NO EXCEPTIONS, NOT SUGGESTIONS):
1. "Should I use..." questions = ABSOLUTE MAXIMUM 50% (even if answer is perfect)
2. "Is X better..." questions = ABSOLUTE MAXIMUM 50% (even if comparison is fair)
3. If response contains "should", "best", "optimal", "recommend" → deduct -20 points
4. If response compares options without declaring subjectivity → deduct -15 points
5. Performance claims without benchmarks → deduct -25 points
6. Any hallucination detected → deduct -40 to -100 points

THE DECISION TREE - FOLLOW EXACTLY:
STEP 1: Is this a subjective question? ("Should I", "Is X better", "Which is better") → YES = Maximum 50%, STOP HERE
STEP 2: Does response contain ONLY documented facts, ZERO inference? → YES = 95-100%, NO = Continue
STEP 3: Does response include "should", "best", "recommend"? → YES = Apply -20 (max 80%), Continue
STEP 4: Can every claim be verified in official docs? → YES = 80-95%, PARTIAL = 60-80%, NO = 40-60%
STEP 5: Any hallucinations? → YES = 0-40%, NO = Use score from Step 4

⚠️ FINAL CHECK - If your score is 90%+, verify ONLY these exist:
- Syntax definitions (const x = 5;)
- Direct API docs quotes
- Mathematical facts (2+2=4)
- Proven algorithms
Otherwise REDUCE THE SCORE!

EXPECTED SCORE DISTRIBUTION:
- 95-100%: RARE (<5% of responses) - only pure syntax/API docs
- 80-94%: COMMON (30%) - documented + minor inference
- 60-79%: VERY COMMON (40%) - mixed grounded + inferred
- 40-59%: COMMON (20%) - subjective/comparison questions
- 20-39%: OCCASIONAL (5%) - speculative or opinion-based
- 0-19%: RARE (<1%) - hallucinations detected

🚨 SCORING ALGORITHM - YOU MUST EXECUTE THIS (not optional):

EXECUTE THIS BEFORE SETTING confidence_score:
1. READ the original user question (the FULL question, not just the topic)
2. CHECK: Does the question contain "Should I", "Is X better", "Should I use", "Which is better", "Is X worth"?
   → If YES, go to step 3
   → If NO, go to step 4
3. [FOR SUBJECTIVE QUESTIONS]:
   score = 38 (this is the default for subjective questions)
   Reason: "This is a [subjective question type] - inherently opinion-based"
   hallucination_risk = "MEDIUM" (or LOW if no hallucinations)
   DO NOT CONTINUE TO STEP 4 - STOP HERE AND USE score = 38
4. [FOR OBJECTIVE QUESTIONS]:
   Count: grounded_claims, inferred_claims, unverified_claims
   If all_grounded AND no_inference: score = 95
   Else if mostly_grounded: score = 75
   Else if mixed: score = 60
   Else: score = 40
5. Check for hallucinations:
   If ANY hallucination: score = score - 40 (minimum 0)
6. SET confidence_score = score
7. DONE

CRITICAL: This algorithm OVERRIDES any other reasoning. If step 3 applies (subjective question), the score IS 35-50%, PERIOD.

EXAMPLES OF THE ALGORITHM IN ACTION:

Example 1: "Should I use Python or JavaScript?"
Step 1: Read question
Step 2: CHECK - YES, contains "Should I use"
Step 3: This is subjective → score = 38
Result: confidence_score: 38 ✅ CORRECT
(Do not proceed to step 4)

Example 2: "What is arrow function syntax in JavaScript?"
Step 1: Read question
Step 2: CHECK - NO, does not contain subjective keywords
Step 4: Evaluate facts → grounded facts → score = 95
Result: confidence_score: 95 ✅ CORRECT

Example 3: "Should I use TypeScript? (with perfect response)"
Step 1: Read question
Step 2: CHECK - YES, contains "Should I use"
Step 3: This is subjective → score = 38 (even if response is perfect)
Result: confidence_score: 38 ✅ CORRECT
(The perfection of facts does NOT change step 3 result)

🔴 RED FLAGS - IF YOU SEE THESE, YOU'RE DOING SCORING WRONG:
- Most scores above 85% → TOO HIGH
- "Should I use..." scores above 50% → TOO HIGH
- Score of 100% for recommendations → TOO HIGH
- Every response above 80% → TOO HIGH

Remember: Vary your scores. 60-80% is normal. 95-100% should be RARE.`;

  // ─── TOAST NOTIFICATION SYSTEM ─────────────────────
  function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existing = document.getElementById('clarity-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'clarity-toast';
    toast.style.cssText = `
      position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
      padding: 14px 24px; border-radius: 12px; z-index: 10000;
      font-family: 'Inter', sans-serif; font-size: 0.85rem; font-weight: 500;
      max-width: 520px; text-align: center; line-height: 1.4;
      animation: toastSlideUp 0.4s ease-out;
      backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 8px 32px rgba(0,0,0,0.4);
      ${type === 'warning'
        ? 'background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.4); color: #FBBF24;'
        : type === 'error'
          ? 'background: rgba(248, 113, 113, 0.15); border: 1px solid rgba(248, 113, 113, 0.4); color: #F87171;'
          : type === 'success'
            ? 'background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.4); color: #34D399;'
            : 'background: rgba(167, 139, 250, 0.15); border: 1px solid rgba(167, 139, 250, 0.4); color: #A78BFA;'
      }
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Add animation keyframes if not present
    if (!document.getElementById('toast-keyframes')) {
      const style = document.createElement('style');
      style.id = 'toast-keyframes';
      style.textContent = `
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes toastFadeOut {
          from { opacity: 1; }
          to { opacity: 0; transform: translateX(-50%) translateY(20px); }
        }
      `;
      document.head.appendChild(style);
    }

    // Auto-dismiss after 6 seconds
    setTimeout(() => {
      toast.style.animation = 'toastFadeOut 0.4s ease-in forwards';
      setTimeout(() => toast.remove(), 400);
    }, 6000);
  }

  // ─── GEMINI API WITH RETRY & FALLBACK ──────────────
  async function callGeminiAPI(prompt, model) {
    const url = `${CONFIG.GEMINI_ENDPOINT}${model}:generateContent?key=${state.apiKey}`;
    console.log(`[Clarity] Calling model: ${model}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: GEMINI_SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
          maxOutputTokens: 8192
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      const err = new Error(`Gemini API error ${response.status}`);
      err.status = response.status;
      err.body = errorText;
      throw err;
    }

    return await response.json();
  }

  async function generateGeminiResponse(prompt) {
    const models = [CONFIG.GEMINI_MODEL, CONFIG.GEMINI_FALLBACK_MODEL];
    let lastError = null;

    for (const model of models) {
      for (let attempt = 1; attempt <= CONFIG.API_MAX_RETRIES; attempt++) {
        try {
          // Update typing indicator with retry info
          const typingText = document.querySelector('.typing-text');
          if (typingText) {
            if (attempt > 1) {
              typingText.textContent = `Retrying (attempt ${attempt}/${CONFIG.API_MAX_RETRIES}) on ${model}...`;
            } else if (model !== CONFIG.GEMINI_MODEL) {
              typingText.textContent = `Trying fallback model (${model})...`;
            }
          }

          const data = await callGeminiAPI(prompt, model);
          console.log('[Clarity] Raw API data:', data);

          if (model !== CONFIG.GEMINI_MODEL) {
            showToast(`✓ Response generated using fallback model (${model})`, 'success');
          }

          return parseGeminiResponse(data);

        } catch (err) {
          lastError = err;
          console.warn(`[Clarity] ${model} attempt ${attempt} failed:`, err.status || err.message);

          if (err.status === 429) {
            // Rate limited — wait with exponential backoff before retrying
            const waitMs = CONFIG.API_INITIAL_BACKOFF_MS * Math.pow(2, attempt - 1);
            console.log(`[Clarity] Rate limited. Waiting ${waitMs}ms before retry...`);

            const typingText = document.querySelector('.typing-text');
            if (typingText) {
              typingText.textContent = `Rate limited — waiting ${Math.round(waitMs / 1000)}s before retry...`;
            }

            await delay(waitMs);
            continue; // retry same model
          }

          // For non-429 errors, don't retry — break to try next model
          break;
        }
      }
      // If we exhausted retries on this model due to 429, try the next model
      console.log(`[Clarity] Exhausted retries on ${model}, trying next...`);
    }

    // All models exhausted
    throw lastError || new Error('All API models exhausted');
  }

  function parseGeminiResponse(data) {
    if (!data || !data.candidates || data.candidates.length === 0 || !data.candidates[0].content || !data.candidates[0].content.parts || data.candidates[0].content.parts.length === 0) {
      console.error('[Clarity] Invalid or blocked API response:', data);
      throw new Error('Gemini API did not return valid content. It may have been blocked or rate-limited.');
    }
    const text = data.candidates[0].content.parts[0].text;
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (parseErr) {
      console.error('[Clarity] JSON parse failed:', parseErr, 'Raw text:', text);
      return {
        mainResponse: text.replace(/\n/g, '<br>'),
        segments: [],
        clarityCard: {
          completeness: { rating: 'Partial', icon: '◐', detail: 'Response could not be fully structured.' },
          reasoning: { rating: 'Mixed', icon: '◐', detail: 'Auto-generated assessment.' },
          assumptions: ['Response generated via live AI'],
          risks: ['Structured evaluation unavailable for this response'],
          alternatives: ['Try rephrasing the prompt'],
          verification: ['Cross-reference key claims with authoritative sources']
        },
        nudges: []
      };
    }

    // Ensure mainResponse exists
    if (!parsed.mainResponse) {
      if (parsed.segments && parsed.segments.length > 0) {
        parsed.mainResponse = parsed.segments.map(s => s.content).join('');
      } else {
        parsed.mainResponse = '<p>Response generated successfully.</p>';
      }
    }

    if (!parsed.segments) parsed.segments = [];

    parsed.segments.forEach((seg, i) => {
      if (!seg.id) seg.id = `api-${i + 1}`;
      if (!seg.type) seg.type = 'grounded';
      if (!seg.annotation) seg.annotation = {
        reasoning: 'Analysis based on available information.',
        evidence: 'General knowledge and domain expertise.',
        counterpoint: 'Alternative interpretations may exist.'
      };
    });

    if (!parsed.clarityCard) {
      parsed.clarityCard = {
        completeness: { rating: 'Partial', icon: '◐', detail: 'Auto-generated assessment.' },
        reasoning: { rating: 'Mixed', icon: '◐', detail: 'Auto-generated assessment.' },
        assumptions: ['Response generated via live AI — assumptions were inferred from prompt'],
        risks: ['Live-generated content should be independently verified'],
        alternatives: ['Re-prompt with more specific context for targeted results'],
        verification: ['Cross-reference key claims with authoritative sources']
      };
    }

    if (!parsed.nudges) parsed.nudges = [];
    if (!parsed.references) parsed.references = [];

    console.log('[Clarity] Final parsed response:', parsed);
    return parsed;
  }

  // ─── API SETTINGS MODAL ──────────────────────────────
  function initAPIModal() {
    dom.apiSettingsBtn.addEventListener('click', () => {
      dom.apiModal.classList.remove('hidden');
    });

    dom.modalClose.addEventListener('click', closeModal);
    dom.modalSave.addEventListener('click', saveAPISettings);

    dom.apiModal.addEventListener('click', (e) => {
      if (e.target === dom.apiModal) closeModal();
    });

    // Mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('mode-' + tab.dataset.mode).classList.add('active');
      });
    });

    // Key visibility toggle
    dom.toggleKeyVis.addEventListener('click', () => {
      const input = dom.apiKeyInput;
      input.type = input.type === 'password' ? 'text' : 'password';
      dom.toggleKeyVis.textContent = input.type === 'password' ? '👁' : '🔒';
    });

    loadAPISettings();
  }

  function closeModal() {
    dom.apiModal.classList.add('hidden');
  }

  function saveAPISettings() {
    const activeTab = document.querySelector('.mode-tab.active');
    state.apiMode = activeTab.dataset.mode;
    state.apiKey = dom.apiKeyInput.value.trim();

    // Save to localStorage
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({
        mode: state.apiMode,
        key: state.apiKey
      }));
    } catch (e) { /* localStorage may be unavailable */ }

    // Update UI
    updateModelBadge();
    closeModal();
  }

  function loadAPISettings() {
    try {
      const stored = JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY));
      if (stored && stored.key) {
        state.apiMode = stored.mode || 'api';
        state.apiKey = stored.key;
      }
    } catch (e) { /* localStorage may be unavailable */ }

    // Always update UI to match current state
    dom.apiKeyInput.value = state.apiKey;
    if (state.apiMode === 'api') {
      const apiTab = document.querySelector('.mode-tab[data-mode="api"]');
      if (apiTab) {
        document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.mode-panel').forEach(p => p.classList.remove('active'));
        apiTab.classList.add('active');
        document.getElementById('mode-api').classList.add('active');
      }
    }

    updateModelBadge();
  }

  function updateModelBadge() {
    if (state.apiMode === 'api' && state.apiKey) {
      dom.modelName.textContent = 'Clarity AI · Live';
      dom.apiStatusDot.classList.add('active');
      dom.apiStatusText.textContent = 'Connected';
    } else {
      dom.modelName.textContent = 'Clarity AI · Simulator';
      dom.apiStatusDot.classList.remove('active');
      dom.apiStatusText.textContent = 'Not connected';
    }
  }

  // ─── COPY GATE MODAL ────────────────────────────────────
  function initCopyGateModal() {
    dom.copyGateClose.addEventListener('click', closeCopyGateModal);
    dom.copyGateCancel.addEventListener('click', closeCopyGateModal);
    dom.copyGateConfirm.addEventListener('click', confirmCopyGate);

    dom.gateConfirmAvr.addEventListener('change', updateCopyGateButton);
    dom.gateConfirmReview.addEventListener('change', updateCopyGateButton);

    dom.copyGateModal.addEventListener('click', (e) => {
      if (e.target === dom.copyGateModal) closeCopyGateModal();
    });
  }

  function updateCopyGateButton() {
    const canProceed = dom.gateConfirmAvr.checked && dom.gateConfirmReview.checked;
    dom.copyGateConfirm.disabled = !canProceed;
  }

  function closeCopyGateModal() {
    dom.copyGateModal.classList.add('hidden');
    state.pendingCopyContent = null;
    state.copyGateConfirmed = false;
    dom.gateConfirmAvr.checked = false;
    dom.gateConfirmReview.checked = false;
  }

  function showCopyGateModal(avrScore) {
    dom.copyGateAvrValue.textContent = avrScore + '%';
    state.copyGateConfirmed = false;
    dom.gateConfirmAvr.checked = false;
    dom.gateConfirmReview.checked = false;
    dom.copyGateConfirm.disabled = true;
    dom.copyGateModal.classList.remove('hidden');
  }

  function confirmCopyGate() {
    state.copyGateConfirmed = true;
    closeCopyGateModal();
    
    if (state.pendingCopyContent) {
      navigator.clipboard.writeText(state.pendingCopyContent).then(() => {
        showToast('✓ Content copied to clipboard', 'success');
      }).catch(() => {
        showToast('⚠️ Failed to copy. Try manual selection.', 'warning');
      });
    }
  }

  // ─── SHOW TOAST MESSAGE ─────────────────────────────────
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.classList.add('visible');
    }, 10);
    
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ─── DASHBOARD RENDERING ─────────────────────────────
  function renderDashboard() {
    // Sync live stats before rendering
    syncDashboardStats();
    renderHeroMetrics();
    renderCalibrationChart();
    renderPatternsChart();
    renderDomainBars();
    renderGrowthCards();
    renderInsights();
  }

  function syncDashboardStats() {
    // Add custom session interactions to dashboard data
    const stats = state.sessionStats;
    if (stats.customSessions > 0) {
      dashboardData.weeklyComparison.thisWeek.sessions += stats.customSessions;
      dashboardData.weeklyComparison.thisWeek.lensUsage = Math.min(100, dashboardData.weeklyComparison.thisWeek.lensUsage + stats.lensToggles * 3);
      dashboardData.weeklyComparison.thisWeek.cardExpansions += stats.cardExpansions;

      // Bump latest calibration score slightly based on engagement
      const timeline = dashboardData.calibrationTimeline;
      const latest = timeline[timeline.length - 1];
      const engagementBonus = Math.min(10, Math.floor((stats.lensToggles + stats.cardExpansions + stats.segmentsClicked) / 3));
      latest.score = Math.min(100, latest.score + engagementBonus);
      latest.actions += stats.customSessions;
    }
  }

  function renderHeroMetrics() {
    const container = document.getElementById('metric-hero-row');
    const data = dashboardData.growthIndicators;

    container.innerHTML = data.map(d => {
      const change = d.current - d.previous;
      const changePercent = Math.round((change / d.previous) * 100);
      return `
        <div class="metric-hero-card">
          <div class="metric-hero-value">${d.current}${d.unit}</div>
          <div class="metric-hero-label">${d.label}</div>
          <div class="metric-hero-desc">${d.description}</div>
          <span class="metric-change positive">↑ +${changePercent}% from baseline</span>
        </div>
      `;
    }).join('');
  }

  function renderCalibrationChart() {
    const canvas = document.getElementById('calibration-chart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const data = dashboardData.calibrationTimeline;
    const padding = { top: 30, right: 30, bottom: 40, left: 50 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    ctx.clearRect(0, 0, w, h);

    // Grid
    ctx.strokeStyle = getCSS('--chart-grid') || '#1E1E1E';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    // Y-axis labels
    ctx.fillStyle = getCSS('--text-muted') || '#6B6560';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
      const val = 100 - (i * 25);
      const y = padding.top + (chartH / 4) * i;
      ctx.fillText(val + '%', padding.left - 10, y + 4);
    }

    // X-axis labels
    ctx.textAlign = 'center';
    data.forEach((d, i) => {
      const x = padding.left + (chartW / (data.length - 1)) * i;
      ctx.fillText(d.week, x, h - 10);
    });

    // Data points
    const points = data.map((d, i) => ({
      x: padding.left + (chartW / (data.length - 1)) * i,
      y: padding.top + chartH - (d.score / 100) * chartH
    }));

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, 'rgba(217, 119, 87, 0.25)');
    gradient.addColorStop(1, 'rgba(217, 119, 87, 0.0)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, h - padding.bottom);
    drawSmoothCurve(ctx, points);
    ctx.lineTo(points[points.length - 1].x, h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.beginPath();
    drawSmoothCurve(ctx, points);
    ctx.strokeStyle = getCSS('--accent') || '#D97757';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Points
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = getCSS('--accent') || '#D97757';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    });
  }

  function drawSmoothCurve(ctx, points) {
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      ctx.bezierCurveTo(cpx, prev.y, cpx, curr.y, curr.x, curr.y);
    }
  }

  function renderPatternsChart() {
    const canvas = document.getElementById('patterns-chart');
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) / 2 - 15;
    const innerRadius = radius * 0.55;

    const data = dashboardData.evaluationPatterns;
    const items = [
      { ...data.accepted, color: '#34D399' },
      { ...data.revised, color: '#FBBF24' },
      { ...data.rejected, color: '#F87171' },
      { ...data.flagged, color: '#A78BFA' }
    ];

    const total = items.reduce((s, d) => s + d.count, 0);
    let startAngle = -Math.PI / 2;

    items.forEach(item => {
      const sliceAngle = (item.count / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Center text
    ctx.fillStyle = getCSS('--text-primary') || '#F5F5F4';
    ctx.font = '700 1.4rem Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(total, cx, cy + 2);
    ctx.fillStyle = getCSS('--text-muted') || '#6B6560';
    ctx.font = '500 0.65rem Inter, sans-serif';
    ctx.fillText('total actions', cx, cy + 16);

    // Legend
    const legend = document.getElementById('patterns-legend');
    legend.innerHTML = items.map(d => `
      <div class="legend-entry">
        <span class="legend-color" style="background:${d.color}"></span>
        <span class="legend-text">${d.label} <span class="legend-percent">${d.percent}%</span></span>
      </div>
    `).join('');
  }

  function renderDomainBars() {
    const container = document.getElementById('domain-bars');
    container.innerHTML = dashboardData.domainCalibration.map(d => `
      <div class="domain-bar-item">
        <div class="domain-bar-header">
          <span class="domain-bar-label">${d.domain}</span>
          <div class="domain-bar-stats">
            <span class="domain-bar-score">${d.score}%</span>
            <span class="domain-bar-trend">↑ ${d.trend}</span>
            <span class="domain-bar-sessions">${d.sessions} sessions</span>
          </div>
        </div>
        <div class="domain-bar-track">
          <div class="domain-bar-fill" style="width:${d.score}%"></div>
        </div>
      </div>
    `).join('');
  }

  function renderGrowthCards() {
    const container = document.getElementById('growth-cards');
    container.innerHTML = dashboardData.growthIndicators.map(d => {
      const change = d.current - d.previous;
      const pct = Math.round((change / d.previous) * 100);
      return `
        <div class="growth-card">
          <div class="growth-card-value">${d.current}${d.unit}</div>
          <div class="growth-card-label">${d.label}</div>
          <span class="growth-card-change positive">+${pct}% improvement</span>
        </div>
      `;
    }).join('');
  }

  function renderInsights() {
    const container = document.getElementById('insights-list');
    container.innerHTML = dashboardData.insights.map(d => `
      <div class="insight-card insight-${d.type}">
        <span class="insight-icon">${d.icon}</span>
        <span class="insight-text">${d.text}</span>
      </div>
    `).join('');
  }

  // ─── INITIALIZATION ──────────────────────────────────
  switchScenario('custom');
  initChatInput();
  initAPIModal();
  initCopyGateModal();
  updateAVRMeter();

})();
