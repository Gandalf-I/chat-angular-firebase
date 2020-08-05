import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {first, switchMap} from 'rxjs/operators';
import {auth} from 'firebase/app';
import {User} from 'firebase';
import {IUser} from '@shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<User>;
  public uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.uid = user.uid;
          return this.db.list(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public async isLoggedIn(): Promise<boolean> {
    return this.getUser().then(value => value.uid !== null).catch(() => false);
  }

  public async getUser(): Promise<User> {
    return this.user$.pipe(first()).toPromise();
  }

  public getUserById(id: string): AngularFireObject<IUser> {
    return this.db.object(`users/${id}`);
  }

  public async googleSignIn(): Promise<void> {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public async simpleSignUp(email: string, password: string, name: string): Promise<void> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.registerUser(credential.user, name);
  }

  public async simpleSignIn(email: string, password: string): Promise<auth.UserCredential> {
    return auth().signInWithEmailAndPassword(email, password);
  }

  private async oAuthLogin(provider): Promise<void> {
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.loginUser(credential.user);
  }

  private async loginUser(user): Promise<void> {
    this.getUser()
      .then(data => {
        if (!data.hasOwnProperty('1')) {
          return this.registerUser(user);
        } else {
          return;
        }
      });
  }


  private async registerUser(user: User, name?: string): Promise<void> {

    const userData = {
      email: user.email,
      name: user.displayName ? user.displayName : name,
      photoURL: user.photoURL,
      // dialogs: {
      //   [user.uid]: true,
      // }
      // status: true
    };
    this.db.list('users').set(user.uid, userData);
  }


  public async signOut(): Promise<boolean> {
    await this.afAuth.signOut();
    return this.router.navigate(['/auth']);
  }

}
