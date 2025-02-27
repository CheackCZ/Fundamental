import { 
    NavigationMenu, 
    NavigationMenuItem, 
    NavigationMenuLink, 
    NavigationMenuList, 
} from "@/components/ui/navigation-menu";

import './Subbar.css';

function Subbar() {

    return (
        <div className='subbar-content'>
        
            {/* div with navigation links */}
            <div className="subbar-container">
                <NavigationMenu>

                    {/* List with the links */}
                    <NavigationMenuList>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Overview</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Products</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Showcase</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink>Contact</NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>

                </NavigationMenu>
            </div>
        
        </div>
    );

}

export default Subbar;