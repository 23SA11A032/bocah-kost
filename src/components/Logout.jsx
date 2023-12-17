import { Button } from "flowbite-react";
import { BiLogOut } from "react-icons/bi";

export default function Logout() {
    function clearUser() {
        localStorage.removeItem("user");
        window.location.href = "/";
    }
    return (
        <Button onClick={clearUser}>
            Logout
        </Button>
    );
}
