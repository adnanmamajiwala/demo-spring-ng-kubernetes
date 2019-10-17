import {HttpClient} from "@angular/common/http";
import {Configuration} from "./configurations/configuration";
import {ConfigurationDev} from "./configurations/configuration-dev";
import {ConfigurationProd} from "./configurations/configuration-prod";

export var configuration: Configuration;

export function initApp(http: HttpClient) {
  return () => http.get<any>('/profile')
    .toPromise()
    .then(value => {
      switch (value) {
        case 'dev':
          configuration = new ConfigurationDev();
          break;
        case 'prpd':
          configuration = new ConfigurationProd();
          break;
        default:
          configuration = new ConfigurationProd();
          break;
      }
    });
}
