import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

interface ISortFilter {
  id: string;
  prop: string;
  label: string;
  asc: boolean;
}

@Component({
  selector: 'app-filtrosorden',
  templateUrl: './filters-order.component.html',
  styleUrls: ['./filters-order.component.css']
})
export class FiltersOrderComponent implements OnInit, OnDestroy {
  @Input() rooms!: any[];
  isLoading = true;
  subscription: Subscription[] = [];
  filters: ISortFilter[] = [
    { id: '0', prop: 'adults', label: 'Adultos', asc: false }, { id: '1', prop: 'kids', label: 'Niños', asc: false },
    { id: '2', prop: 'babies' , label: 'Cunas', asc: false }, { id: '3', prop: 'name', label: 'Habitación', asc: false },
    { id: '4', prop: 'startDate', label: 'Entrada', asc: false }, { id: '5', prop: 'endDate', label: 'Slida', asc: false }
  ];
  filterHandler: ISortFilter[] = [];

  constructor() { }

  ngOnInit(): void {
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.subscription.forEach( subscription => subscription.unsubscribe());
  }

  setFilterHandler(filter: ISortFilter): void {
    const index = this.filterHandler.indexOf(filter);
    if (index === -1) {
      this.filterHandler = [];
      filter.asc = !filter.asc;
      this.filterHandler.push(filter);
      this.applyFilter();
      return;
    }
    this.filterHandler[index].asc = !this.filterHandler[index].asc;
    this.applyFilter();
  }

  applyFilter(): void {
    const filter = this.filterHandler[0];
    if (filter.asc) {
      this.rooms = this.rooms.sort((a, b) => {
        if (a[filter.prop] > b[filter.prop]) { return 1; }
        return -1;
      });
      return;
    }
    this.rooms = this.rooms.sort((a, b) => {
      if (a[filter.prop] > b[filter.prop]) { return -1; }
      return 1;
    });
  }

  /*roomInfosAux: RoomInfo[] = [];*/
  /*filters = ['Adultos', 'Niños', 'Cunas', 'Habitación', 'Entrada', 'Salida'];*/
  /*currentFilter = '';
  filterType = true;*/

  /*chooseFilter(filter: string): void {
    this.valor = filter;
  }

  getCondition(data: boolean, filter: string): void {
    let clickedComponent = '';
    if (data === true) {
      clickedComponent = 'flecha-asc';
    } else if (data === false) {
      clickedComponent = 'flecha-desc';
    }
    this.currentFilter = filter;
    this.filterData(filter, clickedComponent);
  }

  filterDataList(filter: string): void {
    const clickedComponent = 'label';
    this.filterData(filter, clickedComponent);
  }

  filterData(filtro: string, clickedComponent: string): void {
    const rooms = this.roomInfosAux;
    const valor = filtro.toLocaleLowerCase();

    /!*Miro desde que elemento quiero filtrar el array
    * (label, flecha asc o flecha desc).
    * Dependiendo del elemento hago una cosa u otra *!/
    this.checkValue(this.currentFilter.toLocaleLowerCase(), valor, clickedComponent);

    // Filtro el array
    this.switchFilter(valor, rooms);

    // Invierto el array (ya filtrado) en caso que sea descendente
    if (this.filterType === false) {
      rooms.reverse();
    }

    // Añado estilos a las flechas en función de que he hecho
    this.solveFilter(valor);

    // Actualizo el array que muestro por pantalla en el componente principal
    this.filterArray.sendArray.emit(rooms);
  }

  // Función para filtrar el array dependiendo del filtro que quieras utilizar
  switchFilter(valor: string, habitaciones: RoomInfo[]): void {
    switch (valor) {
      case 'adultos':
        this.currentFilter = 'adultos';
        habitaciones.sort((a, b): number => {
          if (a.adults < b.adults) {return 1; }
          if (a.adults > b.adults) {return -1; }
          return 0;
        });
        break;
      case 'niños':
        this.currentFilter = 'niños';
        habitaciones.sort((a, b): number => {
          if (a.kids < b.kids) {return 1; }
          if (a.kids > b.kids) {return -1; }
          return 0;
        });
        break;
      case 'cunas':
        this.currentFilter = 'cunas';
        habitaciones.sort((a, b): number => {
          if (a.babies < b.babies) {return 1; }
          if (a.babies > b.babies) {return -1; }
          return 0;
        });
        break;
      case 'habitación':
        this.currentFilter = 'habitación';
        habitaciones.sort((a, b): number => {
          if (a.name < b.name) {return 1; }
          if (a.name > b.name) {return -1; }
          return 0;
        });
        break;
      case 'entrada':
        this.currentFilter = 'entrada';
        habitaciones.sort((a, b): number => {
          if (a.startDate < b.startDate) {return 1; }
          if (a.startDate > b.startDate) {return -1; }
          return 0;
        });
        break;
      case 'salida':
        this.currentFilter = 'salida';
        habitaciones.sort((a, b): number => {
          if (a.endDate < b.endDate) {return 1; }
          if (a.endDate > b.endDate) {return -1; }
          return 0;
        });
        break;
      default:

      break;
    }
  }*/

  /*solveFilter(valor: string): void {
    if (this.filterType === true) {
      for (let i = 0; i < this.filters.length; i++) {
        const quitarNegrita = document.getElementsByClassName('desc')[i];
        const aux = quitarNegrita as HTMLElement;
        aux.style.fontWeight = 'normal';

        if (this.filters[i].toLocaleLowerCase() === this.currentFilter) {
          const arrow = document.getElementsByClassName('asc')[i];
          const arrowSelected = arrow as HTMLElement;
          arrowSelected.style.fontWeight = 'bold';
        } else {
          const arrow = document.getElementsByClassName('asc')[i];
          const arrowSelected = arrow as HTMLElement;
          arrowSelected.style.fontWeight = 'normal';
        }
      }
    } else if (this.filterType === false) {
      for (let i = 0; i < this.filters.length; i++) {
        const removeBold = document.getElementsByClassName('asc')[i];
        const aux = removeBold as HTMLElement;
        aux.style.fontWeight = 'normal';

        if (this.filters[i].toLocaleLowerCase() === valor) {
          const arrow = document.getElementsByClassName('desc')[i];
          const arrowSelected = arrow as HTMLElement;
          arrowSelected.style.fontWeight = 'bold';

        } else {
          const arrow = document.getElementsByClassName('desc')[i];
          const arrowSelected = arrow as HTMLElement;
          arrowSelected.style.fontWeight = 'normal';
        }
      }
    }
  }

  checkValue(filterUsed: string, filterValue: string, clickedComponent: string): void {
    // Si hago click en la flecha ascendente, descendente o label
    if (clickedComponent === 'flecha-asc') {
      this.filterType = true;
    } else if (clickedComponent === 'flecha-desc') {
      this.filterType = false;
    } else if (clickedComponent === 'label') {
      /!*
      * SI CLICO EN LA LABEL:
      * Si NO es la primera vez que uso el filtro:
      * Si el filtro es el mismo que la ultima vez y está ordenada de forma ascendente,
      * ordénala de forma descendente y viceversa
      *!/
      if (filterUsed !== '') {
        if (filterUsed === filterValue) {
          if (this.filterType === true) {
            this.filterType = false;
          } else {
            this.filterType = false;
          } // Si el filtro es distinto, ordena ascendentemente
        } else if (filterUsed !== filterValue) {
          this.filterType = true;
        }
      }
      /!*
      * No hace falta hacer un else por que si clicas en la label por primera vez
      * se sobreentiende que quieres hacerlo de forma ascendente
      *!/
    }
  }*/

}
