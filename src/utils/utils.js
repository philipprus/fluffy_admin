import { useState, useEffect } from 'react';
import axios from 'axios';
import history, { href } from './history';

export const useDataApi = (initialUrl, initialData) => {
      const [data, setData] = useState(initialData);
      const [url, setUrl] = useState(initialUrl);
      const [fetch, setFetch] = useState(0);
      const [isLoading, setIsLoading] = useState(false);
      const [isError, setIsError] = useState(false);
      useEffect(() => {
        const fetchData = async () => {
          setIsError(false);
          setIsLoading(true);
          try {
            const result = await axios(url);
            setData(result.data);
          } catch (error) {
            setIsError(true);
          }
          setIsLoading(false);
        };
        fetchData();
      }, [url, fetch]);
      return [{ data, isLoading, isError }, setUrl, fetch, setFetch];
    };
    

  export const consoleLog = (text) => {
    process.env.NODE_ENV !== "production" && console.log(text);
  }

  export const deleteById = async(url, id, cb) => {
    return await axios
      .delete(url + id)
      .then(res => {
        if (res.status === 200) {
          return true
        }
      })
      .catch(err => {
        cb && cb(id, err);
      });
  };

  export  const removeByIdFromArr = (id, arr) => {

    const filtered = arr.filter(function(value) {
      return value._id !== id;
    });

    return filtered;
  };

  export const localStorageKeys = {
    access_token: "access_token",
    expires_at: "expires_at",
  };

 export const logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem(localStorageKeys.access_token);
    localStorage.removeItem(localStorageKeys.expires_at);
    // navigate to the home route
   href("/");
}

  export const isAuthenticated = () => {
    const expiresAtFromStorage = localStorage.getItem(localStorageKeys.expires_at);
    if (!expiresAtFromStorage) {
        return false;
    }
    // Check whether the current time is past the 
    // access token's expiry time
    const expiresAt = JSON.parse(expiresAtFromStorage);
    return new Date().getTime() < expiresAt;
}

