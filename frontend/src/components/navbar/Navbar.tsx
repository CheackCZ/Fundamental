import { 
    NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

import './Navbar.css';

import logoDark from '@/assets/img/logo/Logo-dark.png';

import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

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
                            <NavigationMenuLink href="/#subbar-section">Products</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink href="/#footer">Support</NavigationMenuLink>
                        </NavigationMenuItem>

                        <Button id='signin-button' onClick={() => navigate('/login?tab=signin')}>Sign In</Button>
                    
                    </NavigationMenuList>

                </NavigationMenu>
            </div>

        </div>

    );

}

export default Navbar;