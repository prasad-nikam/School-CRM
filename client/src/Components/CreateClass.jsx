import React, { useState, useEffect } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";

function CreateClass() {
	const [formData, setFormData] = useState({
		classname: "",
		year: "",
		studentfee: "",
		maxStudent: "",
		teacher: "",
	});

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [teachers, setTeachers] = useState();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
		async function fetchData() {
			try {
				const responce = await NodeInstance.get("/allteachers", {
					withCredentials: true,
				});
				setTeachers(responce.data);
			} catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		try {
			const response = await NodeInstance.post("/courses", formData, {
				withCredentials: true,
			});

			setMessage({
				type: "success",
				text: "Class created successfully!",
			});
			setFormData({
				classname: "",
				year: "",
				studentfee: "",
				maxStudent: "",
				teacher: "",
			});
		} catch (error) {
			console.error(error);
			setMessage({
				type: "error",
				text: "Failed to create class. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto mt-10">
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
				Create New Class
			</h2>
			{message && (
				<div
					className={`p-4 mb-4 text-sm text-center rounded-lg ${
						message.type === "success"
							? "text-green-800 bg-green-100"
							: "text-red-800 bg-red-100"
					}`}
				>
					{message.text}
				</div>
			)}
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Class Name:
					</label>
					<input
						type="text"
						name="classname"
						value={formData.classname}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Year:
					</label>
					<input
						type="number"
						name="year"
						value={formData.year}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Student Fee:
					</label>
					<input
						type="number"
						name="studentfee"
						value={formData.studentfee}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Max Students:
					</label>
					<input
						type="number"
						name="maxStudent"
						value={formData.maxStudent}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>

				<button
					type="submit"
					disabled={loading}
					className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					{loading ? "Creating..." : "Create Class"}
				</button>
			</form>
		</div>
	);
}

export default CreateClass;
