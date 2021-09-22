import * as chalk from 'chalk';
import environment from '../env';
class Logger {
  /**
   *
   * @param msg
   */
  info(msg: string): void {
    if (environment.getDebugMode()) {
      console.info(chalk.blueBright(`info: ${msg}`));
    }
  }
  /**
   *
   * @param msg
   */
  error(msg: string): void {
    if (environment.getDebugMode()) {
      console.error(chalk.redBright(`error: ${msg}`));
    }
  }
  /**
   *
   * @param msg
   */
  warn(msg: string): void {
    if (environment.getDebugMode()) {
      console.warn(chalk.yellowBright(`warning: ${msg}`));
    }
  }
  /**
   *
   * @param data
   */
  log(data: any): void {
    if (environment.getDebugMode()) {
      console.log(data);
    }
  }
}

export default new Logger();
