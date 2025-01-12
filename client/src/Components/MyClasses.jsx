import React, { useState, useEffect } from "react";
import { NodeInstance } from "../../APIs/axiosInstance";
import { useNavigate } from "react-router-dom";
import ClassCard from "./ClassCard";
import useFetchStudentInfo from "../Hooks/useFetchStudentInfo";

const MyClasses = () => {
	const { studentData, isLoading, error } = useFetchStudentInfo();
	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p className="text-red-600">Error: {error}</p>;
	}

	return (
		<div>
			<h1 className="text-2xl font-bold m-4">My classes</h1>
			<div className="grid lg:grid-cols-4 m-5 gap-5 sm:grid-cols-1 md: grid-cols-2">
				{studentData?.classname?.map((cls) => (
					<li className="list-none" key={cls.classname}>
						<ClassCard
							id={cls._id}
							classname={cls?.classname}
							year={cls?.year}
							teacher={cls?.teacher?.name}
							fees={cls?.studentfee}
							isEnrolled={true}
						/>
					</li>
				))}
			</div>
		</div>
	);
};

export default MyClasses;
