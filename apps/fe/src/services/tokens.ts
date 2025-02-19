import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/const/cookies";
import { CookieService } from "@/libs/universal-cookies";

export class TokensService {
  static setTokens(access: string, refresh: string) {
    if (!access || !refresh) return;

    CookieService.set(ACCESS_TOKEN_COOKIE_NAME, access);
    CookieService.set(REFRESH_TOKEN_COOKIE_NAME, refresh);
  }

  static clearTokens() {
    CookieService.delete(ACCESS_TOKEN_COOKIE_NAME);
    CookieService.delete(REFRESH_TOKEN_COOKIE_NAME);
  }

  static getAccessToken() {
    CookieService.get(ACCESS_TOKEN_COOKIE_NAME);
  }

  static getRefreshToken() {
    CookieService.get(REFRESH_TOKEN_COOKIE_NAME);
  }

  static getTokens() {
    CookieService.get(ACCESS_TOKEN_COOKIE_NAME);
    CookieService.get(REFRESH_TOKEN_COOKIE_NAME);
  }
}
