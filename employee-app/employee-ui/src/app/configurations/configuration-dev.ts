import {Configuration} from "./configuration";

export class ConfigurationDev implements Configuration {
  readonly employees_url = 'http://localhost:8080/employees';
}
