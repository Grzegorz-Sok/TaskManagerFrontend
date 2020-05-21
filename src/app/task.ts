import DateTimeFormat = Intl.DateTimeFormat;

export class Task {
  id: number;
  priority: number;
  description: string;
  doers: string;
  deadline: Date;
  type: string;
  status: string;
  meeting: string;
}
