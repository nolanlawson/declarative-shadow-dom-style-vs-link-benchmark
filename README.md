# declarative-shadow-dom-style-vs-link-benchmark

This is a browser benchmark of loading 100 declarative shadow roots, each containing `<link rel=stylesheet>`s for Bootstrap.css, plus some HTML markup, versus roughly the same thing using `<style>`s rather than `<link>`s.

Usage:

    npm i
    npm test
