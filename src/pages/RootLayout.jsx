import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";

export function RootLayout() {
    return (
        <div className="page flex-column">
            <Navbar />
            <Outlet />
        </div>
    );
}