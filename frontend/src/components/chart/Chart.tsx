"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface ChartProps {
    data: { date: string; price: number }[];
    title?: string;
    description?: string;
    onTimeRangeChange?: (range: string) => void;
}

const Chart: React.FC<ChartProps> = ({
    data,
    title = "Stock Price Chart",
    description = "Change in percentage (%):",
    onTimeRangeChange,
}) => {
    const [timeRange, setTimeRange] = React.useState("1m");

    React.useEffect(() => {
        onTimeRangeChange?.(timeRange);
    }, [timeRange, onTimeRangeChange]);

    const filteredData = React.useMemo(() => {
        const safeData = data ?? [];
        if (timeRange === "1d") return safeData;

        const referenceDate = new Date();
        const days =
            timeRange === "5d" ? 5 :
            timeRange === "1m" ? 30 :
            timeRange === "3m" ? 90 :
            timeRange === "1y" ? 365 :
            timeRange === "5y" ? 365 * 5 :
            90;

        const startDate = new Date(referenceDate);
        startDate.setDate(referenceDate.getDate() - days);

        return safeData.filter((entry) => new Date(entry.date) >= startDate);
    }, [data, timeRange]);

    const trendColor = React.useMemo(() => {
        if (!filteredData || filteredData.length < 2) return "gray";

        const first = filteredData[0].price;
        const last = filteredData[filteredData.length - 1].price;

        if (last > first) return "green";
        if (last < first) return "red";
        return "gray";
    }, [filteredData]);

    const gradientId = "fillPrice";

    return (
        <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>
                        {description}
                        {filteredData.length >= 2 && (
                            <span
                                style={{
                                    marginLeft: "0.5rem",
                                    color:
                                        trendColor === "green"
                                            ? "green"
                                            : trendColor === "red"
                                            ? "red"
                                            : "gray",
                                    fontWeight: 600,
                                }}
                            >
                                {(() => {
                                    const first = filteredData[0].price;
                                    const last = filteredData[filteredData.length - 1].price;
                                    const percent = ((last - first) / first) * 100;
                                    const rounded = percent.toFixed(2);
                                    return `${percent >= 0 ? "+" : ""}${rounded}%`;
                                })()}
                            </span>
                        )}
                    </CardDescription>
                </div>

                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Time range" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1d">1d</SelectItem>
                        <SelectItem value="5d">5d</SelectItem>
                        <SelectItem value="1m">1m</SelectItem>
                        <SelectItem value="3m">3m</SelectItem>
                        <SelectItem value="1y">1y</SelectItem>
                        <SelectItem value="5y">5y</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>

            <CardContent>
                <ChartContainer className="w-full h-[256px]" config={{ price: { label: "Stock Price:" } }}>
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={trendColor} stopOpacity={0.6} />
                                <stop offset="95%" stopColor={trendColor} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="date"
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return timeRange === "1d"
                                    ? `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
                                    : date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
                            }}
                            tickMargin={8}
                        />
                        <YAxis
                            domain={["auto", "auto"]}
                            tickFormatter={(value) => `$${value.toFixed(0)}`}
                            width={64}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={({ label, payload }) => {
                                const date = new Date(label);
                                const formattedLabel =
                                    timeRange === "1d"
                                        ? `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`
                                        : date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            ...(timeRange === "5y" && { year: "numeric" }),
                                        });

                                const price = payload?.[0]?.value;

                                return (
                                    <div className="rounded-md border bg-background px-3 py-2 shadow-sm">
                                        <p className="text-[0.75rem] text-muted-foreground">
                                            {formattedLabel}
                                        </p>
                                        <p className="text-sm font-medium text-foreground">
                                            Stock Price: ${Number(price).toFixed(2)}
                                        </p>
                                    </div>
                                );
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke={trendColor}
                            fill={`url(#${gradientId})`}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};

export default Chart;