class DarkMode extends HTMLElement{
    constructor(){
        super()

        this.shadow = this.attachShadow({ mode: "open" })

        this.container = document.createElement("input")
        this.container.setAttribute("type", "checkbox")
        this.container.setAttribute("id", "toggle")

        this.container.innerHTML = `
        <style>
            #toggle {
                appearance: none;
                -webkit-appearance: none;
                -moz-appearance: none;
                width: 60px;
                height: 30px;
                border-radius: 30px;
                background-color: #333;
                position: absolute;
                top: 20px;
                right: 50px;
                transition: all 0.5s ease-in;
                cursor: pointer;
                z-index: 1;
            }
            
            /* Making a dot switch inside the Toggle Button */
            #toggle::before {
                content: "";
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #eee;
                position: absolute;
                top: 50%;
                left: 3px;
                transform: translateY(-50%);
                transition: all 0.5s ease-in;
            }
            
            /* Changing toggle button background when checked */
            #toggle:checked {
                background: #03ffc0;
            }
            
            /* Changing dot switch color and moving to the right side when checked */
            #toggle:checked::before {
                background: #333;
                left: 32px;
            }
        </style>
        `

        this.shadow.appendChild(this.container)
    }

    connectedCallback(){
        this.render()
    }

    render(){
        this.shadow.addEventListener("change", () => {
            document.body.classList.toggle("dark-mode")
        })
    }
}
customElements.define("dark-mode", DarkMode)