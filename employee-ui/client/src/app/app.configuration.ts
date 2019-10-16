import {HttpClient} from "@angular/common/http";

export var configuration: any;

export function initApp(http: HttpClient) {
  const url = new URL(window.location.href);
  const profile = url.searchParams.get('profile');
  return () => http.get(`./assets/configuration.${profile}.json`)
    .toPromise()
    .then(value => {
      configuration = value;
    });

}
