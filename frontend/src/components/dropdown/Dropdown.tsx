import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

import AccountIcon from "@/assets/icons/account.svg";

function Dropdown() {
    const navigate = useNavigate();

    return (

        <Popover>
        
            {/* Dropdown trigger */}
            <PopoverTrigger asChild>
                {/* Account Icon - Aligned Left */}
                <a><img src={AccountIcon} alt="account-icon" className="w-[30px] h-[30px] cursor-pointer"/></a>
            </PopoverTrigger>

            {/* Dropdown Menu */}
            <PopoverContent align="end" className="w-[180px] p-2 text-white bg-black shadow-md rounded-md">

                <div className="flex flex-col mt-4 gap-2">
                
                    {/* Profile Button */}
                    <Button variant="ghost" className="w-full flex items-center gap-2 justify-start p-2" onClick={() => navigate("/profile")}>
                        <User size={18} /> Profile
                    </Button>

                    {/* Settings Button */}
                    <Button variant="ghost" className="w-full flex items-center gap-2 justify-start p-2" onClick={() => navigate("/settings")}>
                        <Settings size={18} /> Settings
                    </Button>

                    {/* Logout Button */}
                    <Button variant="ghost" className="w-full flex items-center gap-2 justify-start p-2 text-red-500" 
                        onClick={() => navigate("/logout")}>
                        <LogOut size={18} /> Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    
    );

}

export default Dropdown;