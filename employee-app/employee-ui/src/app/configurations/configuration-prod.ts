import {Configuration} from "./configuration";

export class ConfigurationProd implements Configuration {
  readonly employees_url = 'http://employee.innoventing.net/employees';
}
