import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarefas } from '../model/tarefas';
import { Observable } from 'rxjs';

@Injectable()
export class TarefaService {

  private tarefasUrl: string;
  private tarefaUrl: string;
  private novaUrl: string;
  private editarUrl: string;
  private apagarUrl: string;
  private ordemUrl: string;
  private ordembtUrl: string;

  constructor(private http: HttpClient) {
    this.tarefasUrl = 'http://localhost:8080/tarefas/';
    this.tarefaUrl = 'http://localhost:8080/tarefas/id=';
    this.novaUrl = 'http://localhost:8080/tarefas/nova/';
    this.editarUrl = 'http://localhost:8080/tarefas/editar';
    this.apagarUrl = 'http://localhost:8080/tarefas/apagar';
    this.ordemUrl = 'http://localhost:8080/tarefas/ordem';
    this.ordembtUrl = 'http://localhost:8080/tarefas/ordembt';
  }

  public selecionaTarefas(): Observable<Tarefas[]> {
    return this.http.get<Tarefas[]>(this.tarefasUrl);
  }

  public selecionaTarefa(id: number): Observable<Tarefas[]> {
    let u = this.tarefaUrl + id;
    return this.http.get<Tarefas[]>(u);
  }

  public novaTarefa(tarefa: Tarefas[]) {

    let parms = {
      nometarefa: String(tarefa[0]['nometarefa']),
      custo: Number(tarefa[0]['custo']),
      datalimite: String(tarefa[0]['datalimite'])
    };

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    return this.http.post(this.novaUrl, JSON.stringify(parms), {
      headers: headers
    });
  }

  public editarTarefa(tarefa: Tarefas[]) {

    let parms = {
      idtarefa: Number(tarefa[0]['idtarefa']),
      nometarefa: String(tarefa[0]['nometarefa']),
      custo: Number(tarefa[0]['custo']),
      datalimite: String(tarefa[0]['datalimite'])
    };

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    return this.http.post(this.editarUrl, JSON.stringify(parms), {
      headers: headers
    });
  }

  public apagarTarefa(id: Number) {
    let parms = {
      idtarefa: id
    };

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    return this.http.post(this.apagarUrl, JSON.stringify(parms), {
      headers: headers
    });
  }

  public sobedesceTarefa(id: Number, mov: String) {
    let parms = {
      id: id,
      mov: mov
    };

    const headers = new HttpHeaders()
      .set('Authorization', 'my-auth-token')
      .set('Content-Type', 'application/json');

    return this.http.post(this.ordembtUrl, JSON.stringify(parms), {
      headers: headers
    });
  }

  public ordemTarefa(id: number, id1: number) {
    let n: number[] = [id, id1];
    return this.http.post<number[]>(this.ordemUrl, n);
  }

}
