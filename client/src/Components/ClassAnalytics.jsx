import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const ClassAnalytics = () => {
	const { id } = useParams();
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

	// Calculate male and female student counts
	const maleCount = classDetails?.students.filter(
		(student) => student.gender === "male"
	).length;
	const femaleCount = classDetails?.students.filter(
		(student) => student.gender === "female"
	).length;

	// Chart data for gender distribution
	const genderChartData = {
		labels: ["Male", "Female"],
		datasets: [
			{
				label: "Number of Students",
				data: [maleCount, femaleCount],
				backgroundColor: ["#2196f3", "#e91e63"],
				borderColor: ["#1976d2", "#c2185b"],
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { position: "top" },
			title: { display: true, text: "Gender Distribution of Students" },
		},
	};

	return (
		<div className="min-h-screen bg-gray-100 py-6">
			<div className="container mx-auto px-4">
				{/* Header */}
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
					Class Analytics
				</h1>

				{/* Class Details */}
				<div className="bg-white shadow-md rounded-lg p-6 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Class Details
					</h2>
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
				</div>

				{/* Student List in Table Format */}
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
								{classDetails?.students.map(
									(student, index) => (
										<tr
											key={index}
											className={
												index % 2 === 0
													? "bg-gray-50"
													: "bg-white"
											}
										>
											<td className="py-2 px-4 border border-gray-300">
												{student.name}
											</td>
											<td className="py-2 px-4 border border-gray-300">
												{student.gender}
											</td>
											<td className="py-2 px-4 border border-gray-300">
												{new Date(
													student.dob
												).toLocaleDateString("en-CA")}
											</td>
											<td className="py-2 px-4 border border-gray-300">
												{student.phone}
											</td>
											<td className="py-2 px-4 border border-gray-300">
												{student.email}
											</td>
											<td className="py-2 px-4 border border-gray-300">
												{student.paidfee}
											</td>
										</tr>
									)
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Gender Distribution Graph */}
				<div className="bg-white shadow-md rounded-lg p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4">
						Gender Distribution
					</h2>
					<p>Total students = {maleCount + femaleCount}</p>
					<p>male students = {maleCount}</p>
					<p>female student = {femaleCount}</p>
					<div className="w-1/2 h-64">
						{/* Adjusted chart size */}
						<Bar data={genderChartData} options={chartOptions} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClassAnalytics;
