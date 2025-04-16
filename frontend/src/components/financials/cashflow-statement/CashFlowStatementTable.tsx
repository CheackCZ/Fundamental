import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface CashFlowTableProps {
    data: {
        dates: string[];
        values: Record<string, (number | null)[]>;
    };
}

export default function CashFlowTable({ data }: CashFlowTableProps) {
    const { dates, values } = data;

    const rows = Object.entries(values);

    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Metric</TableHead>
                        {dates.map((date) => (
                            <TableHead key={date} className="text-right">
                                {date}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map(([label, values]) => (
                        <TableRow key={label}>
                            <TableCell className="font-medium">
                                {formatLabel(label)}
                            </TableCell>
                            {values.map((value, i) => (
                                <TableCell key={i} className="text-right">
                                    {value === null
                                        ? "—"
                                        : value.toLocaleString()}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function formatLabel(label: string): string {
    return label
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
}
