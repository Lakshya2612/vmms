import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    )}`,
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
      return response;
    },
    async (error) => {
        const originalRequest = error.config;
        
        if (
            error.response &&
            error.response.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            
            const refreshToken = document.cookie.replace(
                /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
                "$1"
            );
            
            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/api/v1/user/refreshtoken`,
                    { refreshToken },{ withCredentials: true,}
                );
                
                const newAccessToken = response.data.accessToken;
                
                document.cookie = `accessToken=${newAccessToken}; path=/`;
                
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                
                return axiosInstance(originalRequest);
            } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
