import { Injectable, computed, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { map, Observable, tap } from 'rxjs';
import { UserLogin } from '../dto/user-login.dto';
import { UserInfo } from '../dto/user-info.dto';
import { CONSTANTES } from 'src/config/const.config';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const storedUser = localStorage.getItem(CONSTANTES.user_key);
    if (storedUser) {
      this.userSignal.set(JSON.parse(storedUser) as UserLogin);
    }
  }
  private userSignal = signal<UserLogin | null>(null);
  isAuthenticated = computed<boolean>(() => {
    const user = this.userSignal();
    return user !== null && user.token !== null;
  });
  userInfo = computed<UserInfo | null>(() => {
    const user = this.userSignal();
    return user ? { userId: user.userId, email: user.email } : null;
  });

  login(credentials: CredentialsDto): Observable<boolean> {
    return this.http.post<LoginResponseDto>(API.login, credentials).pipe(
      tap((response) => {
        const user: UserLogin = {
          token: response.id,
          created: response.created,
          ttl: response.ttl,
          userId: response.userId,
          email: credentials.email,
        };

        this.userSignal.set(user);
        localStorage.setItem(CONSTANTES.user_key, JSON.stringify(user));
      }),
      map(() => true)
    );
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem(CONSTANTES.user_key);
  }
}
