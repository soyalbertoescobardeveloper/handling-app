import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  login(email: string, password: string): Promise<boolean> {
    // Aquí puedes agregar la lógica de autenticación, como enviar datos al servidor.
    // Si la autenticación es exitosa, establece isAuthenticated en true y devuelve una promesa resuelta.
    // De lo contrario, devuelve una promesa rechazada.
    return new Promise((resolve, reject) => {
      // Simulación de autenticación exitosa (reemplaza con tu propia lógica de autenticación)
      if (email === 'user@example.com' && password === 'password') {
        this.isAuthenticated = true;
        resolve(true);
      } else {
        this.isAuthenticated = false;
        reject('Credenciales incorrectas');
      }
    });
  }
   logout(): void {
    // Realiza cualquier limpieza necesaria al cerrar la sesión, como eliminar tokens.
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
