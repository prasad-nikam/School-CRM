import axios from "axios";
const HOST = "http://13.201.223.5";
export const NodeInstance = axios.create({
	baseURL: `${HOST}:8080/api`,
	timeout: 9000,
});
