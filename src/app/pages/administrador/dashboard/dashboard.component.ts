import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    
    this.pedidoService.obtenerPedidosPorRangoDeFecha('','')
        .subscribe(response => {
          let datosChart: any[] = [];
          this.multi = [];
          this.multi.push({
            "name": "Pedidos",
            "series": [
              // {
              //   "name": "1990",
              //   "value": 62000000
              // }
            ]
          })
          response.data.forEach(data => {
            
            this.multi[0].series.push(
              {
                "name": data.fecha,
                "value": data.pedidos.length
              }
            )
          })

          console.log(this.multi)
          Object.assign(this, { multi: this.multi });
        })
  }

}
