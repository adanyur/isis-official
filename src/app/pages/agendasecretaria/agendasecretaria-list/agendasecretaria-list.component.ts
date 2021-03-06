import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { AgendasecretariaService } from '../services/agendasecretaria.service';

@Component({
  selector: 'app-agendasecretaria-list',
  templateUrl: './agendasecretaria-list.component.html',
  styleUrls: ['./agendasecretaria-list.component.css'],
})
export class AgendasecretariaListComponent implements OnInit, OnDestroy {
  agendaMedicaslists$: Observable<any>;
  agendaMedicaData$: Observable<any>;
  p: number = 1;
  status = false;

  private unsubscribe$ = new Subject<void>();

  constructor(private AGS: AgendasecretariaService) {}

  ngOnInit(): void {
    this.getAgendaMedicaList();
    this.AGS.refresh
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((_) => this.getAgendaMedicaList());
  }

  openModal(data: any) {
    if (!data.historia) {
      this.AGS._modal.next();
      this.AGS.setDataCupo(data);
    }
  }

  AnulacionCita(idcita: number) {
    this.AGS.putAnulacionCitas(idcita).subscribe(console.log);
  }

  getAgendaMedicaList() {
    this.agendaMedicaslists$ = this.AGS._idProgramacion.pipe(
      tap((_) => (this.status = true)),
      switchMap((data: any) => this.AGS.getAgenMedica(data)),
      tap((_) => this.getAgendaMedicaData())
    );
  }

  getAgendaMedicaData() {
    this.agendaMedicaData$ = this.AGS.getDataProgramacion();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
