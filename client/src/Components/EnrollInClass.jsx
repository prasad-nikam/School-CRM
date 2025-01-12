import React, { useState, useEffect } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";
import { useParams } from "react-router-dom";

const EnrollInClass = () => {
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const { id } = useParams();
	const [formData, setFormData] = useState({
		classid: id,
		feespaid: 0,
		student: "",
		user: {
			role: "student",
		},
	});
	const [classDetails, setClassDetails] = useState();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await NodeInstance.get(`/courses/${id}`, {
					withCredentials: true,
				});
				setClassDetails(response.data);
				console.log(classDetails);
			} catch (error) {
				console.log(error?.response?.data);
			}
		};
		fetchData();
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");

		try {
			const response = await NodeInstance.post("/enroll", formData, {
				withCredentials: true,
			});
			setMessage(response.data.message);
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Enroll in Class
				</h2>
				<div className="bg-white shadow-md rounded-lg p-6 mb-6">
					<p className="text-lg text-gray-700">
						<strong>Name:</strong> {classDetails?.classname}
					</p>
					<p className="text-lg text-gray-700">
						<strong>Year:</strong> {classDetails?.year}
					</p>
					<p className="text-lg text-gray-700">
						<strong>Teacher:</strong>{" "}
						{classDetails?.teacher?.name === undefined
							? "Teacher Not Assigned Yet"
							: classDetails?.teacher?.name +
							  " (" +
							  classDetails?.teacher?.email +
							  ")"}
					</p>
					<p className="text-lg text-gray-700">
						<strong>Total Fees:</strong> {classDetails?.studentfee}
					</p>
				</div>

				{message && <p className="text-green-600 mb-4">{message}</p>}
				{error && <p className="text-red-600 mb-4">{error}</p>}

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label
							htmlFor="feespaid"
							className="block text-sm font-medium mb-1"
						>
							Fees Paid
						</label>
						<input
							type="number"
							id="feespaid"
							name="feespaid"
							value={formData.feespaid}
							max={classDetails?.studentfee}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
							min="0"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
					>
						Enroll Student
					</button>
				</form>
			</div>
		</div>
	);
};

export default EnrollInClass;
