import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";

const Navbar = () => {
	const navigate = useNavigate();
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
	const [usertype, setUsertype] = useState("");
	useEffect(() => {
		async function fetchData() {
			try {
				const responce = await NodeInstance.get("/getLoginDetails", {
					withCredentials: true,
				});
				console.log(responce?.data?.usertype);
				setUsertype(responce?.data?.usertype);
				if (
					!(
						responce?.data?.usertype == "student" ||
						responce?.data?.usertype == "teacher" ||
						responce?.data?.usertype == "admin"
					)
				) {
					navigate("/login");
				} else {
					navigate("/dashboard");
				}
			} catch (error) {
				console.log(error);
				navigate("/login");
			}
		}
		fetchData();
	}, []);

	return (
		<nav className="bg-blue-600 text-white">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				{/* Logo */}
				<h1 className="text-2xl font-bold">Class Manager</h1>

				{/* Navigation Links */}
				<ul className="flex space-x-6">
					<li>
						<NavLink
							to="/dashboard"
							className={({ isActive }) =>
								isActive
									? "text-yellow-300 font-semibold border-b-2 border-yellow-300 transition-all duration-300"
									: "hover:text-yellow-300"
							}
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink
							to="/all-classes"
							className={({ isActive }) =>
								isActive
									? "text-yellow-300 font-semibold border-b-2 border-yellow-300 transition-all duration-300"
									: "hover:text-yellow-300"
							}
						>
							All Classes
						</NavLink>
					</li>
					{usertype === "student" && (
						<li>
							<NavLink
								to="/myclasses"
								className={({ isActive }) =>
									isActive
										? "text-yellow-300 font-semibold border-b-2 border-yellow-300 transition-all duration-300"
										: "hover:text-yellow-300"
								}
							>
								My Classes
							</NavLink>
						</li>
					)}
					{usertype == "admin" && (
						<li>
							<NavLink
								to="/analytics"
								className={({ isActive }) =>
									isActive
										? "text-yellow-300 font-semibold border-b-2 border-yellow-300 transition-all duration-300"
										: "hover:text-yellow-300"
								}
							>
								Analytics
							</NavLink>
						</li>
					)}
					<li>
						<button onClick={handleLogout}>Logout</button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
