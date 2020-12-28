import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../Appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  public successMsg: string ='';
  public errorMsg: string = '';
  public appointmentDate: string = '';
  public numberOfPeople: number = 0;
  public place : string = ''
  constructor(private appointmentService: AppointmentService) { }
  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.numberOfPeople, this.place)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = '';
        this.numberOfPeople = 0;
        this.place = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Sended Successfully for ${appointmentDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }
  ngOnInit(): void {
    this.createAppointment()
  }

}
