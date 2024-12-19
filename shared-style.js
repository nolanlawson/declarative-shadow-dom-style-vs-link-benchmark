// via https://eisenbergeffect.medium.com/sharing-styles-in-declarative-shadow-dom-c5bf84ffd311

const lookup = new Map()

function makeSheet(css) {
  const sheet = new CSSStyleSheet()
  sheet.replaceSync(css)
  return sheet
}

class SharedStyle extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('style-id')
    const root = this.getRootNode()

    let sheet = lookup.get(id)
    if (!sheet) {
      const element = root.getElementById(id)
      sheet = makeSheet(element.innerHTML)
      lookup.set(id, sheet)
      element.remove()
    }

    root.adoptedStyleSheets.push(sheet)
    this.remove()
  }
}

customElements.define('shared-style', SharedStyle)
