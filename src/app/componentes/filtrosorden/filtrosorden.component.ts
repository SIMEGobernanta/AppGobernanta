import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomInfo } from 'src/app/room-info';
import { ArrayFiltroService } from 'src/app/servicios/array-filtro.service';

@Component({
  selector: 'app-filtrosorden',
  templateUrl: './filtrosorden.component.html',
  styleUrls: ['./filtrosorden.component.css']
})
export class FiltrosordenComponent implements OnInit, OnDestroy {

  @Input() habitaciones!: RoomInfo[];
  aux: RoomInfo[] = [];
  subscription: Subscription[] = [];

  valor!: String;
  filtros = ['Adultos', 'Niños', 'Cunas', 'Habitación', 'Entrada', 'Salida'];
  filtroUtilizado = '';
  tipoFiltrado = true;

  constructor(private arrayFiltro:ArrayFiltroService) { }

  ngOnInit(): void {
    this.aux = JSON.parse(JSON.stringify(this.habitaciones));
    this.subscription.push(
      this.arrayFiltro.sendArray.subscribe((resp:RoomInfo[]) => {
        this.aux = resp;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach( subscription => subscription.unsubscribe());
  }

  chooseFilter(filtro:string) {
    this.valor = filtro;
  }

  getCondition(data:boolean, filtro:string) {
    let clickedComponent = ''
    if (data === true) {
      clickedComponent = 'flecha-asc'
    } else if (data === false) {
      clickedComponent = 'flecha-desc'
    }
    this.filtroUtilizado = filtro;
    this.filtrarDatos(filtro, clickedComponent);
  }

  filtrarArray(filtro:string) {
    let clickedComponent = 'label';
    this.filtrarDatos(filtro, clickedComponent);
  }

  filtrarDatos(filtro:string, clickedComponent:string) {
    let habitaciones = this.aux;
    let valor = filtro.toLocaleLowerCase();

    /*Miro desde que elemento quiero filtrar el array
    * (label, flecha asc o flecha desc).
    * Dependiendo del elemento hago una cosa u otra */
    this.checkValue(this.filtroUtilizado.toLocaleLowerCase(), valor, clickedComponent);

    //Filtro el array
    this.switchFiltro(valor, habitaciones);

    //Invierto el array (ya filtrado) en caso que sea descendente
    if (this.tipoFiltrado === false) {
      habitaciones.reverse();
    }

    //Añado estilos a las flechas en función de que he hecho
    this.resolverFiltro(valor);

    //Actualizo el array que muestro por pantalla en el componente principal
    this.arrayFiltro.sendArray.emit(habitaciones);
  }

  //Función para filtrar el array dependiendo del filtro que quieras utilizar
  switchFiltro(valor:string, habitaciones:RoomInfo[]){
    switch(valor) {
      case 'adultos':
        this.filtroUtilizado = 'adultos';
        habitaciones.sort(function (a,b):number {
          if (a.adults < b.adults) {return 1;}
          if (a.adults > b.adults) {return -1;}
          return 0;
        });
      break;
      case 'niños':
        this.filtroUtilizado = 'niños';
        habitaciones.sort(function (a,b):number {
          if (a.kids < b.kids) {return 1;}
          if (a.kids > b.kids) {return -1;}
          return 0;
        });
      break;
      case 'cunas':
        this.filtroUtilizado = 'cunas';
        habitaciones.sort(function (a,b):number {
          if (a.babies < b.babies) {return 1;}
          if (a.babies > b.babies) {return -1;}
          return 0;
        });
      break;
      case 'habitación':
        this.filtroUtilizado = 'habitación';
        habitaciones.sort(function (a,b):number {
          if (a.name < b.name) {return 1;}
          if (a.name > b.name) {return -1;}
          return 0;
        });
      break;
      case 'entrada':
        this.filtroUtilizado = 'entrada';
        habitaciones.sort(function (a,b):number {
          if (a.startDate < b.startDate) {return 1;}
          if (a.startDate > b.startDate) {return -1;}
          return 0;
        });
      break;
      case 'salida':
        this.filtroUtilizado = 'salida';
        habitaciones.sort(function (a,b):number {
          if (a.endDate < b.endDate) {return 1;}
          if (a.endDate > b.endDate) {return -1;}
          return 0;
        });
      break;
      default:

      break;
    }
  }

  resolverFiltro(valor:string) {
    if (this.tipoFiltrado === true) {
      for (let i = 0; i < this.filtros.length; i++) {
        let quitarNegrita = document.getElementsByClassName("desc")[i];
        let aux = quitarNegrita as HTMLElement;
        aux.style.fontWeight = 'normal';

        if (this.filtros[i].toLocaleLowerCase() == this.filtroUtilizado) {
          let flecha = document.getElementsByClassName("asc")[i];
          let flechaElegida = flecha as HTMLElement;
          flechaElegida.style.fontWeight = 'bold';
        } else {
          let flecha = document.getElementsByClassName("asc")[i];
          let flechaElegida = flecha as HTMLElement;
          flechaElegida.style.fontWeight = 'normal';
        }
      }
    } else if (this.tipoFiltrado === false) {
      for (let i = 0; i < this.filtros.length; i++) {
        let quitarNegrita = document.getElementsByClassName("asc")[i];
        let aux = quitarNegrita as HTMLElement;
        aux.style.fontWeight = 'normal';

        if (this.filtros[i].toLocaleLowerCase() == valor) {
          let flecha = document.getElementsByClassName("desc")[i];
          let flechaElegida = flecha as HTMLElement;
          flechaElegida.style.fontWeight = 'bold';

        } else {
          let flecha = document.getElementsByClassName("desc")[i];
          let flechaElegida = flecha as HTMLElement;
          flechaElegida.style.fontWeight = 'normal';
        }
      }
    }
  }

  checkValue(filtroUsado:string, valorFiltro: string, clickedComponent:string) {
    //Si hago click en la flecha ascendente, descendente o label
    if (clickedComponent == 'flecha-asc') {
      this.tipoFiltrado = true;
    } else if (clickedComponent == 'flecha-desc') {
      this.tipoFiltrado = false;
    } else if (clickedComponent == 'label') {
      /*
      * SI CLICO EN LA LABEL:
      * Si NO es la primera vez que uso el filtro:
      * Si el filtro es el mismo que la ultima vez y está ordenada de forma ascendente,
      * ordénala de forma descendente y viceversa
      */
      if (filtroUsado != '') {
        if (filtroUsado == valorFiltro) {
          if (this.tipoFiltrado == true) {
            this.tipoFiltrado = false;
          } else {
            this.tipoFiltrado = false
          } //Si el filtro es distinto, ordena ascendentemente
        } else if (filtroUsado != valorFiltro) {
          this.tipoFiltrado = true;
        }
      }
      /*
      * No hace falta hacer un else por que si clicas en la label por primera vez
      * se sobreentiende que quieres hacerlo de forma ascendente
      */
    }
  }

}
