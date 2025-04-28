import { Component, OnInit } from '@angular/core';
import { MonthlyRegistrationsDto } from '../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ChartData, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; // ייבוא המודול


@Component({
  selector: 'app-statistics',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  monthlyRegistrations: MonthlyRegistrationsDto[] = [];
  
  public chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'נרשמים חודשיים',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'חודש ושנה'
        }
      },
      y: {
        title: {
          display: true,
          text: 'מספר נרשמים'
        }
      }
    }
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getMonthlyRegistrations();
  }

  getMonthlyRegistrations(): void {
    this.userService.getMonthlyRegistrations().subscribe(data => {
      this.monthlyRegistrations = data;
      this.prepareChartData();
    });
  }

  prepareChartData(): void {
    const labels: string[] = [];
    const registrationCounts: number[] = [];
    
    this.monthlyRegistrations.forEach(item => {
      const label = `${item.month}/${item.year}`;
      labels.push(label);
      registrationCounts.push(item.count);
    });

    this.chartData.labels = labels;
    this.chartData.datasets[0].data = registrationCounts;
  }
}