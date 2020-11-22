import { css, customElement, html, LitElement, property, query, unsafeCSS } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { guard } from 'lit-html/directives/guard';
import { httpClient } from '../../http-client';
import { router } from '../../../client-packages/router/router';
import { PageMixin } from '../page.mixin';

interface Task {
  id: string;
  title: string;
  status: 'open' | 'done';
}

const sharedCSS = require('../shared.scss');
const componentCSS = require('./my-trailers.component.scss');

@customElement('app-my-trailers')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyTrailersComponent extends PageMixin(LitElement) {
  static styles = [
    css`
      ${unsafeCSS(sharedCSS)}
    `,
    css`
      ${unsafeCSS(componentCSS)}
    `
  ];

  @property() private tasks: Task[] = [];

  async firstUpdated() {
    try {
      const response = await httpClient.get('tasks' + location.search);
      this.tasks = (await response.json()).results;
    } catch ({ message, statusCode }) {
      if (statusCode === 401) {
        router.navigate('users/sign-in');
      } else {
        this.setNotification({ errorMessage: message });
      }
    }
  }

  render() {
    return html` <h1>My Trailers</h1> `;
  }
}
