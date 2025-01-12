import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignupPage from "./Components/SignupPage";
import Home from "./Components/Home";
import ClassAnalytics from "./Components/ClassAnalytics";
import AnalyticsPage from "./Components/AnalyticsPage";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import AllClasses from "./Components/AllClasses";
import MyClasses from "./Components/MyClasses";
import EnrollInClass from "./Components/EnrollInClass";
import CreateClass from "./Components/CreateClass";

function App() {
	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<>
					<Home />
				</>
			),
		},
		{
			path: "/login",
			element: (
				<>
					<LoginPage />
				</>
			),
		},
		{
			path: "/signup",
			element: (
				<>
					<SignupPage />
				</>
			),
		},
		{
			path: "/dashboard",
			element: (
				<>
					<Navbar />
					<Dashboard />
				</>
			),
		},
		{
			path: "/class/:id",
			element: (
				<>
					<Navbar />
					<ClassAnalytics />
				</>
			),
		},
		{
			path: "/analytics",
			element: (
				<>
					<Navbar />
					<AnalyticsPage />
				</>
			),
		},
		{
			path: "/all-classes",
			element: (
				<>
					<Navbar />
					<AllClasses />
				</>
			),
		},
		{
			path: "myclasses",
			element: (
				<>
					<Navbar />
					<MyClasses />
				</>
			),
		},
		{
			path: "/enroll/:id",
			element: (
				<>
					<Navbar />
					<EnrollInClass />
				</>
			),
		},
		{
			path: "/createclass",
			element: (
				<>
					<Navbar />
					<CreateClass />
				</>
			),
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
