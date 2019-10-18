import {Configuration} from "./configuration";

export class ConfigurationProd implements Configuration {
  readonly employees_url = 'http://localhost:9020/employees';
}
