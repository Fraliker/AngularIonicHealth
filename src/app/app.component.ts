import { Component, ViewChild, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth.provider';

// Public pages
import { HomePage } from '../pages/home/home';
import { SigninPage } from '../pages/auth/signin/signin';

// Authenticated pages
import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';
import { PlansPage } from '../pages/plans/plans';
import { NutritionPage } from '../pages/nutrition/nutrition';
import { ExplorePage } from '../pages/explore/explore';
import { StepcounterPage } from '../pages/stepcounter/stepcounter';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  //
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public alertCtrl: AlertController,) 
  {
    this.initializeApp();

    this.pages = [
      { title: 'The feed', component: FeedPage },
      { title: 'My profile', component: ProfilePage },
      { title: 'Explore others', component: ExplorePage },
      { title: 'Fitness plans', component: PlansPage },
      { title: 'Nutrition', component: NutritionPage },
      { title: 'Stepcounter', component: StepcounterPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // Public pages
  homePage() {
    this.nav.setRoot(HomePage);
  }

  signInPage() {
    this.nav.setRoot(SigninPage);
  }

  // Authenticated pages
  openAuthPages(page) {
    this.nav.setRoot(page.component);
  }

  onSignOut() {
    this.authProvider.logoutUser();
    this.nav.setRoot(HomePage);
     let alert = this.alertCtrl.create({
      title: 'Logout is succesful!'
    });
    alert.present();
  } 

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDmy-4o2xdRWXDdpjmPszAlwdzSsu_dBk4",
      authDomain: "angular-ionic-health.firebaseapp.com",
      databaseURL: "https://angular-ionic-health.firebaseio.com",
      projectId: "angular-ionic-health",
      storageBucket: "angular-ionic-health.appspot.com",
      messagingSenderId: "138237208210"
    });
  }
}
