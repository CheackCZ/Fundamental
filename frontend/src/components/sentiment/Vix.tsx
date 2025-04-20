"use client";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const defaultVixData = [
    { date: "2025-04-09", value: 14.2 },
    { date: "2025-04-10", value: 15.1 },
    { date: "2025-04-11", value: 14.8 },
    { date: "2025-04-12", value: 16.0 },
    { date: "2025-04-13", value: 15.6 },
    { date: "2025-04-14", value: 15.6 },
    { date: "2025-04-15", value: 16.6 },
];

export default function VixBox() {
    return (
        <Card className="w-full px-5">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-left mb-2">
                    Volatility Index (VIX)
                </CardTitle>
                <p>Chicago Board Options Exchange's CBOE Volatility Index, a popular measure of the stock market's expectation of volatility based on S&P 500 index options. It is calculated and disseminated on a real-time basis by the CBOE, and is often referred to as the fear index or fear gauge.</p>
            </CardHeader>
            <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={defaultVixData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="blue"
                            strokeWidth={2}
                            fill="white"
                            fillOpacity={0.3}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
