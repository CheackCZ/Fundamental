import { useState, useEffect } from "react";

import LoggedInNavbar from "@/components/logged-in-navbar/LoggedInNavbar";
// @ts-ignore
import Command from "@/components/command/Command"; 
import Footer from "@/components/footer/Footer";
import MacrocalendarTable from "@/components/macrocalendar-table/MacroCalendarTable";

import { Calendar } from "@/components/ui/calendar";
import { isWithinInterval, startOfWeek, endOfWeek, format } from "date-fns";

import "./Macrocalendar.css";

function Macrocalendar() {
    const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        new Date()
    );

    const toggleCommand = () => {
        setIsCommandOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "j") {
                event.preventDefault();
                toggleCommand();
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    const weekStart = selectedDate
        ? startOfWeek(selectedDate, { weekStartsOn: 1 })
        : undefined;

    const weekEnd = selectedDate
        ? endOfWeek(selectedDate, { weekStartsOn: 1 })
        : undefined;

    return (
        <div className="macrocalendar-content">
            {/* Header */}
            <header>
                <LoggedInNavbar toggleCommand={toggleCommand} />
            </header>

            {/* Main */}
            <main className="macrocalendar-main">
                
                {/* Command Component (Search) - Opened from Navbar */}
                {isCommandOpen && <Command isVisible={isCommandOpen} onClose={() => setIsCommandOpen(false)} />}
                
                <section className="calendar-section">
                    <h2 className="section-title">Select Week</h2>

                    <Calendar
                        mode="single"
                        onSelect={setSelectedDate}
                        className="calendar rounded-md border shadow bg-black text-white"
                        weekStartsOn={1}
                        showOutsideDays={false}
                        modifiers={{
                            selectedWeek: (date: Date) =>
                                selectedDate
                                    ? isWithinInterval(date, {
                                          start: startOfWeek(selectedDate, {
                                              weekStartsOn: 1,
                                          }),
                                          end: endOfWeek(selectedDate, {
                                              weekStartsOn: 1,
                                          }),
                                      })
                                    : false,
                        }}
                        modifiersClassNames={{
                            selectedWeek: "bg-white text-black",
                            today: "border-yellow-400 text-yellow-300 bg-gray-800"
                        }}
                    />

                    {weekStart && weekEnd && (
                        <p className="mt-2 text-xs text-gray-800">
                            Showing events from{" "}
                            <strong>{format(weekStart, "MMM d")}</strong> to{" "}
                            <strong>{format(weekEnd, "MMM d, yyyy")}</strong>
                        </p>
                    )}
                </section>

                <section className="macro-table-section">
                    <h2 className="section-title">Macroeconomic Calendar</h2>
                    <MacrocalendarTable />
                </section>
            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Macrocalendar;