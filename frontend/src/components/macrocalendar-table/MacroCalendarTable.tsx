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
        day: "Mon, Apr 21",
        state: "🇨🇳 CNY",
        event: "1-y Loan Prime Rate",
        forecast: "3.10%",
        actual: "3.10%",
        previous: "3.10%",
    },
    {
        day: "Mon, Apr 21",
        state: "🇨🇳 CNY",
        event: "5-y Loan Prime Rate",
        forecast: "3.60%",
        actual: "3.60%",
        previous: "3.60%",
    },
    {
        day: "Mon, Apr 21",
        state: "🇨🇭 CHF",
        event: "Bank Holiday",
        forecast: "—",
        actual: "—",
        previous: "—",
    },
    {
        day: "Mon, Apr 21",
        state: "🇺🇸 USD",
        event: "CB Leading Index m/m",
        forecast: "-0.7%",
        actual: "-0.5%",
        previous: "-0.2%",
    },
    {
        day: "Tue, Apr 22",
        state: "🇳🇿 NZD",
        event: "Trade Balance",
        forecast: "970M",
        actual: "80M",
        previous: "392M",
    },
    {
        day: "Tue, Apr 22",
        state: "🇯🇵 JPY",
        event: "BOJ Core CPI y/y",
        forecast: "2.2%",
        actual: "2.4%",
        previous: "2.2%",
    },
    {
        day: "Tue, Apr 22",
        state: "🇨🇦 CAD",
        event: "IPPI m/m",
        forecast: "0.3%",
        actual: "0.4%",
        previous: "—",
    },
    {
        day: "Wed, Apr 23",
        state: "🇦🇺 AUD",
        event: "Flash Manufacturing PMI",
        forecast: "—",
        actual: "52.1",
        previous: "—",
    },
    {
        day: "Wed, Apr 23",
        state: "🇯🇵 JPY",
        event: "Flash Manufacturing PMI",
        forecast: "48.7",
        actual: "48.4",
        previous: "—",
    },
    {
        day: "Wed, Apr 23",
        state: "🇪🇺 EUR",
        event: "German Flash Services PMI",
        forecast: "50.3",
        actual: "50.9",
        previous: "—",
    },
    {
        day: "Thu, Apr 24",
        state: "🇺🇸 USD",
        event: "Unemployment Claims",
        forecast: "222K",
        actual: "215K",
        previous: "—",
    },
    {
        day: "Thu, Apr 24",
        state: "🇺🇸 USD",
        event: "Durable Goods Orders m/m",
        forecast: "1.9%",
        actual: "0.9%",
        previous: "—",
    },
    {
        day: "Fri, Apr 25",
        state: "🇯🇵 JPY",
        event: "Tokyo Core CPI y/y",
        forecast: "3.2%",
        actual: "2.4%",
        previous: "—",
    },
    {
        day: "Fri, Apr 25",
        state: "🇺🇸 USD",
        event: "Revised UoM Consumer Sentiment",
        forecast: "50.8",
        actual: "50.8",
        previous: "—",
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
