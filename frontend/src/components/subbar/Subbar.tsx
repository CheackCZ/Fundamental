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
                            <NavigationMenuLink href="/#overview-section">Overview</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink href="/#products-section">Products</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink href="/#showcase-section">Showcase</NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink href="/#footer">Contact</NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>

                </NavigationMenu>
            </div>
        
        </div>
    );

}

export default Subbar;