"use client";
import { useEffect, useState, useCallback } from "react";
import Chart from "@/components/chart/Chart";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface VixDataPoint {
    date: string;
    price: number;
}

export default function VixBox() {
    const [vixData, setVixData] = useState<VixDataPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState("5d");

    const fetchVixData = useCallback(async (range: string) => {
        try {
            setLoading(true);
            const res = await fetch(
                `http://localhost:8000/api/stock/^VIX/history/${range}`
            );
            if (!res.ok) throw new Error("Failed to fetch VIX data");
            const data = await res.json();

            const cleanedData: VixDataPoint[] = data.chart_data.map(
                (item: any) => ({
                    date: item.date, // raw date, formatted in Chart
                    price: item.price,
                })
            );

            setVixData(cleanedData);
        } catch (error) {
            console.error("Error fetching VIX data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchVixData(timeRange);
    }, [fetchVixData, timeRange]);

    const handleTimeRangeChange = (range: string) => {
        setTimeRange(range);
    };

    return (
        <div className="w-full">
           
            <Chart
                data={vixData}
                title="VIX Chart"
                description={`Selected Range:`}
                onTimeRangeChange={handleTimeRangeChange}
            />

            {loading && (
                <p className="text-sm mt-2 px-4 pb-4">Loading VIX data...</p>
            )}

        </div>
    );
}
