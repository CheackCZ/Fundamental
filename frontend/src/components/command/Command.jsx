import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

import './Command.css';


function CommandComponent({ isVisible, onClose }) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") onClose();
        };

        if (isVisible) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const handleSelect = (path) => {
        navigate(path);
        onClose();
    };

    return (
        <div className="command-overlay">
            <Command className="command-palette">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onSelect={() => handleSelect("/stocks")}>Stocks</CommandItem>
                        <CommandItem onSelect={() => handleSelect("/news")}>News</CommandItem>
                        <CommandItem onSelect={() => handleSelect("/macrocalendar")}>Macrocalendar</CommandItem>
                        <CommandItem onSelect={() => handleSelect("/sentiment")}>Analysis</CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem onSelect={() => handleSelect("/profile")}>Profile</CommandItem>
                        <CommandItem onSelect={() => handleSelect("/settings")}>Settings</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    );
}

export default CommandComponent;