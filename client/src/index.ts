import '@ionic/core/css/ionic.bundle.css';
import { defineCustomElements } from '@ionic/core/loader';
defineCustomElements(window).then(() => {
  /* Ionic is loaded! */
});

import './index.scss';
import './components/app/app.component.ts';
import './components/sign-in/sign-in.component.ts';
import './components/sign-up/sign-up.component.ts';
import './components/widgets/notification/notification.component.ts';
import './components/widgets/navigation-item/navigation-item.component.ts';
import './components/sign-out/sign-out.component.ts';
import './components/home/home.component.ts';
import './components/my-trailers/my-trailers.component.ts';
import './components/messages/messages.component.ts';
