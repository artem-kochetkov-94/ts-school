abstract class Logger {
  abstract log(message: string): void;

  printDate(date: Date) {
    this.log(date.toString());
  }
}

class MyLogger extends Logger {
  log(message: string) {
    console.log(message);
  }

  logWithDate(message: string) {
    this.printDate(new Date());
    this.log(message);
  }
}

const log = new MyLogger();
log.logWithDate("message");

export {};