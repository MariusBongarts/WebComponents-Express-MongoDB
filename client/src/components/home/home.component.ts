import { css, customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import { PageMixin } from '../page.mixin';

const sharedCSS = require('../shared.scss');
const componentCSS = require('./home.component.scss');

@customElement('app-home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class HomeComponent extends PageMixin(LitElement) {

  static styles = [
    css`
      ${unsafeCSS(sharedCSS)}
    `,
    css`
      ${unsafeCSS(componentCSS)}
    `
  ];

  render() {
    return html` <h1>Home</h1>`;
  }
}
