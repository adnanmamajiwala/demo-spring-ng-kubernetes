import {Configuration} from "./configuration";

export class ConfigurationProd implements Configuration {
  employees_url = 'http://localhost:9020/employees';
}
