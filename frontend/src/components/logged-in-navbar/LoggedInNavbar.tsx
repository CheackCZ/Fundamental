import { 
    NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
} from "@/components/ui/navigation-menu";

import Dropdown from "@/components/dropdown/Dropdown";

import logoDark from '@/assets/img/logo/Logo-dark.png';
import SearchIcon from "@/assets/icons/search.svg";

interface LoggedInNavbarProps {
    toggleCommand: () => void;
}

function LoggedInNavbar({ toggleCommand }: LoggedInNavbarProps) {

    return (

        <div className="navbar-content">

            {/* div with application Logo */}
            <div className="logo-container">
                <img src={logoDark} alt="logo-dark" />
            </div>
            
            {/* div with navigation links */}
            <div className="navbar-container">
                <NavigationMenu>

                    {/* List with the links */}
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Dashboard</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Markets</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink>News</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <img src={SearchIcon} alt="search-icon" className="w-[20px] h-[20px] cursor-pointer" onClick={toggleCommand} />
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <Dropdown />
                        </NavigationMenuItem>
                    
                    </NavigationMenuList>

                </NavigationMenu>
            </div>

        </div>

    );

}

export default LoggedInNavbar;