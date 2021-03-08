import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { IntermedaryService } from '../../../core/services/intermedary.service';

@Injectable({
  providedIn: 'root',
})
export class ProgramacionService {
  constructor(private http: HttpClient, private IS: IntermedaryService) {}

  getProgramacionlist() {
    return this.http.get(
      'http://192.168.10.144:8002/admision/citas/programacionesfecha?fecha=2021-03-06'
    );
  }

  getProgramacionShow(id: string) {
    return this.http.get(`http://192.168.10.144:8002/programaciones/${id}`);
  }

  getProgramacionDelete(id: string) {
    return this.http.delete(`http://192.168.10.144:8002/programaciones/${id}`);
  }

  postProgramacion(data: any) {
    return this.http
      .post('http://192.168.10.144:8002/programaciones', data)
      .pipe(tap(() => this.IS.refresh.next()));
  }
}
