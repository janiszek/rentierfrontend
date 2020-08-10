export class Message {
    severity: string;
    text: string;


    constructor(severity: string, text: string) {
      this.severity = severity;
      this.text = text;
    }
  }
