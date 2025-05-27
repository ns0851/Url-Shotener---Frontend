import axios, { isAxiosError } from "axios";

const axiosInstance = axios.create({
        baseURL: "http://localhost:3000",
        timeout: 10000
})

axiosInstance.interceptors.response.use (
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            const {status, data} = error.response;

            switch(status) {
                case 400:
                    console.log("Bad Request: ", data);
                    break;
                case 403:
                    console.log("Forbidden : ", data);
                    break;
                case 404:
                    console.log("Not Found : ", data);
                    break;
                case 500:
                    console.log("Server Error : ", data);
                    break;
                    
            }
        } else if (error.request) {
            console.error("Network Error: No response recieved", error.request);
        } else {
            console.error("Error: ", error.message);
        }

        return Promise.reject({
            isAxiosError: true,
            message: error.response?.data?.message || error.message || "Unknown",
            status: error.response?.status,
            data: error.response?.data,
            originalError: error
        });
    }
)

export default axiosInstance;