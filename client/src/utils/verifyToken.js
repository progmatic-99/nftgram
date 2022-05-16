import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  /**
   * Checks whether the token is valid or not.
   */
  const decoded = jwt.decode(token);

  if (!decoded) {
    return false;
  }

  const now = new Date().getDay();
  const tokenExp = new Date(decoded.expiredAt).getDay();

  if (tokenExp - now === 1) {
    return true;
  }

  return false;
};
