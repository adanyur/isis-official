import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AgendamedicaService {
  constructor(private http: HttpClient) {}

  getListadoCitas(fecha: string) {
    const isFecha = fecha ? fecha : moment().format('YYYY-MM-DD');
    return this.http.get(
      `http://192.168.10.144:8002/pacientescitados?fecha=${isFecha}&medico=022`
    );
  }
}
