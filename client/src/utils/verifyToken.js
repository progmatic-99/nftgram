import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  /**
   * Checks whether the token is valid or not.
   */
  const decoded = jwt.decode(token);
  console.log(decoded);
  const now = new Date().getMinutes();
  const tokenExp = new Date(decoded.expiredAt).getMinutes();

  if (tokenExp - now < 15) {
    console.log(tokenExp - now);
    return true;
  }

  return false;
};
