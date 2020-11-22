import { customElement, html, css, unsafeCSS, LitElement, property } from 'lit-element';
import { router } from '../../../../client-packages/router/router';
import { RoutePath } from '../../app/app.component';
import { menuController } from '@ionic/core';
const sharedCSS = require('../../shared.scss');
const componentName = 'navigation-item';
const componentCSS = require(`./${componentName}.component.scss`);

export interface NavigationItem {
  title: string;
  routePath: RoutePath;
  icon: string;
  // Indicates if the icon should be aligned to start or end. Defaults to `start`
  iconSlot?: 'start' | 'end';
}

@customElement(`app-${componentName}`)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class NavigationItemComponent extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(sharedCSS)}
    `,
    css`
      ${unsafeCSS(componentCSS)}
    `
  ];

  @property()
  navigationItem!: NavigationItem;

  render() {
    return html`
      <ion-item @click=${() => this.navigateTo(this.navigationItem.routePath)}
        ><ion-icon slot="${this.navigationItem.iconSlot || 'start'}" name="${this.navigationItem.icon}"></ion-icon
        ><ion-label>${this.navigationItem.title}</ion-label></ion-item
      >
    `;
  }

  /**
   * Navigates to route and closes ionic menu
   * @param routePath - Relative route path
   */
  navigateTo(routePath: RoutePath) {
    router.navigate(routePath);
    menuController.close();
  }
}
