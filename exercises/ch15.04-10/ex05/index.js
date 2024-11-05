customElements.define(
  "inline-circle",
  class InlineCircle extends HTMLElement {
    connectedCallback() {
      this.style.display = "inline-block";
      // if文を追加(border-raduisの初期値を設定)
      if (!this.style.borderRadius) {
        this.style.borderRadius = "50%";
      }
      // if文を追加(borderの初期値を設定)
      if (
        !this.style.borderColor &&
        !this.style.borderWidth &&
        !this.style.borderStyle
      ) {
        this.style.border = "solid black 1px";
      }
      this.style.transform = "translateY(10%)";
      if (!this.style.width) {
        this.style.width = "0.8em";
        this.style.height = "0.8em";
      }
    }

    static get observedAttributes() {
      return ["diameter", "color", "border-color", "border-radius"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case "diameter":
          this.style.width = newValue;
          this.style.height = newValue;
          break;
        case "color":
          this.style.backgroundColor = newValue;
          break;
        case "border-color":
          this.style.border = `solid ${newValue} 1px`;
          break;
        case "border-radius":
          this.style.borderRadius = newValue;
          break;
      }
    }
    get diameter() {
      return this.getAttribute("diameter");
    }
    set diameter(diameter) {
      this.setAttribute("diameter", diameter);
    }
    get color() {
      return this.getAttribute("color");
    }
    set color(color) {
      this.setAttribute("color", color);
    }
    get borderColor() {
      return this.getAttribute("border-color");
    }
    set borderColor(color) {
      this.setAttribute("border-color", color);
    }
    get borderRadius() {
      return this.getAttribute("border-radius");
    }
    set borderRadius(borderRadius) {
      this.setAttribute("border-radius", borderRadius);
    }
  }
);
