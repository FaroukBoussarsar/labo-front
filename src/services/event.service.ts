import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GLOBAL} from "../app/app-config";
import {Utils} from "../utils/utils";

import {Event} from "../models/event.model";


@Injectable({
  providedIn: 'root'
})
export class EventService {

  // public placeholderEvent: Event[] = GLOBAL._DB.events;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getAllEvents(): Promise<Event[]> {
    return this.httpClient.get<Event[]>('http://localhost:9999/evenementservice/evenements').toPromise();
    //return new Promise(resolve => resolve(this.placeholderEvent));
  }

  getEventById(id: string): Promise<Event> {
   return this.httpClient.get<Event>(`http://localhost:9999/evenementservice/evenements/${id}`).toPromise();
    // return new Promise(resolve => resolve(
    //   this.placeholderEvent.filter(item => item.id === id)[0] ?? null
    // ));
  }

  /**
   * create a new member or update an old member.
   * a new member doesn't have an id
   */
  saveEvent(event: any): Promise<Event> {
    return this.httpClient.post<Event>('http://localhost:9999/evenementservice/evenements', event).toPromise();
    // const eventToSave = {
    //   id: event.id ?? Utils.fakeNumber().toString(),
    //   createdDate: event.createdDate ?? new Date().toISOString(), ...event
    // };
    // this.placeholderEvent = [eventToSave, ...this.placeholderEvent.filter(item => item.id !== event.id)];

    // return new Promise(resolve => resolve(eventToSave));
  }

  removeEventById(id: string): Promise<void> {
    return this.httpClient.delete<void>(`http://localhost:9999/evenementservice/evenements/${id}`).toPromise();
    // this.placeholderEvent = this.placeholderEvent.filter(item => item.id !== id);
    // return new Promise(resolve => resolve());
  }

}
