import { Component} from '@angular/core';

export interface HomePageTab {
  title: string; // The title of the tab in the tab bar
  icon: string; // The icon of the tab in the tab bar
  path: string; // The route's path of the tab to display
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage{

  tabs: HomePageTab[];
  
  constructor() {
    this.tabs = [
      { title: 'Accueil', icon: 'home', path: 'index'},
      { title: 'Carte', icon: 'map', path: 'map'},
      { title: 'Interesthings', icon: 'pin', path: 'pois'},
      { title: 'Moi', icon: 'person', path: 'profil'}
    ];
  }
}
