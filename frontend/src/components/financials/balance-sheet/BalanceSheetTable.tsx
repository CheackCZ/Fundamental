import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface BalanceSheetTableProps {
    data: {
        dates: string[];
        values: Record<string, (number | null)[]>;
    };
}

export default function BalanceSheetTable({ data }: BalanceSheetTableProps) {
    const { dates, values } = data;
    const metrics = Object.keys(values);

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        {metrics.map((metric) => (
                            <TableHead key={metric} className="text-right">
                                {formatLabel(metric)}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dates.map((date, idx) => (
                        <TableRow key={date}>
                            <TableCell className="font-medium">{date.split("T")[0]}</TableCell>
                            {metrics.map((metric) => {
                                const value = values[metric]?.[idx] ?? null;
                                return (
                                    <TableCell key={metric} className="text-right">
                                        {value === null ? "—" : value.toLocaleString()}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function formatLabel(label: string): string {
    if (/\d{4}-\d{2}-\d{2}T/.test(label)) {
        return label.split("T")[0];
    }
    return label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
}