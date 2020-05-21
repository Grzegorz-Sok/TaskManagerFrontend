import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Meeting} from '../meeting';
import {Employee} from '../employee';
import {Task} from '../task';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {
  meetings: any;
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  showMeetings() {
    this.httpClient.get(`http://localhost:8080/allMeetings`).subscribe(data => {
      console.log(data);
      this.meetings = data;
    });
  }

  addMeeting(time: Date, place: string) {
    const meeting = new Meeting();
    meeting.time = new Date(time);
    meeting.place = place;
    meeting.participants = null;
    this.httpClient.post('http://localhost:8080/addMeeting', meeting).subscribe(info => console.log(info));
  }

  assignMeeting(taskId: number, meetingId: number) {
    this.httpClient.get(`${this.baseUrl}/getMeeting/?id=${meetingId}`)
      .subscribe(
        (data: any) => {
          const meeting = new Meeting();
          meeting.id = data.id;
          meeting.time = data.time;
          meeting.participants = data.participants;
          meeting.place = data.place;
          this.httpClient.put(`http://localhost:8080/assignMeeting/?id=${taskId}`, meeting).subscribe(info => {
              console.log(info);
            }
          );
        }
      );
  }

  addParticipant(participantId: number, meetingId: number) {
    this.httpClient.get(`${this.baseUrl}/getEmployee/?id=${participantId}`)
      .subscribe(
        (data: any) => {
          const participant = new Employee();
          participant.id = data.id;
          participant.name = data.name;
          participant.surname = data.surname;
          participant.role = data.role;
          if (data.task === null)
            participant.task = new Task;
          else
            participant.task = data.task;
          console.log(participant)
          this.httpClient.put(`http://localhost:8080/addParticipants/?id=${meetingId}`, participant).subscribe(info => {
              console.log(info);
            }
          );
        }
      );
  }

  deleteMeeting(meetingId: string) {
    this.httpClient.delete(`http://localhost:8080/deleteMeeting/?id=${meetingId}`).subscribe(data => {
      console.log(data);
    });
  }
}
