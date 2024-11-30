import { Injectable } from "@angular/core";
import { Cv } from "../model/cv";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { API } from "../../../config/api.config";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CvService {
  private cvsSubject = new BehaviorSubject<Cv[]>([]); // Stocke les CVs récupérés
  cvs$: Observable<Cv[]> = this.cvsSubject.asObservable(); // Expose les CVs comme observable

  private cvs: Cv[] = []; // Liste fictive locale

  // Subject pour le flux des CVs sélectionnés
  #selectCvSuject$ = new BehaviorSubject<Cv | null>(null);
  selectCv$ = this.#selectCvSuject$.asObservable();

  constructor(private http: HttpClient) {
    // Initialisation des CVs fictifs
    this.cvs = [
      new Cv(1, "aymen", "sellaouti", "teacher", "as.jpg", "1234", 40),
      new Cv(2, "skander", "sellaouti", "enfant", "       ", "1234", 4),
    ];
  }

  /**
   * Charger les CVs depuis l'API et les stocker dans le BehaviorSubject.
   * @returns Observable<Cv[]>
   */
  loadCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv).pipe(
      tap((cvs) => this.cvsSubject.next(cvs)) // Met à jour les CVs dans le BehaviorSubject
    );
  }

  /**
   * Retourner la liste des CVs stockés dans le BehaviorSubject.
   * @returns Observable<Cv[]>
   */
  getCvs(): Observable<Cv[]> {
    return this.http.get<Cv[]>(API.cv);
  }

  /**
   * Ajouter un CV au flux des CVs sélectionnés.
   * @param cv : Cv
   */
  selectCv(cv: Cv): void {
    this.#selectCvSuject$.next(cv); // Met à jour le CV sélectionné
  }

  /**
   * Supprimer un CV par son id.
   * @param id : number
   * @returns Observable<any>
   */
  deleteCvById(id: number): Observable<any> {
    return this.http.delete<any>(`${API.cv}/${id}`).pipe(
      tap(() => {
        // Supprime localement après la suppression sur le serveur
        const updatedCvs = this.cvsSubject.value.filter((cv) => cv.id !== id);
        this.cvsSubject.next(updatedCvs);
      })
    );
  }

  /**
   * Ajouter un nouveau CV via l'API.
   * @param cv : Cv
   * @returns Observable<Cv>
   */
  addCv(cv: Cv): Observable<Cv> {
    return this.http.post<Cv>(API.cv, cv).pipe(
      tap((newCv) => {
        // Ajouter localement après ajout sur le serveur
        const updatedCvs = [...this.cvsSubject.value, newCv];
        this.cvsSubject.next(updatedCvs);
      })
    );
  }

  /**
   * Rechercher des CVs par nom dans le BehaviorSubject ou via l'API.
   * @param name : string
   * @returns Observable<Cv[]>
   */
  searchCvs(name: string): Observable<Cv[]> {
    const params = new HttpParams().set(
      "filter",
      JSON.stringify({ where: { name: { like: `%${name}%` } } })
    );
    return this.http.get<Cv[]>(API.cv, { params });
  }

  /**
   * Rechercher des CVs localement en fonction d'une propriété.
   * @param property : string
   * @param value : string
   * @returns Cv[]
   */
  selectByProperty(property: string, value: string): Cv[] {
    return this.cvsSubject.value.filter(
      (cv) => cv[property as keyof Cv] === value
    );
  }

  /**
   * Retourner un CV par son ID.
   * @param id : number
   * @returns Observable<Cv>
   */
  getCvById(id: number): Observable<Cv> {
    return this.http.get<Cv>(`${API.cv}/${id}`);
  }
}
