"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type FearGreedData = {
    current_value: string;
    historical_values: string[];
};

const FearGreedBox = () => {
    const [data, setData] = useState<FearGreedData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/analysis/fear-greed");
                const json = await res.json();
    
                setData({
                    current_value: json.current_value,
                    historical_values: json.historical_values,
                });
            } catch (err) {
                console.error("Error fetching Fear & Greed data:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, []);
    

    const indexValue = data ? parseInt(data.current_value) : 0;

    const historicalValues = data
        ? data.historical_values.map((v) => parseInt(v))
        : [];

    const getTickPosition = (value: number) => {
        const angle = (value / 100) * 180 - 180;
        const r = 120;
        const cx = 250;
        const cy = 250;
        const radians = (angle * Math.PI) / 180;
        const x2 = cx + r * Math.cos(radians);
        const y2 = cy + r * Math.sin(radians);
        return { cx, cy, x2, y2 };
    };

    const { cx, cy, x2, y2 } = getTickPosition(indexValue);

    const labels = ["Previous close", "1 week ago", "1 month ago", "1 year ago"];

    const getSentiment = (value: number): string => {
        if (value >= 75) return "Extreme Greed";
        if (value >= 50) return "Greed";
        if (value >= 25) return "Fear";
        return "Extreme Fear";
    };

    const historyItems = historicalValues.map((value, index) => ({
        label: labels[index],
        value,
        sentiment: getSentiment(value),
    }));

    const getColorClass = (value: number) => {
        if (value >= 75) return "border-green-500 text-green-600";
        if (value <= 25) return "border-red-500 text-red-600";
        return "border-yellow-500 text-yellow-600";
    };

    const getSvgColor = (value: number) => {
        if (value >= 75) return "#16a34a";
        if (value <= 25) return "#dc2626";
        return "#ca8a04";
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col md:flex-row w-full items-start justify-between px-5">
                    {/* Left side */}
                    <div className="relative">
                        <CardTitle className="text-3xl font-bold text-left mb-4">
                            Fear and Greed Index
                        </CardTitle>

                        {loading ? (
                            <Skeleton className="w-[360px] h-[240px] rounded-md" />
                        ) : (
                            <>
                                <img
                                    src="/src/assets/img/fear-and-greed-index.png"
                                    alt="Fear and Greed Gauge"
                                    className="w-[360px] h-[240px]"
                                />
                                <svg
                                    className="absolute top-0 left-0 w-full h-full"
                                    viewBox="0 0 500 210"
                                >
                                    <polygon
                                        points={(() => {
                                            const baseLength = 20;
                                            const angle = Math.atan2(y2 - cy, x2 - cx);
                                            const dx = (Math.sin(angle) * baseLength) / 2;
                                            const dy = (-Math.cos(angle) * baseLength) / 2;
                                            const x1 = cx + dx;
                                            const y1 = cy + dy;
                                            const x3 = cx - dx;
                                            const y3 = cy - dy;
                                            return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
                                        })()}
                                        fill="black"
                                    />
                                    <circle cx={cx} cy={cy} r={10} fill="black" />
                                    <circle cx={cx} cy={cy} r={35} fill="white" />
                                    <text
                                        x={cx}
                                        y={cy + 10}
                                        textAnchor="middle"
                                        fontSize="36"
                                        fontWeight="bold"
                                        fill={getSvgColor(indexValue)}
                                    >
                                        {indexValue}
                                    </text>
                                </svg>
                            </>
                        )}
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col gap-4 w-full md:w-1/2 text-sm mt-2">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => (
                                  <Skeleton
                                      key={i}
                                      className="h-10 w-full rounded-sm"
                                  />
                              ))
                            : historyItems.map(
                                  ({ label, value, sentiment }, i) => (
                                      <div
                                          key={i}
                                          className="flex justify-between items-center border-b border-dotted pb-1"
                                      >
                                          <div>
                                              <div className="text-gray-500">
                                                  {label}
                                              </div>
                                              <div className="font-semibold">
                                                  {sentiment}
                                              </div>
                                          </div>
                                          <div
                                              className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-sm ${getColorClass(
                                                  value
                                              )}`}
                                          >
                                              {value}
                                          </div>
                                      </div>
                                  )
                              )}
                        {loading ? (
                            <Skeleton className="w-[220px] h-4 mt-2 rounded-sm" />
                        ) : (
                            <div className="text-xs text-gray-500 mt-2">
                                Last updated just now
                            </div>
                        )}
                    </div>
                </div>

                {/* Accordion */}
                <div className="fng-description mt-6 px-4 md:px-6">
                    {loading ? (
                        <div className="w-full space-y-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className={`h-${i % 2 === 0 ? "6" : "16"} w-${i % 2 === 0 ? "2/3" : "full"} rounded-sm`}
                                />
                            ))}
                        </div>
                    ) : (
                        <Accordion
                            type="multiple"
                            className="w-full space-y-2 text-white rounded-md shadow-sm p-4"
                        >
                            <AccordionItem value="what">
                                <AccordionTrigger>
                                    What is the CNN Business Fear & Greed Index?
                                </AccordionTrigger>
                                <AccordionContent className="text-black p-2">
                                    The Fear & Greed Index is a way to gauge stock market movements and whether stocks are fairly priced. The theory is based on the logic 
                                    that excessive fear tends to drive down share prices, and too much greed tends to have the opposite effect.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="calculation">
                                <AccordionTrigger>
                                    How is Fear & Greed Calculated?
                                </AccordionTrigger>
                                <AccordionContent className="text-black p-2">
                                    The Fear & Greed Index is a compilation of seven different indicators that measure some aspect of stock market behavior. 
                                    The index gives each indicator equal weighting in calculating a score from 0 to 100.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="frequency">
                                <AccordionTrigger>
                                    How often is the Fear & Greed Index calculated?
                                </AccordionTrigger>
                                <AccordionContent className="text-black p-2">
                                    Every component and the Index are calculated as soon as new data becomes available.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="usage">
                                <AccordionTrigger>
                                    How to use Fear & Greed Index?
                                </AccordionTrigger>
                                <AccordionContent className="text-black p-2">
                                    The Index can help assess market sentiment and avoid emotional investing decisions.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
};

export default FearGreedBox;