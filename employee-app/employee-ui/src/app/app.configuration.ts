import {HttpClient} from '@angular/common/http';
import {Configuration} from './configurations/configuration';
import {ConfigurationDev} from './configurations/configuration-dev';
import {ConfigurationProd} from './configurations/configuration-prod';
import {APP_INITIALIZER} from '@angular/core';
import {environment} from '../environments/environment';

export var configuration: Configuration;

export const AppConfigInitializer = {
  provide: APP_INITIALIZER,
  useFactory: initApp,
  multi: true,
  deps: [HttpClient]
};

export function initApp(http: HttpClient) {
  return () => {
    if (!environment.production && window.location.host.includes('localhost')) {
      console.log('It seems we are running locally, setting the environment configuration to dev');
      configuration = new ConfigurationDev(); // local setup;
      return;
    }
    return retrieveEnvironment(http);
  };
}

function retrieveEnvironment(http: HttpClient) {
  return http.get<any>('/profile')
    .toPromise()
    .then(value => {
      switch (value) {
        case 'dev':
          configuration = new ConfigurationDev();
          break;
        case 'prod':
          configuration = new ConfigurationProd();
          break;
        default:
          configuration = new ConfigurationProd();
          break;
      }
    });
}