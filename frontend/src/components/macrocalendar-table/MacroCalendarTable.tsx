import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const invoices = [
    {
        indicator: "GDP Growth Rate",
        country: "United States",
        value: "2.5%",
        year: 2024,
        source: "World Bank",
    },
    {
        indicator: "Unemployment Rate",
        country: "Germany",
        value: "4.2%",
        year: 2024,
        source: "Eurostat",
    },
    {
        indicator: "Inflation Rate",
        country: "Japan",
        value: "1.8%",
        year: 2024,
        source: "Bank of Japan",
    },
    {
        indicator: "Interest Rate",
        country: "United Kingdom",
        value: "4.5%",
        year: 2024,
        source: "Bank of England",
    },
    {
        indicator: "Trade Balance",
        country: "China",
        value: "$150B surplus",
        year: 2024,
        source: "National Bureau of Statistics of China",
    },
    {
        indicator: "Government Debt to GDP",
        country: "France",
        value: "98.5%",
        year: 2024,
        source: "IMF",
    },
    {
        indicator: "Consumer Confidence Index",
        country: "Canada",
        value: "105.3",
        year: 2024,
        source: "OECD",
    },
];

function MacrocalendarTable() {
    
    return (
    
        <Table>
            
            <TableCaption>Key Macroeconomic Indicators for 2024</TableCaption>
            
            <TableHeader>
            
                <TableRow>
                    <TableHead className="w-[200px]">Indicator</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right">Source</TableHead>
                </TableRow>
            
            </TableHeader>
            
            <TableBody>
            
                {invoices.map((indicator) => (
                <TableRow key={indicator.indicator}>
                    <TableCell className="font-medium">
                        {indicator.indicator}
                    </TableCell>
                    <TableCell>{indicator.country}</TableCell>
                    <TableCell>{indicator.value}</TableCell>
                    <TableCell className="text-right">
                        {indicator.source}
                    </TableCell>
                </TableRow>
                ))}
            
            </TableBody>

        </Table>
    
    );
}

export default MacrocalendarTable;
