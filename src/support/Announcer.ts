/**
 * Wraps console.log
 * Exists to eventually add formatting
 */
export default class Announcer {
  echo (text: string): void {
    Announcer.announce(text)
  }

  static announce (text: string): void {
    console.log(text)
  }
}
