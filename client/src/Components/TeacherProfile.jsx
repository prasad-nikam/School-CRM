import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";
const TeacherProfile = () => {
	const navigate = useNavigate();
	const [teacherData, setTeacherData] = useState({});
	useEffect(() => {
		async function fetchData() {
			try {
				const responce = await NodeInstance.get("/teacherDetails", {
					withCredentials: true,
				});
				setTeacherData(responce.data);
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

	const handleClickOnDetails = () => {
		navigate(`/class/${teacherData?.classdetails[0]._id}`);
	};

	return (
		<>
			<div className="min-h-screen bg-gray-100 py-6">
				<div className="container mx-auto px-4">
					{/* Header */}
					<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
						Teacher Dashboard
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
									{teacherData?.name}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Gender:
								</p>
								<p className="text-lg text-gray-800">
									{teacherData?.gender}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Date of Birth:
								</p>
								<p className="text-lg text-gray-800">
									{teacherData?.dob}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Email:
								</p>
								<p className="text-lg text-gray-800">
									{teacherData?.email}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Phone:
								</p>
								<p className="text-lg text-gray-800">
									{teacherData?.phone}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Salary:
								</p>
								<p className="text-lg text-gray-800">
									{teacherData?.salary}
								</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-500">
									Assigned Class:
								</p>
								<p className="text-lg text-gray-800">
									{teacherData?.assignedClass}
								</p>
							</div>
						</div>
					</div>

					{/* Classes and Students Section */}
					<div className="bg-white shadow-md rounded-lg p-6">
						<h2 className="text-2xl font-semibold text-gray-800 mb-4">
							My Classe Details
						</h2>
						<div className="grid grid-cols-1 gap-4">
							{teacherData?.classdetails?.map(
								(classData, index) => (
									<div
										key={index}
										className="border p-4 rounded-lg bg-gray-50 hover:shadow-md transition"
									>
										<p className="text-lg font-semibold text-gray-800">
											{classData?.classname} -{" "}
											{classData?.year}
										</p>
										<p className="text-sm text-gray-500">
											Student Fees:{" "}
											{classData?.studentfee}
										</p>
										{/* ===============*/}
										<button
											onClick={handleClickOnDetails}
											className="my-4 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
										>
											View Details
										</button>

										<div className="bg-white shadow-md rounded-lg p-6 mb-6">
											<h2 className="text-2xl font-semibold text-gray-800 mb-4">
												Students List
											</h2>
											<div className="overflow-x-auto">
												<table className="min-w-full text-left table-auto border-collapse border border-gray-300">
													<thead>
														<tr className="bg-gray-200">
															<th className="py-2 px-4 border border-gray-300">
																Name
															</th>
															<th className="py-2 px-4 border border-gray-300">
																Gender
															</th>
															<th className="py-2 px-4 border border-gray-300">
																DOB
															</th>
															<th className="py-2 px-4 border border-gray-300">
																Phone
															</th>
															<th className="py-2 px-4 border border-gray-300">
																Email
															</th>
															<th className="py-2 px-4 border border-gray-300">
																Fees Paid
															</th>
														</tr>
													</thead>
													<tbody>
														{classData?.students?.map(
															(
																student,
																index
															) => (
																<tr
																	key={index}
																	className={
																		index %
																			2 ===
																		0
																			? "bg-gray-50"
																			: "bg-white"
																	}
																>
																	<td className="py-2 px-4 border border-gray-300">
																		{
																			student.name
																		}
																	</td>
																	<td className="py-2 px-4 border border-gray-300">
																		{
																			student.gender
																		}
																	</td>
																	<td className="py-2 px-4 border border-gray-300">
																		{new Date(
																			student.dob
																		).toLocaleDateString(
																			"en-CA"
																		)}
																	</td>
																	<td className="py-2 px-4 border border-gray-300">
																		{
																			student.phone
																		}
																	</td>
																	<td className="py-2 px-4 border border-gray-300">
																		{
																			student.email
																		}
																	</td>
																	<td className="py-2 px-4 border border-gray-300">
																		{
																			student.paidfee
																		}
																	</td>
																</tr>
															)
														)}
													</tbody>
												</table>
											</div>
										</div>

										{/* =============== */}
									</div>
								)
							)}
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

export default TeacherProfile;
