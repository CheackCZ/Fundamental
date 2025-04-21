import IncomeStatementTable from "./IncomeStatementTable";

interface IncomeStatementProps {
    data: Record<string, Record<string, number | null>>;
}

export default function IncomeStatement({ data }: IncomeStatementProps) {
    if (!data) return <p>No data available.</p>;

    const transformed = transformIncomeData(data);
    return <IncomeStatementTable data={transformed} />;
}

function transformIncomeData(
    raw: Record<string, Record<string, number | null>>
): {
    dates: string[];
    values: Record<string, (number | null)[]>;
} {
    const dates = Object.keys(Object.values(raw)[0] || {});
    const values: Record<string, (number | null)[]> = {};

    for (const [metric, metricData] of Object.entries(raw)) {
        values[metric] = dates.map((date) => metricData[date] ?? null);
    }

    return { dates, values };
}
