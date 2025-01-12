import { useState, useEffect } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";

const useFetchStudentInfo = () => {
	const [studentData, setStudentData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchStudentData = async () => {
			try {
				setIsLoading(true);
				const response = await NodeInstance.get("/studentDetails", {
					withCredentials: true,
				});
				setStudentData(response.data);
			} catch (err) {
				setError(err.message || "Something went wrong");
			} finally {
				setIsLoading(false);
			}
		};

		fetchStudentData();
	}, []);

	return { studentData, isLoading, error };
};

export default useFetchStudentInfo;
