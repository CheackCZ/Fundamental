import CashFlowTable from "./CashFlowStatementTable";

interface CashFlowStatementProps {
    data: Record<string, Record<string, number | null>>;
}

export default function CashFlowStatement({ data }: CashFlowStatementProps) {
    if (!data) return <p>No data available.</p>;

    const transformed = transformCashFlowData(data);
    return <CashFlowTable data={transformed} />;
}

function transformCashFlowData(
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