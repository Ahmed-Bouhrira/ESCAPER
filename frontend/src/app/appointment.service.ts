import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './Appointment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
}) 
export class AppointmentService {
  private BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.BASE_URL}/api/appoinment`);
  }

  createAppointment(appointmentDate: string, numberOfPeople: number, place: string): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.BASE_URL}/api/appoinment`, { appointmentDate, numberOfPeople, place });
  }

  cancelAppointment(id: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/appoinment/${id}`);
  }
}

