import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  single: any[] = [
  ];
  view: any[] = [700, 400];

  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'right';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {

    this.pedidoService.topTresProductosMasVendidos('','')
    .subscribe(response => {
      this.single = []
      response.data.sort(this.compare);
      response.data.reverse();
      response.data.forEach((data, i) => {
        if(i < 3) {
          this.single.push(
            {
              "name": data.producto,
              "value": data.cantidad
            }
          )
        }

      })


    })

    Object.assign(this, { single: this.single });
  }

  compare( a: any, b: any ) {
    if ( a.cantidad < b.cantidad ){
      return -1;
    }
    if ( a.cantidad > b.cantidad ){
      return 1;
    }
    return 0;
  }

}

