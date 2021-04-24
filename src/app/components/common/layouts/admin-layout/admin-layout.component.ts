import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  RouteConfigLoadEnd,
  ResolveStart,
  ResolveEnd
} from '@angular/router';
import { Subscription } from "rxjs";
import { MatSidenav } from '@angular/material';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { ThemeService } from '../../../../services/theme/theme.service';
import * as Ps from 'perfect-scrollbar';
import * as domHelper from '../../../../helpers/dom.helper';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.template.html'
}) 
export class AdminLayoutComponent implements OnInit {
  private isMobile;
  isSidenavOpen: Boolean = false;
  isModuleLoading: Boolean = false;
  moduleLoaderSub: Subscription;
  usuario: any;
  @ViewChild(MatSidenav) private sideNave: MatSidenav;


  constructor(
    private router: Router,
    public translate: TranslateService,
    public themeService: ThemeService
  ) {
    // Close sidenav after route change in mobile
    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((routeChange: NavigationEnd) => {
        if (this.isNavOver()) {
          this.sideNave.close()          
        }
      });

    // Translator init
    const browserLang: string = translate.getBrowserLang();
    
    //translate.use(browserLang.match(/pt|en/) ? browserLang : 'pt');
    translate.use("pt");
    translate.setDefaultLang("pt");   
  }


  ngOnInit() {
    // Initialize Perfect scrollbar for sidenav
    let navigationHold = document.getElementById('scroll-area');
    Ps.initialize(navigationHold, {
      suppressScrollX: true
    });

    // FOR MODULE LOADER FLAG
    this.moduleLoaderSub = this.router.events.subscribe(event => {
      if (event instanceof RouteConfigLoadStart || event instanceof ResolveStart) {
        this.isModuleLoading = true;
      }
      if (event instanceof RouteConfigLoadEnd || event instanceof ResolveEnd) {
        this.isModuleLoading = false;
      }
    });

    var StrUsuario = localStorage.getItem("UsuarioAtual");
    if (StrUsuario !== null) {
      //var cnt = new Contrato();
      let usr = JSON.parse(StrUsuario);
      
      this.usuario = new Object();
      this.usuario = JSON.parse(StrUsuario);
    }

  }
  ngOnDestroy() {
    this.moduleLoaderSub.unsubscribe();
  }
  isNavOver() {
    let isSm = window.matchMedia(`(max-width: 960px)`).matches;

    // Disable collapsed menu in small screen
    if (isSm && domHelper.hasClass(document.body, 'collapsed-menu')) {
      domHelper.removeClass(document.body, 'collapsed-menu')
    }
    return isSm;
  }
}