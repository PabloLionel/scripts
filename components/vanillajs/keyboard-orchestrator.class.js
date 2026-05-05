class KeyboardOrchestrator {
  constructor() {
    this.mode = 'normal'; // Estados posibles: 'normal' | 'hints'
    this.hintsMap = new Map(); // Mapea combinaciones de letras a elementos del DOM
    this.hintOverlays = []; // Guarda las etiquetas visuales (UI)
    this.typedKeys = ''; // Almacena lo que el usuario tipea en modo pistas
    
    this.init();
  }

  init() {
    // Escucha centralizada en el nivel más alto del documento
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  handleKeyDown(event) {
    // 1. Activar Modo Pistas (Alt + F)
    if (event.altKey && event.key.toLowerCase() === 'f') {
      event.preventDefault();
      this.toggleHintMode();
      return;
    }

    // 2. Comportamiento según el modo actual
    if (this.mode === 'hints') {
      this.handleHintModeKeys(event);
    } else {
      this.handleNormalModeKeys(event);
    }
  }

  handleNormalModeKeys(event) {
    const activeEl = document.activeElement;

    switch (event.key) {
      case 'Enter':
        // Si el elemento tiene un método click, lo ejecutamos
        if (activeEl && typeof activeEl.click === 'function') {
          activeEl.click();
        }
        break;
      case ' ': // Espacio
        if (activeEl && activeEl.tagName === 'LI') {
          // Lógica específica para listas (ej. marcar un checkbox interno)
          activeEl.classList.toggle('selected');
          event.preventDefault(); // Evita el scroll por defecto
        }
        break;
      case 'Escape':
        if (activeEl) activeEl.blur(); // Quita el foco
        // Aquí también iría la lógica para cerrar modales o menús desplegables
        break;
      case 'ArrowDown':
      case 'ArrowUp':
      case 'ArrowLeft':
      case 'ArrowRight':
        // Lógica de navegación espacial. 
        // Podrías usar tabindex o calcular posiciones relativas en el DOM.
        this.navigateDirectional(event.key);
        break;
    }
  }

  handleHintModeKeys(event) {
    if (event.key === 'Escape') {
      this.clearHints();
      return;
    }

    // Si el usuario presiona una letra
    if (/^[a-zA-Z]$/.test(event.key)) {
      this.typedKeys += event.key.toUpperCase();
      this.filterHints(); // Actualizar la UI para mostrar solo los que coinciden
      
      // Si la combinación tipeada coincide exactamente con un hint
      if (this.hintsMap.has(this.typedKeys)) {
        const targetElement = this.hintsMap.get(this.typedKeys);
        targetElement.focus();
        targetElement.click(); // Opcional: hacer clic automáticamente
        this.clearHints();
      }
    }
  }

  toggleHintMode() {
    if (this.mode === 'hints') {
      this.clearHints();
    } else {
      this.mode = 'hints';
      this.generateHints();
    }
  }

  generateHints() {
    // Buscar todos los elementos interactivos
    const interactables = document.querySelectorAll('button, a, input, [tabindex]:not([tabindex="-1"])');
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentHintIndex = 0;

    interactables.forEach((el) => {
      // Ignorar elementos ocultos
      if (el.offsetWidth === 0 && el.offsetHeight === 0) return;

      // Generar combinación (AA, AB, AC...)
      const firstLetter = letters[Math.floor(currentHintIndex / letters.length) % letters.length];
      const secondLetter = letters[currentHintIndex % letters.length];
      const hintKey = (interactables.length > 26 ? firstLetter + secondLetter : secondLetter).toUpperCase();
      
      this.hintsMap.set(hintKey, el);
      this.drawHintOverlay(el, hintKey);
      currentHintIndex++;
    });
  }

  drawHintOverlay(element, hintKey) {
    const rect = element.getBoundingClientRect();
    const overlay = document.createElement('div');
    
    overlay.textContent = hintKey;
    overlay.style.position = 'absolute';
    overlay.style.top = `${rect.top + window.scrollY}px`;
    overlay.style.left = `${rect.left + window.scrollX}px`;
    overlay.style.backgroundColor = '#ffeb3b';
    overlay.style.color = '#000';
    overlay.style.padding = '2px 4px';
    overlay.style.fontSize = '12px';
    overlay.style.fontWeight = 'bold';
    overlay.style.zIndex = '9999';
    overlay.style.border = '1px solid #000';
    
    document.body.appendChild(overlay);
    this.hintOverlays.push(overlay);
  }

  clearHints() {
    this.hintOverlays.forEach(overlay => overlay.remove());
    this.hintOverlays = [];
    this.hintsMap.clear();
    this.typedKeys = '';
    this.mode = 'normal';
  }

  navigateDirectional(direction) {
    // Aquí puedes implementar el enfoque del próximo elemento.
    // Una opción simple es obtener un array de elementos enfocables y mover el índice.
    console.log(`Navegando hacia: ${direction}`);
  }
}

// Inicializar el orquestador
const keyboardUI = new KeyboardOrchestrator();
