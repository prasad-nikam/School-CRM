import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
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

const AnalyticsPage = () => {
	// Mock data
	const teachers = [
		{ name: "Mr. Smith", salary: 50000 },
		{ name: "Ms. Johnson", salary: 45000 },
	];

	const students = [
		{ name: "John Doe", feesPaid: 20000, month: "2025-01" },
		{ name: "Jane Doe", feesPaid: 18000, month: "2025-01" },
		{ name: "Alice Brown", feesPaid: 25000, month: "2025-02" },
		{ name: "Bob Green", feesPaid: 15000, month: "2025-02" },
	];

	const [viewType, setViewType] = useState("monthly"); // Toggle state: "monthly" or "yearly"
	const [selectedYear, setSelectedYear] = useState("2025");
	const [selectedMonth, setSelectedMonth] = useState("01");

	// Calculate totals
	const calculateMonthlyData = (month, year) => {
		const monthlyExpenses = teachers.reduce(
			(acc, teacher) => acc + teacher.salary,
			0
		);
		const monthlyIncome = students
			.filter(
				(student) =>
					student.month === `${year}-${month.padStart(2, "0")}`
			)
			.reduce((acc, student) => acc + student.feesPaid, 0);

		return { monthlyExpenses, monthlyIncome };
	};

	const calculateYearlyData = (year) => {
		const yearlyExpenses = teachers.reduce(
			(acc, teacher) => acc + teacher.salary * 12,
			0
		);
		const yearlyIncome = students
			.filter((student) => student.month.startsWith(year))
			.reduce((acc, student) => acc + student.feesPaid, 0);

		return { yearlyExpenses, yearlyIncome };
	};

	// Get current data
	const { monthlyExpenses, monthlyIncome } =
		viewType === "monthly"
			? calculateMonthlyData(selectedMonth, selectedYear)
			: {};
	const { yearlyExpenses, yearlyIncome } =
		viewType === "yearly" ? calculateYearlyData(selectedYear) : {};

	// Chart data
	const chartData = {
		labels: ["Expenses", "Income"],
		datasets: [
			{
				label: viewType === "monthly" ? "Monthly Data" : "Yearly Data",
				data:
					viewType === "monthly"
						? [monthlyExpenses, monthlyIncome]
						: [yearlyExpenses, yearlyIncome],
				backgroundColor: ["#e57373", "#81c784"],
				borderColor: ["#d32f2f", "#388e3c"],
				borderWidth: 1,
			},
		],
	};

	const chartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { position: "top" },
			title: {
				display: true,
				text:
					viewType === "monthly"
						? `Monthly Analytics for ${selectedMonth}/${selectedYear}`
						: `Yearly Analytics for ${selectedYear}`,
			},
		},
	};

	return (
		<div className="min-h-screen bg-gray-100 py-6">
			<div className="container mx-auto px-4">
				<h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
					Analytics Page
				</h1>

				{/* View Toggle */}
				<div className="flex justify-center items-center mb-6">
					<button
						onClick={() => setViewType("monthly")}
						className={`px-4 py-2 rounded-l-lg ${
							viewType === "monthly"
								? "bg-blue-600 text-white"
								: "bg-gray-300 text-gray-700"
						}`}
					>
						Monthly
					</button>
					<button
						onClick={() => setViewType("yearly")}
						className={`px-4 py-2 rounded-r-lg ${
							viewType === "yearly"
								? "bg-blue-600 text-white"
								: "bg-gray-300 text-gray-700"
						}`}
					>
						Yearly
					</button>
				</div>

				{/* Filters */}
				<div className="flex justify-center items-center mb-6">
					{viewType === "monthly" && (
						<div className="flex space-x-4">
							<div>
								<label
									htmlFor="month"
									className="block text-gray-700 mb-1"
								>
									Month
								</label>
								<select
									id="month"
									value={selectedMonth}
									onChange={(e) =>
										setSelectedMonth(e.target.value)
									}
									className="p-2 border border-gray-300 rounded-md"
								>
									{Array.from({ length: 12 }, (_, i) => {
										const month = (i + 1)
											.toString()
											.padStart(2, "0");
										return (
											<option key={month} value={month}>
												{month}
											</option>
										);
									})}
								</select>
							</div>
							<div>
								<label
									htmlFor="year"
									className="block text-gray-700 mb-1"
								>
									Year
								</label>
								<select
									id="year"
									value={selectedYear}
									onChange={(e) =>
										setSelectedYear(e.target.value)
									}
									className="p-2 border border-gray-300 rounded-md"
								>
									<option value="2025">2025</option>
									<option value="2024">2024</option>
									<option value="2023">2023</option>
								</select>
							</div>
						</div>
					)}
					{viewType === "yearly" && (
						<div>
							<label
								htmlFor="year"
								className="block text-gray-700 mb-1"
							>
								Year
							</label>
							<select
								id="year"
								value={selectedYear}
								onChange={(e) =>
									setSelectedYear(e.target.value)
								}
								className="p-2 border border-gray-300 rounded-md"
							>
								<option value="2025">2025</option>
								<option value="2024">2024</option>
								<option value="2023">2023</option>
							</select>
						</div>
					)}
				</div>

				{/* Bar Chart */}
				<div className="bg-white shadow-md rounded-lg p-6">
					<div className="w-full h-64">
						<Bar data={chartData} options={chartOptions} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsPage;
