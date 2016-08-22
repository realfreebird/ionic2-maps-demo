import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable()
export class MapData {
  data: any;

  constructor(public http: Http) {}

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      this.http.get('data/data.json').subscribe(res => {
        this.data = res.json();
      });
    });
  }

  getMap() {
    return this.load().then(data => {
      return data.map;
    });
  }
}
