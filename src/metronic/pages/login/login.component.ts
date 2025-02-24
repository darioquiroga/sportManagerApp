import { environment } from './../../../enviroments/enviroment.prod';
import {
  Component,
  OnInit,
  Renderer2,
  Inject,
  RendererFactory2,
  NgModule,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LoginService } from '../../../app/services/login.service';
import { StyleService } from '../../../app/services/sytle.service';
import { EmpresaService } from '../../../app/services/empresa.service';
import { GlobalService } from '../../../app/services/global.service';
import { EnviromentService } from '../../../app/services/enviroment.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Empresa } from '../../../app/models/company';
import { Router } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    './../../../styles.scss',
  ],
  standalone: true,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  private hashId: string = '';

  public backgroundImageUrl: string = '';
  public imgFront: string = 'logo.png';
  public imagenFondo: string = '';
  private renderer: Renderer2;
  appNombre: any;
  versionSistema: any;
  appDescripcion: string | undefined;
  constructor(
    //private renderer: Renderer2,
    private fb: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    rendererFactory: RendererFactory2,
    private styleService: StyleService,
    private empresaService: EmpresaService,
    private globalService: GlobalService,
    private enviromentService: EnviromentService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.backgroundImageUrl = this.styleService.getBackgroundImageUrl();
  }

  empresaModelo!: Empresa;
  imagenPortada: string = 'ga-login-front.png';
  gestagroStatus = false;
  gestagroMensaje = '';
  loading = true;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadTheme();
    this.setupTogglePassword();
    this.appNombre  = this.enviromentService.appNombre
    this.appDescripcion = this.enviromentService.appDescripcion
    this.versionSistema = this.enviromentService.versionSistema
    this.loading = true;
    if (typeof document !== 'undefined') {
      // Código que usa el objeto   document
      this.enableDismissTrigger();
    }
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
    });





    this.route.queryParams.subscribe((params) => {
      this.hashId = params['hashId'];

      this.globalService.validarServicioSiEstaDisponible().subscribe(
        (response) => {
          if (response && Object.keys(response).length > 0) {
            this.loading = false;
            this.gestagroStatus = true;
            this.gestagroMensaje = '';

            if (params['hashId'] == null) {
              this.hashId = '0';
              this.backgroundImageUrl =this.styleService.getBackgroundImageUrl();

            } else {
              // Viene con hashId debo de traer la empresa

              this.empresaService.traerEmpresa(this.hashId).subscribe(
                (response) => {
                  debugger
                  if (response && Object.keys(response).length > 0) {
                    this.empresaModelo = response;

                    this.imagenPortada = this.empresaModelo.id + '-login-front.png';
                    this.imagenFondo =
                      '/assets/media/images/login/' +
                      this.empresaModelo.id +
                      '-bg.jpg';
                    this.globalService.setEmpresa(this.empresaModelo);
                    const empresa = this.globalService.getEmpresa();
                    this.cambiarImagen(this.imagenFondo);
                  } else {
                    // Maneja el caso cuando el objeto está vacío
                    console.log('El objeto está vacío.');
                    // Puedes asignar valores por defecto o realizar otras acciones aquí
                    this.imagenPortada = 'ga-login-front.png'; // Ejemplo de valor por defecto
                  }
                },
                (error) => {
                  this.imagenPortada = 'ga-login-front.png';
                  // Maneja el error en la solicitud HTTP
                  console.error('Error al traer la empresa:', error);
                }
              );
            }
          } else {
            this.loading = false;
            // Maneja el caso cuando el objeto está vacío
            this.gestagroMensaje =
              'Gestagro no está disponible temporalmente, intente nuevamente más tarde. Sepa disculpar las molestias ocasionadas.';
            this.gestagroStatus = false;
          }
        },
        (error) => {
          this.gestagroStatus = false;
          this.globalService.setStatusGestagro(this.gestagroStatus);
          this.gestagroMensaje =
            'Gestagro no está disponible temporalmente, intente nuevamente más tarde. Sepa disculpar las molestias ocasionadas.';
          // Maneja el error en la solicitud HTTP
          console.error(this.gestagroMensaje);
        }
      );
    });





  }
  enableDismissTrigger(): void {
    // Implementación de enableDismissTrigger
  }
  cambiarImagen(fondo: string) {
    this.imagenFondo = `url(${fondo})`;
  }

  itemsLocalStorage: any[] = [];
  loadFromLocalStorage() {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      this.itemsLocalStorage.push({ key, value });
    });
  }
  async onSubmit(): Promise<void>{
    this.errorMessage = ""


    if (this.loginForm.invalid) {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //this.errorMessage = ""
      }, 200);

      this.errorMessage = 'ERROR: El usuario o la clave no se ha ingresado.';

    }else{
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        //this.errorMessage = ""
      }, 5000);
      try {
        const response : any = await this.loginService.loginUser(this.loginForm.value);

        if (response && response.codigo === "OK") {
          const usu = this.globalService.getUsuarioLogueado();
          this.errorMessage = "Bienvenido "+usu.cuenta.id+" : "+usu.cuenta.nombre
          this.router.navigate(['/gestagro'])

        } else if (response && response.codigo === "ERROR") {
          this.errorMessage = String(response.codigo+": "+response.descripcion);
        }
        this.loading = false;

        // Handle successful login (e.g., navigate to another page)
      } catch (error: any) {

        this.loading = false;

        //console.error('Login Error', error);
        this.errorMessage = String(error);
      }
    }


  }









  loadTheme(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      const defaultThemeMode = 'light'; // light|dark|system
      let themeMode;
      if (document.documentElement) {
        if (localStorage.getItem('theme')) {
          themeMode = localStorage.getItem('theme');
        } else if (document.documentElement.hasAttribute('data-theme-mode')) {
          themeMode = document.documentElement.getAttribute('data-theme-mode');
        } else {
          themeMode = defaultThemeMode;
        }

        if (themeMode === 'system') {
          themeMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }

        document.documentElement.classList.add(themeMode);
      }
    `;
    this.renderer.appendChild(this.document.body, script);
  }

  setupTogglePassword(): void {
    const togglePassword = this.document.getElementById('togglePassword');
    const password = this.document.getElementById(
      'password'
    ) as HTMLInputElement;
    const eyeOpen = this.document.getElementById('eyeOpen');
    const eyeClosed = this.document.getElementById('eyeClosed');
    // Inicializa el icono del ojo en hidden
    if (eyeOpen) {
      this.renderer.setStyle(eyeOpen, 'display', '');
      this.renderer.setStyle(eyeClosed, 'display', 'none');
    }
    if (eyeClosed) {
      this.renderer.setStyle(eyeOpen, 'display', 'none');
      this.renderer.setStyle(eyeClosed, 'display', '');
    }
    if (togglePassword) {
      togglePassword.addEventListener('click', () => {
        const type =
          password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);

        if (eyeOpen && eyeClosed) {
          const eyeOpenDisplay =
            eyeOpen.style.display === 'none' ? 'inline' : 'none';
          const eyeClosedDisplay =
            eyeClosed.style.display === 'none' ? 'inline' : 'none';

          this.renderer.setStyle(eyeOpen, 'display', eyeOpenDisplay);
          this.renderer.setStyle(eyeClosed, 'display', eyeClosedDisplay);
        }
      });
    }
  }
}
