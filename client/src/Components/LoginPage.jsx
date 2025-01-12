import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";
const LoginPage = () => {
	const navigate = useNavigate();

	const [userType, setUserType] = useState("student"); // Default user type
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		userType: userType,
	});

	const [error, setError] = useState("");

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleUserTypeChange = (e) => {
		setUserType(e.target.value);
		setFormData({
			email: formData.email,
			password: formData.password,
			userType: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Basic validation
		if (!formData.email || !formData.password) {
			setError("Please fill in all fields");
			return;
		}

		// Clear error and simulate form submission
		setError("");
		console.log("Login Data Submitted:", { userType, ...formData });
		try {
			const response = await NodeInstance.post("/login", formData, {
				withCredentials: true,
			});
			console.log("result :", response.data);
			navigate("/dashboard");
		} catch (error) {
			setError(error.response.data.message || "something wrong");
			console.error("Error signing up:", error);
			console.log(userType);
		}
		// Add API call or form processing logic here
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* User Type Selector */}
					<div>
						<label
							htmlFor="userType"
							className="block text-sm font-medium text-gray-700"
						>
							Login as a:
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
							<option value="admin">Admin</option>
						</select>
					</div>

					{/* email Input */}
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							email
						</label>
						<input
							type="text"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					{/* Password Input */}
					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					{/* Error Message */}
					{error && <p className="text-sm text-red-500">{error}</p>}

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
					>
						Login
					</button>
					<p>
						Don't have account?{" "}
						<a className="text-blue-700" href="/signup">
							Sign Up
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
