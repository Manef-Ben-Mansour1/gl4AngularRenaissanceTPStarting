import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css'
})
export class TtcComponent {

  prix = signal<number>(0);
  quantite = signal<number>(1);
  tva = signal<number>(0);
  prixUnitaire = computed(() => this.prix() + (this.prix() * this.tva()) / 100);
  remise = computed(() => {
    const prixAvantRemise=this.prixUnitaire()*this.quantite();
    return (this.quantite() > 15) ? 0.3*prixAvantRemise :
           (this.quantite() > 10) ? 0.2*prixAvantRemise : 0;
  });
  prixTotal = computed(() => {
    return this.quantite() * this.prixUnitaire() - this.remise();
  });
  onTvaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.tva.set(input.valueAsNumber || 0);
  }
  onPriceChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.prix.set(input.valueAsNumber || 0);
  }
  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.quantite.set(input.valueAsNumber || 0);
  }
}
