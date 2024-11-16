import { Injectable, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  public embauchees = signal<Cv[]>([]);

  constructor() {}

  /**
   *
   * Retourne la liste des embauchees
   *
   * @returns CV[]
   *
   */
  getEmbauchees(): Cv[] {
    return this.embauchees();
  }

  /**
   *
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Cv): boolean {
    const currentEmbauchees = this.embauchees();
    if (!currentEmbauchees.includes(cv)) {
      this.embauchees.update((embauchees) => [...embauchees, cv]);
      return true;
    }
    return false;
  }
}
