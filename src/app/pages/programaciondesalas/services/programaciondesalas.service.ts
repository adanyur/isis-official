import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject } from 'rxjs';
import { especialidades, camas, medicos } from '../db/db';

import { formDynamic } from '../db/form__dynamic';
import { AuthStorageService, IntermedaryService } from '../../../core/services';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProgramaciondesalasService {
  constructor(
    private http: HttpClient,
    private AuthStorageService: AuthStorageService,
    private IntermedaryService: IntermedaryService
  ) {}

  private __dataHorarioDeProgramacion = new Subject<any>();
  private __httpDynamic = new Subject<any>();

  /**/

  get dataHorarioDeProgramacion() {
    return this.__dataHorarioDeProgramacion;
  }

  get httpDynamic() {
    return this.__httpDynamic;
  }

  getAgendaSoap(fecha: string) {
    return this.http.get(`http://127.0.0.1:8000/agendasoap/${fecha}`);
  }

  getSalas() {
    return this.http.get('http://127.0.0.1:8000/salas');
  }

  getEspecialidades() {
    return of(especialidades);
  }

  getCamas() {
    return of(camas);
  }

  getMedicos(codigoDeEspecialidad: string) {
    return of(
      medicos.filter(
        (medicos) => medicos.codigoEspecialidad === codigoDeEspecialidad
      )
    );
  }

  getIntervenciones(codigoDeEspecialidad: string) {
    return this.http.get(
      `http://127.0.0.1:8000/intervencion/${codigoDeEspecialidad}/`
    );
  }

  getAnestesia() {
    return this.http.get(`http://127.0.0.1:8000/anestesia`);
  }

  getParticipantes(codigoIntervencion: string) {
    return this.http.get(
      `http://127.0.0.1:8000/participantes/${codigoIntervencion}/`
    );
  }

  getPersonales() {
    if (this.AuthStorageService.personal) {
      return of(this.AuthStorageService.personal);
    }

    // return this.http
    //   .get('http://127.0.0.1:8000/personales')
    //   .pipe(tap((data: any) => this.AuthStorageService.setPersonal(data)));
  }

  getDisponibilidadDeSalas({ fecha, numeroDeSala }) {
    return this.http.get(
      `http://127.0.0.1:8000/disponibilidadsalas/${fecha}/${numeroDeSala}`
    );
  }

  getFormDynamic() {
    return of(formDynamic);
  }

  getProgramacionDeSalas(codigoProgramacion: string) {
    return this.http.get(
      `http://127.0.0.1:8000/programacion/${codigoProgramacion}/`
    );
  }

  getApiDynamic({ verbo, data }) {
    const END_POINT = {
      PUT: this.http.get(`http://127.0.0.1:8000/anestesia`),
      POST: this.http.post('http://127.0.0.1:8000/programaciones', data),
      // .pipe(tap((_) => this.IntermedaryService.refresh.next())),
    };

    return END_POINT[verbo];
  }
}
