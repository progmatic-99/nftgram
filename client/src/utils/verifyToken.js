export const verifyToken = (token) => {
  const decoded = jwt.decode(token, { complete: true, json: true });
  if (decoded.expiredAt > new Date()) {
    return false;
  }
};
