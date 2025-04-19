import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const macroData = [
    {
        day: "Mon, Apr 15",
        state: "🇺🇸 US",
        event: "CPI YoY",
        forecast: "3.4%",
        actual: "3.2%",
        previous: "3.1%",
    },
    {
        day: "Mon, Apr 15",
        state: "🇩🇪 DE",
        event: "ZEW Sentiment",
        forecast: "85.0",
        actual: "83.7",
        previous: "87.0",
    },
    {
        day: "Mon, Apr 15",
        state: "🇨🇦 CA",
        event: "BoC Business Outlook",
        forecast: "0.8%",
        actual: "1.0%",
        previous: "0.7%",
    },
    {
        day: "Tue, Apr 16",
        state: "🇪🇺 EU",
        event: "GDP Growth",
        forecast: "0.2%",
        actual: "0.3%",
        previous: "0.1%",
    },
    {
        day: "Tue, Apr 16",
        state: "🇫🇷 FR",
        event: "Inflation Rate",
        forecast: "1.2%",
        actual: "1.3%",
        previous: "1.0%",
    },
    {
        day: "Tue, Apr 16",
        state: "🇯🇵 JP",
        event: "Industrial Production",
        forecast: "0.5%",
        actual: "0.6%",
        previous: "0.3%",
    },
    {
        day: "Wed, Apr 17",
        state: "🇬🇧 UK",
        event: "Unemployment",
        forecast: "4.0%",
        actual: "4.1%",
        previous: "4.0%",
    },
    {
        day: "Wed, Apr 17",
        state: "🇺🇸 US",
        event: "Retail Sales",
        forecast: "0.5%",
        actual: "0.3%",
        previous: "0.4%",
    },
    {
        day: "Wed, Apr 17",
        state: "🇨🇳 CN",
        event: "Fixed Asset Investment",
        forecast: "5.2%",
        actual: "5.0%",
        previous: "5.3%",
    },
    {
        day: "Thu, Apr 18",
        state: "🇦🇺 AU",
        event: "Employment Change",
        forecast: "30K",
        actual: "34K",
        previous: "26K",
    },
    {
        day: "Thu, Apr 18",
        state: "🇺🇸 US",
        event: "Jobless Claims",
        forecast: "215K",
        actual: "220K",
        previous: "212K",
    },
    {
        day: "Fri, Apr 19",
        state: "🇩🇪 DE",
        event: "PPI MoM",
        forecast: "0.4%",
        actual: "0.3%",
        previous: "0.5%",
    },
    {
        day: "Fri, Apr 19",
        state: "🇧🇷 BR",
        event: "Central Bank Decision",
        forecast: "10.75%",
        actual: "10.50%",
        previous: "11.00%",
    },
];

function MacrocalendarTable() {
    // Group events by day
    const groupedByDay: Record<string, typeof macroData> = {};

    for (const item of macroData) {
        if (!groupedByDay[item.day]) groupedByDay[item.day] = [];
        groupedByDay[item.day].push(item);
    }

    return (
        <Table>
            <TableCaption>Macroeconomic Events — Week Overview</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Day</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Forecast</TableHead>
                    <TableHead>Actual</TableHead>
                    <TableHead>Previous</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(groupedByDay).map(([day, events]) =>
                    events.map((event, idx) => (
                        <TableRow key={`${day}-${idx}`}>
                            {idx === 0 && (
                                <TableCell
                                    rowSpan={events.length}
                                    className="font-medium align-top"
                                >
                                    {day}
                                </TableCell>
                            )}
                            <TableCell>{event.state}</TableCell>
                            <TableCell>{event.event}</TableCell>
                            <TableCell>{event.forecast}</TableCell>
                            <TableCell>{event.actual}</TableCell>
                            <TableCell>{event.previous}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}

export default MacrocalendarTable;
