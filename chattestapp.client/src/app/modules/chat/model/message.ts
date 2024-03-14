export class Message {
  id: number;
  user: string;
  content: string;
  createdDate: Date;

  constructor(id: number, user: string, content: string, createdDate: Date) {
    this.id = 0;
    this.user = user;
    this.content = content;
    this.createdDate = new Date();
  }
}
