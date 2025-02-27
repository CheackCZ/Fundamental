import { 
    NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import './Navbar.css';

import logoDark from '@/assets/img/Logo-dark.png';

function Navbar() {

    return (
        
        <div className="navbar-content">
            
            {/* div with application Logo */}
            <div className="logo-container">
                <img src={logoDark} alt="logo-white" />
            </div>
            
            {/* div with navigation links */}
            <div className="navbar-container">
                <NavigationMenu>

                    {/* List with the links */}
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Products</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Support</NavigationMenuLink>
                        </NavigationMenuItem>

                        <Button>Sign In</Button>
                    
                    </NavigationMenuList>

                </NavigationMenu>
            </div>

        </div>

    );

}

export default Navbar;