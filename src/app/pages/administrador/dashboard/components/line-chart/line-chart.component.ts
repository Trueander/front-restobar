import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  multi: any[];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'Pesos $';
  timeline: boolean = false;

  colorScheme = {
    domain: ['rgb(122, 163, 229)']
  };

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.obtenerPedidosPorRangoDeFecha('','')
    .subscribe(response => {
      console.log(response)
      this.multi = [];
      this.multi.push({
        "name": "$",
        "series": []
      })
      response.data.forEach(data => {
        this.multi[0].series.push(
          {
            "name": data.fecha,
            "value": this.obtenerMontoTotalPorFecha(data.pedidos)
          }
        )
      })
      this.multi[0].series.sort(this.compare)
      Object.assign(this, { multi: this.multi });
    })
  }

  obtenerMontoTotalPorFecha(pedidos: Pedido[]): number {
    let total = 0;
    pedidos.forEach(p => {
      p.itemsList.forEach(i => {
        total = total + (i.cantidad * i.precio)
      })
    })

    return total;
  }

  compare( a: any, b: any ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }

}
