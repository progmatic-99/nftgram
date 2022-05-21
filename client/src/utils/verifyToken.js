import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  /**
   * Checks whether the token is valid or not.
   */
  const decoded = jwt.decode(token);

  if (!decoded) {
    return false;
  }

  const now = new Date().getTime();
  const tokenExp = new Date(decoded.expiredAt).getTime();

  return now < tokenExp;
};
