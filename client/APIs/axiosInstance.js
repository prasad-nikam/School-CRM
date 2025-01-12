import axios from "axios";
const HOST = "http://localhost";
export const NodeInstance = axios.create({
	baseURL: `${HOST}:8080/api`,
	timeout: 9000,
});
