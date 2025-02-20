import Cookies from "universal-cookie";

const client = new Cookies();

export class CookieService {
  static set(name: string, token: string) {
    client.set(name, token, {
      path: "/",
      sameSite: "none",
      secure: true,
    });
  }

  static delete(name: string) {
    client.remove(name, { path: "/", sameSite: "none", secure: true });
  }

  static get(name: string) {
    return client.get(name);
  }
}
