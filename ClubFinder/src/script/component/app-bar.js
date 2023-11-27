import logoImage from "../../assets/Vector_Logo.png";

class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="${logoImage}"
              alt="Logo"
              width="30"
              height="30"
              class="d-inline-flex align-text-top"
            />
            <h2 class="d-inline-flex align-text-top ml-2">Movies Collection</h2>
          </a>
        </div>
      </nav>
        `;
  }
}

customElements.define("app-bar", AppBar);
