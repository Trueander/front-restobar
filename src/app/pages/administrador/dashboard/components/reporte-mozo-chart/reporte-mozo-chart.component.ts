import { Component, Input, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

export interface MozoReporte {
  mozo: string,
  montoTotalPedidos: number
}

@Component({
  selector: 'app-reporte-mozo-chart',
  templateUrl: './reporte-mozo-chart.component.html',
  styleUrls: ['./reporte-mozo-chart.component.css']
})
export class ReporteMozoChartComponent implements OnInit {

  @Input() fecha_desde: Date;
  @Input() fecha_hasta: Date;

  multi: any[] = [];
  view: any[] = [700, 300];

  reporteMozos: MozoReporte[] = [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';


  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {


    
    this.pedidoService.getReporteMozos('323','323')
    .subscribe(response => {
      this.reporteMozos = response.data;
      this.obtenerDatosReporteMozoChart(this.reporteMozos);
    })
  }

  obtenerDatosReporteMozoChart(reportes: MozoReporte[]) {
    const dataPedidos = reportes.reduce((resultado, reporte) => {
      resultado.push([ reporte.mozo, reporte.montoTotalPedidos]);

      return resultado;
    }, []);

    let aux = [];

    const fechaPedidosAcumulado: any[] = dataPedidos.reduce((resultado, fecha) => {
      if (!aux[fecha]) {
        aux[fecha] = fecha;
        resultado.push(aux[fecha]);
      } else {
        aux[fecha][1] += fecha[1];
        
      }
      return resultado;
    }, []);

    let itemsPush = [];
    fechaPedidosAcumulado.forEach(item => {
      let itemPush = {name: item[0], value: item[1]} 
      itemsPush.push(itemPush);
    })
    this.multi = itemsPush;
  }


}
