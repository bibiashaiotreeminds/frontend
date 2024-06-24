import axios from "axios";

let baseURL;

if (process.env.REACT_APP_ENVIRONMENT === "prod") {
    baseURL = process.env.REACT_APP_PROD;
} else if (process.env.REACT_APP_ENVIRONMENT === "stage") {
    baseURL = process.env.REACT_APP_STAGE;
} else {
    baseURL = process.env.REACT_APP_LOCAL;
}
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 10 * 60 * 1000,
    timeoutErrorMessage: "We are unable to connect to the server. Please try again later.",
});
