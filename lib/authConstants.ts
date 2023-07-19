export const ACCESS_TOKEN = "access-token";
export const REFRESH_TOKEN = "refresh-token";

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }

  return JWT_SECRET_KEY;
}

export const jwtOpt = {
  audience: "api.metrobooks",
  issuer: "api.metrobooks",
  algorithms: ["HS256"],
};
