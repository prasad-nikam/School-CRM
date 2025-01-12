import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NodeInstance } from "../../APIs/axiosInstance";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import CreateClass from "./CreateClass";

function Dashboard() {
	const navigate = useNavigate();
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
		<div>
			{usertype == "student" && <StudentProfile />}
			{usertype == "teacher" && <TeacherProfile />}
			{usertype == "admin" && (
				<>
					<h1>admin dashboard</h1>
					<CreateClass />
				</>
			)}
		</div>
	);
}

export default Dashboard;
