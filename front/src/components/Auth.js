export const isAuthenticated = () => {
    const token = localStorage.getItem('token'); 
  
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
  
      const isTokenExpired = Date.now() >= tokenPayload.exp * 1000;
  
      return !isTokenExpired;
    }
  
    return false;
  };
  