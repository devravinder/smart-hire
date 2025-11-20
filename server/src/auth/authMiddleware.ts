import { Elysia } from "elysia";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { UnAuthorized } from "../errors.js";

const BEARER_TOKEN_PREFIX = "Bearer ";
const PROJECT_JWKS = createRemoteJWKSet(
  new URL(`https://${process.env.SUPABSE_PROJECT_ID}.supabase.co/auth/v1/.well-known/jwks.json`)
);

async function verifyProjectJWT(jwt: string) {
  return jwtVerify(jwt, PROJECT_JWKS);
}


type JwtPayload = {
 email: string,
 phone: string,

 user_metadata: Record<string, string>,
 app_metadata: Record<string, any>,

 //
 iat: number,
 exp: number,
 sub: string,
 iss: string,
}

export const authMiddleware = new Elysia().macro("auth", {
  resolve: async ({ headers: { authorization } }) => {
    const token = authorization?.replace(BEARER_TOKEN_PREFIX, "");
    if (!token) throw new UnAuthorized("missing access token");
    try {
      const data = await verifyProjectJWT(token);
      return {
        jwt: data.payload as JwtPayload,
      };
    } catch (error: any) {
      throw new UnAuthorized(error?.message || "JWT error");
    }
  },
});

export default authMiddleware;
