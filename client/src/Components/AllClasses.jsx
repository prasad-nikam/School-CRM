import React, { useState, useEffect } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";
import { useNavigate } from "react-router-dom";
import ClassCard from "./ClassCard";

const AllClasses = () => {
	const navigate = useNavigate();
	const [classes, setClasses] = useState([]);

	const getclasses = useEffect(() => {
		const fetchData = async () => {
			try {
				const classes = await NodeInstance.get("/getclasslist", {
					withCredentials: true,
				});
				setClasses(classes.data);
			} catch (error) {
				console.log(error?.response?.data);
			}
		};
		fetchData();
	}, []);

	return (
		<div>
			<div className="grid grid-cols-4 m-5 gap-5">
				{classes.map((cls) => (
					<li className="list-none" key={cls.classname}>
						<ClassCard
							id={cls._id}
							classname={cls?.classname}
							year={cls?.year}
							teacher={cls?.teacher?.name}
							fees={cls?.studentfee}
						/>
					</li>
				))}
			</div>
		</div>
	);
};

export default AllClasses;
