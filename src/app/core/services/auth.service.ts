import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from '@angular/fire/auth';
import { LocalStorage } from '@burand/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {
    this.initAuthListener();
  }

  initAuthListener() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        if (typeof window !== 'undefined') {
          LocalStorage.setItem('user', JSON.stringify(user));
        }
      } else {
        LocalStorage.removeItem('user');
      }
    });
  }
  async signOut() {
    try {
      await signOut(this.auth);
    } catch (err) {
      console.error(err);
    }
  }

  signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log('show');
    } catch (err) {
      console.error(err);
    }
  };

}
