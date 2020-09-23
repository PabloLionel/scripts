class UserPick extends FileReader {
  constructor({ el, srcImgDefault }) {
    super();
    this.$el = this._getEl(el);
    this.loadPreview(srcImgDefault || 'assets/no-image-found.png');
    this.$image = new Image();
    this.loadControls();
  }
  _getEl(el) {
    if (typeof el === 'string') {
      return document.querySelector(el);
    }
    return el;
  }
  /**
   *
   * para leer archivos csv, texto, etc...
   * reader.readAsText(e.target.files[0], false)
   * para enviar al servidor en un buffar array de bytes.
   * reader.readAsArrayBuffer(e.target.files[0])
   * para optener un url del archivo (setear una imagen):
   * reader.readAsDataURL(e.target.files[0])
   */
  loadFile({ files }) {
    const file = files[0];
    if (file.type.match(/image\/*/) !== null) {
      this.readAsDataURL(file);
    }
  }
  loadControls() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.innerText = '+';
    this.onload = () => {
      this.loadPreview(this.result);
    };
    input.addEventListener('change', ({ target }) => this.loadFile(target));
    const btn = document.createElement('button');
    btn.setAttribute('class', 'control');
    btn.innerText = '+';
    btn.addEventListener('click', () => input.click());
    this.$el.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    this.$el.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.loadFile(e.dataTransfer);
    });
    this.$el.appendChild(btn);
  }
  loadPreview(img) {
    this.$el.style.backgroundImage = `url(${img})`;
  }
  // get getImage() {}
  // get getImage() {}
  // get getImage() {}
  // get getImgTag() {}
}

new UserPick({
  el: '#test',
});
