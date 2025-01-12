import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";
import ClassCard from "./ClassCard";
const StudentProfile = () => {
	const navigate = useNavigate();

	const [studentData, setStudentData] = useState({});
	useEffect(() => {
		async function fetchData() {
			try {
				const responce = await NodeInstance.get("/studentDetails", {
					withCredentials: true,
				});
				setStudentData(responce.data);
				console.log(studentData);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const handleLogout = async () => {
		try {
			await NodeInstance.get("/logout", {
				withCredentials: true,
			});
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="min-h-screen bg-gray-100 py-6">
				<div className="container mx-auto px-4">
					{/* Header */}
					<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
						Student Dashboard
					</h1>

					{/* Profile Section */}
					<div className="bg-white shadow-md rounded-lg p-6 mb-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							My Profile
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
								<p className="text-sm font-medium text-gray-500">
									Name:
								</p>
								<p className="text-lg text-gray-800">
									{studentData?.name}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Gender:
								</p>
								<p className="text-lg text-gray-800">
									{studentData?.gender}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Date of Birth:
								</p>
								<p className="text-lg text-gray-800">
									{studentData?.dob}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Email:
								</p>
								<p className="text-lg text-gray-800">
									{studentData?.email}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Phone:
								</p>
								<p className="text-lg text-gray-800">
									{studentData?.phone}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Class:
								</p>
								<p className="text-lg text-gray-800">
									{/* {studentData?.classname} */}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Fees Paid:
								</p>
								<p className="text-lg text-gray-800">
									{studentData?.feesPaid}
								</p>
							</div>
						</div>
					</div>

					{/* Teacher Section */}
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							My Courses
						</h2>

						<div className="grid grid-cols-4 gap-4">
							{studentData?.classname?.map((cls) => (
								<li className="list-none" key={cls.classname}>
									<ClassCard
										id={cls._id}
										classname={cls?.classname}
										year={cls?.year}
										teacher={cls?.teacher?.name}
										fees={cls?.studentfee}
										isEnrolled={true}
									/>
								</li>
							))}

							{/* {teachers.map((teacher, index) => (
								<div
									key={index}
									className="border p-4 rounded-lg bg-gray-50 hover:shadow-md transition"
								>
									<p className="text-lg font-semibold text-gray-800">
										{teacher.name}
									</p>
									<p className="text-sm text-gray-500">
										Subject: {teacher.subject}
									</p>
									<p className="text-sm text-gray-500">
										Assigned Class: {teacher.assignedClass}
									</p>
								</div>
							))} */}
						</div>
					</div>
				</div>
			</div>

			<button className="p-2 bg-black text-white" onClick={handleLogout}>
				logout
			</button>
		</>
	);
};

export default StudentProfile;
