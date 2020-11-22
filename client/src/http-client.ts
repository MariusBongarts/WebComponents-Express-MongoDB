import { HttpClient } from '../client-packages/http-client/http-client';

export const httpClient = new HttpClient({ baseURL: 'http:' + '//' + location.hostname + ':3443/api/' });
