export const extractJwtFromHeaders = (request: any) => {
  const authHeader = request.headers.authorization;

  return authHeader?.split(' ')[1] || '';
};
