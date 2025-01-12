import { useState, useEffect } from "react";

const useFetchUserType = () => {
	const [usertype, setUsertype] = useState("");
	useEffect(() => {
		async function fetchLoginData() {
			try {
				const responce = await NodeInstance.get("/getLoginDetails", {
					withCredentials: true,
				});
				setUsertype(responce?.data?.usertype);
			} catch (error) {
				console.log(error);
			}
		}
		fetchLoginData;
	}, []);

	return { usertype };
};

export default useFetchUserType;
