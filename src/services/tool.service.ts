import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";

import { Tool } from 'src/models/tool.model';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  public placeholderTools: Tool[] = GLOBAL._DB.tools;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllTools(): Promise<Tool[]> {
   return this.httpClient.get<Tool[]>('http://localhost:9999/outilservice/outils').toPromise();
   // return new Promise(resolve => resolve(this.placeholderTools));
  }

  getToolById(id: string): Promise<Tool> {
    return this.httpClient.get<Tool>(`http://localhost:9999/outilservice/outils/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderTools.filter(item => item.id === id)[0] ?? null
    // ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveTool(tool: any): Promise<Tool> {
 return this.httpClient.post<Tool>('http://localhost:9999/outilservice/outils', tool).toPromise();
    // const memberToSave = {
    //   id: tool.id ?? Utils.fakeNumber().toString(),
    //   createdDate: tool.createdDate ?? new Date().toISOString(), ...tool
    // };
    // this.placeholderTools = [memberToSave, ...this.placeholderTools.filter(item => item.id !== tool.id)];

    // return new Promise(resolve => resolve(memberToSave));
  }

  removeToolById(id: string): Promise<void> {
     return this.httpClient.delete<void>(`http://localhost:9999/outilservice/outils/${id}`).toPromise();
    // this.placeholderTools = this.placeholderTools.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

}
