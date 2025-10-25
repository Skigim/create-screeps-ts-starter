import { COLORS } from "./constants.js";

export class Logger {
  static error(message: string): void {
    console.log(`<span style="color:${COLORS.ERROR}">[ERROR] ${message}</span>`);
  }

  static warning(message: string): void {
    console.log(
      `<span style="color:${COLORS.WARNING}">[WARNING] ${message}</span>`
    );
  }

  static info(message: string): void {
    console.log(`<span style="color:${COLORS.INFO}">[INFO] ${message}</span>`);
  }

  static debug(message: string): void {
    console.log(`<span style="color:${COLORS.DEBUG}">[DEBUG] ${message}</span>`);
  }
}
