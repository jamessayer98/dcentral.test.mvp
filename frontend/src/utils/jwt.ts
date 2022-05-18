import jwt_decode from "jwt-decode";

export interface JWTPayload {
  sub: number;
  iat: number;
  exp: number;
}

export const validateToken = (token: string): boolean => {
  const now = Math.round(new Date().getTime() / 1000);
  const decodedToken = jwt_decode<JWTPayload>(token);
  const isValid = decodedToken && now < decodedToken.exp;
  return isValid;
};
