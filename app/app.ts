import { Component, ViewChild } from '@angular/core';

import { Events, ionicBootstrap, MenuController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { MapData } from './providers/map-data';
import { TabsPage } from './pages/tabs/tabs';
import { MapPage } from './pages/map/map';

@Component({
  templateUrl: 'build/app.html'
})
class MapApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  rootPage:any = MapPage;

  constructor(
    platform: Platform,
    mapData: MapData
  ) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

    mapData.load();
  }
}
ionicBootstrap(MapApp, [MapData], { });
