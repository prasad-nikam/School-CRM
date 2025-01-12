import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";

function Home() {
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchData() {
			try {
				const responce = await NodeInstance.get("/getLoginDetails", {
					withCredentials: true,
				});
				console.log(responce?.data?.usertype);

				if (responce?.data?.usertype == "student") {
					navigate("/dashboard");
				} else if (responce?.data?.usertype == "teacher") {
					navigate("/dashboard");
				} else if (responce?.data?.usertype == "admin") {
					navigate("/dashboard");
				} else {
					navigate("/login");
				}
			} catch (error) {
				console.log(error);
				navigate("/login");
			}
		}
		fetchData();
	}, []);

	const handleLogout = async () => {
		try {
			const responce = await NodeInstance.get("/logout", {
				withCredentials: true,
			});
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<h1>school CRM</h1>
			<br />
			<a className="text-blue-700" href="/login">
				login
			</a>{" "}
			<br />
			<br />
			<a className="text-blue-700" href="/signup">
				signup
			</a>
			<br />
			<br />
			<button
				className="p-2 bg-grey-500 text-white"
				onClick={handleLogout}
			>
				logout
			</button>
		</div>
	);
}

export default Home;
