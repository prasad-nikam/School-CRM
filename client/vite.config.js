import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	server: {
		cors: {
			origin: "*", // Allow all origins. Use specific domains for stricter policies.
		},
	},
	plugins: [react()],
});
