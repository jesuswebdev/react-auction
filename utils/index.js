export const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user || {};
  if (!token) {
    return undefined;
  }
  return {
    'X-Auth': token
  };
}
