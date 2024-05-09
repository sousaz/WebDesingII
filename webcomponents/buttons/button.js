class Buttons extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({mode: "open"});

    this.container = document.createElement("button");
    this.container.setAttribute("class", "button");
    const color = this.getAttribute("color");
    const width = this.getAttribute("width");
    this.container.innerHTML = `
      <style>
        .button{
          display: inline-block;
          padding: 10px 20px;
          background-color: #${color};
          color: ${this.isColorDark(color) ? "#fff" : "#000"};
          font-size: ${this.whatWidth(width)};
          border: none;
          border-radius: 5px;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
        .button:hover{
          transform: scale(1.03);
        }
      </style>
    `

    this.shadow.appendChild(this.container);
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const text = this.getAttribute("text");
    this.container.innerHTML += text;
  }

  isColorDark(color) {
    const r = parseInt(color.substring(1, 3), 16) / 255;
    const g = parseInt(color.substring(3, 5), 16) / 255;
    const b = parseInt(color.substring(5, 7), 16) / 255;
    
    const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminosity < 0.5;
  }

  whatWidth(width) {
    switch (width) {
      case "g":
        return "22px";
      case "l":
        return "30px";
      default:
        return "16px";
    }
  }
}

customElements.define("my-button", Buttons);