import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";

const ClassCard = ({
	classname,
	year,
	teacher,
	studentCount,
	fees,
	id,
	isEnrolled,
}) => {
	const navigate = useNavigate();

	const [usertype, setUsertype] = useState("");
	useEffect(() => {
		async function fetchData() {
			try {
				const responce = await NodeInstance.get("/getLoginDetails", {
					withCredentials: true,
				});
				setUsertype(responce?.data?.usertype);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const handleClickOnDetails = () => {
		navigate(`/class/${id}`);
	};

	const handleClickOnEnroll = () => {
		navigate(`/enroll/${id}`);
	};

	const handleClickOnDelete = async () => {
		const userConfirmed = confirm(
			"Are you sure you want to delete this class?"
		);
		if (userConfirmed) {
			try {
				const responce = await NodeInstance.delete(`/courses/${id}`, {
					withCredentials: true,
				});
				console.log(responce);
			} catch (error) {
				console.log(error);
			}
			console.log("Class deleted!");
		} else {
			console.log("Deletion canceled.");
		}
	};
	return (
		<div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
			<h2 className="text-xl font-bold text-blue-600 mb-2">
				{classname}
			</h2>
			<p className="text-gray-700">
				<span className="font-semibold">Year:</span> {year}
			</p>
			<p className="text-gray-700">
				<span className="font-semibold">Teacher:</span> {teacher}
			</p>
			<p className="text-gray-700">
				<span className="font-semibold">Students:</span> {studentCount}
			</p>
			<p className="text-gray-700">
				<span className="font-semibold">Fees:</span> ₹{fees}
			</p>
			<div className="flex justify-around">
				<button
					onClick={handleClickOnDetails}
					className="mt-4 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
				>
					View Details
				</button>

				{usertype == "student" && !isEnrolled && (
					<>
						<button
							onClick={handleClickOnEnroll}
							className="mt-4 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
						>
							Enroll Class
						</button>
					</>
				)}
				{usertype == "admin" && !isEnrolled && (
					<>
						<button
							onClick={handleClickOnDelete}
							className="mt-4 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
						>
							Delete Class
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ClassCard;
