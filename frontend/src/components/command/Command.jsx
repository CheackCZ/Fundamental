import { useEffect } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"

function CommandComponent({ isVisible, onClose }) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (

        <Command className="rounded-lg border shadow-md md:max-w-[450px] mt-[130px]">
            
            <CommandInput placeholder="Type a command or search..." />
            
            <CommandList>
                
                <CommandEmpty>No results found.</CommandEmpty>
                
                <CommandGroup heading="Suggestions">
                    <CommandItem>News</CommandItem>
                    <CommandItem>Markets</CommandItem>
                    <CommandItem>Macroeconomics calendar</CommandItem>
                </CommandGroup>
                
                <CommandSeparator />
                
                <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Settings</CommandItem>
                </CommandGroup>
            
            </CommandList>
        
        </Command>

    );

}

export default CommandComponent;