import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

export interface MozoReporte {
  fecha: string,
  mozo: string,
  pedidos: Pedido[]
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

    this.multi = [
      {
        "name": "Anderson",
        "series": [
          {
            "name": "Pedidos",
            "value": 10
          },
          {
            "name": "Total",
            "value": 13000
          }
        ]
      },
    
      {
        "name": "Rosa",
        "series": [
          {
            "name": "Pedidos",
            "value": 20
          },
          {
            "name": "Total",
            "value": 60000
          }
        ]
      },
    
      {
        "name": "Karla",
        "series": [
          {
            "name": "Pedidos",
            "value": 43
          },
          {
            "name": "Total",
            "value": 56000
          }
        ]
      }
    ];
    
    this.pedidoService.getReporteMozos('323','323')
    .subscribe(response => {
      this.reporteMozos = response.data;
      this.obtenerDatosLineChart(this.reporteMozos);
    })
  }

  obtenerDatosLineChart(reportes: MozoReporte[]) {
    const dataPedidos = reportes.reduce((resultado, reporte) => {
      const pedidos = [];
      //obteniendo las fechas de los pedidos
      resultado.push([reporte.fecha, reporte.pedidos, reporte.mozo]);

      return resultado;
    }, []);

    let aux = [];

    

    const fechaPedidosAcumulado = dataPedidos.reduce((resultado, fecha) => {
      if (!aux[fecha]) {
        aux[fecha] = fecha;
        //si no existe la fecha del pedido, cargar a resultado.array
        resultado.push(aux[fecha]);
      } else {
        //sumando la cantidad de pedido si existe
        aux[fecha][1] += fecha[1];
        
      }


      return resultado;
    }, []);

    console.log(fechaPedidosAcumulado)
  }


}
