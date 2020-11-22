import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element';
import { router } from '../../../client-packages/router/router';
import { NavigationItem } from '../widgets/navigation-item/navigation-item.component';
import avatar from './../../assets/icons/avatar.svg';
const sharedCSS = require('../shared.scss');
const componentCSS = require('./app.component.scss');

export type RoutePath = 'home' | 'messages' | 'my-trailers' | 'users/sign-in' | 'users/sign-up' | 'users/sign-out';
@customElement('app-root')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AppComponent extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(sharedCSS)}
    `,
    css`
      ${unsafeCSS(componentCSS)}
    `
  ];
  @property()
  title = 'app';

  @property({ type: Array })
  navigationItems: NavigationItem[] = [
    { title: 'Suchen', routePath: 'home', icon: 'search-outline' },
    { title: 'Nachrichten', routePath: 'messages', icon: 'pencil-outline' },
    { title: 'Anhänger hinzufügen', routePath: 'my-trailers', icon: 'add-outline' },
    { title: 'Anhänger verwalten', routePath: 'my-trailers', icon: 'copy-outline' }
  ];

  /**
   * Disables shadow dom to make the ionic menu work
   */
  createRenderRoot() {
    return this;
  }

  firstUpdated() {
    router.subscribe(() => this.requestUpdate());
  }

  renderRouterOutlet() {
    switch (router.getPath() as RoutePath) {
      case 'users/sign-in':
        return html`<app-sign-in></app-sign-in>`;
      case 'users/sign-up':
        return html`<app-sign-up></app-sign-up>`;
      case 'users/sign-out':
        return html`<app-sign-out></app-sign-out>`;
      case 'messages':
        return html`<app-messages></app-messages>`;
      case 'my-trailers':
        return html`<app-my-trailers></app-my-trailers>`;
      case 'home':
        return html`<app-home></app-home>`;
      default:
        return html`<app-home></app-home>`;
    }
  }

  render() {
    return html`
      <ion-app>
        <ion-menu side="start" menu-id="first" content-id="main">
          <ion-header>
            <ion-toolbar color="primary">
              <ion-avatar class="ion-margin">
                <img src="${avatar}" />
              </ion-avatar>
              <ion-button class="ion-margin">Anmelden</ion-button>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-list>
              ${this.navigationItems.map(
      navigationItem => html` <app-navigation-item .navigationItem="${navigationItem}"></app-navigation-item>`
    )}
            </ion-list>
          </ion-content>
        </ion-menu>

        <div class="ion-page" id="main">
          <ion-header>
            <ion-toolbar color="primary" class="ion-padding-vertical">
              <ion-buttons slot="start">
                <ion-menu-button></ion-menu-button>
                <ion-searchbar placeholder="Anhänger suchen" class="ion-padding-horizontal"></ion-searchbar>
                <ion-icon name="locate-outline" style="font-size: xx-large; cursor: pointer"></ion-icon>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content class="ion-padding"> ${this.renderRouterOutlet()} </ion-content>
        </div>
      </ion-app>
    `;
  }
}
