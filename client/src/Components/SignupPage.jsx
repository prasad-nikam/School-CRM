import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";
const SignupPage = () => {
	const navigate = useNavigate();
	const [userType, setUserType] = useState("student");
	const [totalFees, setTotalFees] = useState(0);
	const [classes, setClasses] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		gender: "",
		dob: "",
		email: "",
		phone: "",
		salary: "",
		assignedClass: "",
		feesPaid: "",
		classname: "",
		password: "",
		confirmPassword: "",
		userType: userType,
	});
	const [error, setError] = useState("");

	const handleUserTypeChange = (e) => {
		setUserType(e.target.value);
		// Clear fields not applicable to the selected type
		setFormData({
			name: "",
			gender: "",
			dob: "",
			email: "",
			phone: "",
			salary: "",
			assignedClass: "",
			feesPaid: "",
			classname: "",
			password: "",
			confirmPassword: "",
			userType: e.target.value,
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const classes = await NodeInstance.get("/getclasslist", {
					withCredentials: true,
				});
				setClasses(classes.data);
				console.log(classes);
			} catch (error) {
				console.log(error?.response?.data);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		if (name === "classname") {
			const classDetails = classes.find(
				(classItem) => classItem._id === value
			);
			setTotalFees(classDetails.studentfee);
		}
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		if (formData.password !== formData.confirmPassword) {
			setError("Passwords don't match");
			return;
		}

		if (!formData.name || !formData.email || !formData.phone) {
			setError("Please fill in all required fields.");
			return;
		}

		setError("");
		console.log("Signup Data Submitted:", { userType, ...formData });

		try {
			const response = await NodeInstance.post("/signup", formData, {
				withCredentials: true,
			});
			console.log("result :", response.data);
			navigate("/");
		} catch (error) {
			setError(error.message);
			console.error("Error signing up:", error);
			console.log(userType);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

				<div className="mb-4">
					<label
						htmlFor="userType"
						className="block text-sm font-medium text-gray-700"
					>
						Select User Type
					</label>
					<select
						id="userType"
						name="userType"
						value={userType}
						onChange={handleUserTypeChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					>
						<option value="student">Student</option>
						<option value="teacher">Teacher</option>
					</select>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Shared Fields */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="gender"
							className="block text-sm font-medium text-gray-700"
						>
							Gender
						</label>
						<select
							id="gender"
							name="gender"
							value={formData.gender}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div>
						<label
							htmlFor="dob"
							className="block text-sm font-medium text-gray-700"
						>
							Date of Birth
						</label>
						<input
							type="date"
							id="dob"
							name="dob"
							value={formData.dob}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Phone
						</label>
						<input
							type="text"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					{/* Dynamic Fields */}
					{userType === "teacher" && (
						<>
							<div>
								<label
									htmlFor="salary"
									className="block text-sm font-medium text-gray-700"
								>
									Salary
								</label>
								<input
									type="number"
									id="salary"
									name="salary"
									value={formData.salary}
									onChange={handleInputChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="assignedClass"
									className="block text-sm font-medium text-gray-700"
								>
									Assigned Class
								</label>
								<select
									id="assignedClass"
									name="assignedClass"
									value={formData.assignedClass}
									onChange={handleInputChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="">Select Class</option>
									{classes.map((cls) => (
										<option value={cls._id} key={cls._id}>
											{cls.classname}
										</option>
									))}
								</select>
							</div>
						</>
					)}

					{userType === "student" && (
						<>
							<div>
								<label
									htmlFor="classname"
									className="block text-sm font-medium text-gray-700"
								>
									Class
								</label>
								<select
									id="classname"
									name="classname"
									value={formData.classname}
									onChange={handleInputChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								>
									<option value="">Select Class</option>
									{classes.map((cls) => (
										<option value={cls._id}>
											{cls.classname}
										</option>
									))}
								</select>
							</div>
							<div>
								<label
									htmlFor="totalFees"
									className="block text-sm font-medium text-gray-700"
								>
									Total fees
								</label>
								<input
									type="number"
									id="totalFees"
									name="feesPaid"
									value={totalFees}
									disabled
									onChange={handleInputChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 text-gray-500 focus:border-blue-500"
								/>
							</div>
							<div>
								<label
									htmlFor="feesPaid"
									className="block text-sm font-medium text-gray-700"
								>
									Fees Paid
								</label>
								<input
									type="number"
									id="feesPaid"
									name="feesPaid"
									value={formData.feesPaid}
									max={totalFees}
									onChange={handleInputChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
						</>
					)}

					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700"
					>
						password
					</label>

					<input
						type="password"
						name="password"
						id="password"
						value={formData.password}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>

					<label
						htmlFor="confermPassword"
						className="block text-sm font-medium text-gray-700"
					>
						Conferm Password
					</label>

					<input
						type="password"
						name="confirmPassword"
						value={formData.confirmPassword}
						onChange={handleInputChange}
						required
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
					/>

					{/* Error Message */}
					{error && <p className="text-sm text-red-500">{error}</p>}

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
					>
						Sign Up
					</button>
					<p>
						Alredy have account?{" "}
						<a className="text-blue-700" href="/login">
							Login
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
