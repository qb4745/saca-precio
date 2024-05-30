import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonButton,
  IonListHeader,
  IonLabel,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonInput,
    IonItem,
    IonList,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonButton,
    IonListHeader,
    IonLabel,
    CommonModule,
    FormsModule,
  ],
})
export class Tab1Page {
  totalDinero: string = '';
  totalIngresado: number = 0;
  dineroCompras: number = 0;
  dineroGastos: number = 0;
  dineroAgregadoACompras: number = 0;

  constructor() {}

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(value);
  }

  parseCurrency(value: string): number {
    return parseFloat(value.replace(/[^0-9.-]+/g, ''));
  }

  onInput(event: any): void {
    const value = event.target.value;
    const numericValue = this.parseCurrency(value);
    this.totalDinero = value; // Show raw value while typing
    if (!isNaN(numericValue)) {
      this.totalIngresado = numericValue;
    }
  }

  onBlur(event: any): void {
    const numericValue = this.parseCurrency(this.totalDinero);
    this.totalDinero = this.formatCurrency(numericValue); // Format the value on blur
  }

  calcularDineroACompras(totalDinero: number): void {
    const porcentajeCompra = 0.63;
    const porcentajeAgregado = 0.05;

    this.totalIngresado = totalDinero;

    const dineroBase = totalDinero * porcentajeCompra;
    this.dineroAgregadoACompras = this.roundToNearestTen(
      dineroBase * porcentajeAgregado
    );

    const dineroTotalCompra = dineroBase + this.dineroAgregadoACompras;

    this.dineroCompras = this.roundToNearestTen(dineroTotalCompra);
    this.dineroGastos = this.calculateRemainingGastos(
      totalDinero,
      this.dineroCompras
    );
  }

  calculateRemainingGastos(totalDinero: number, dineroCompras: number): number {
    return totalDinero - dineroCompras;
  }

  roundToNearestTen(value: number): number {
    return Math.round(value / 10) * 10;
  }

  limpiar(): void {
    this.totalDinero = '';
    this.totalIngresado = 0;
    this.dineroCompras = 0;
    this.dineroGastos = 0;
    this.dineroAgregadoACompras = 0;
  }
}
