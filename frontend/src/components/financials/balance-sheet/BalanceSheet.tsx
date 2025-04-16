import BalanceSheetTable from "./BalanceSheetTable";

const balanceSheetData = {
    dates: ["2024-09-30", "2023-09-30", "2022-09-30", "2021-09-30"],
    values: {
        totalAssets: [364980000, 352583000, 352755000, 351002000],
        totalLiabilities: [308030000, 290437000, 302083000, 287912000],
        totalEquity: [56950000, 62146000, 50672000, 63090000],
        totalCapitalization: [142700000, 157427000, 149631000, 172196000],
        commonStockEquity: [56950000, 62146000, 50672000, 63090000],
        capitalLeaseObligations: [null, 12842000, 12411000, 11803000],
        workingCapital: [-23405000, -1742000, -18577000, 9355000],
        investedCapital: [163579000, 173234000, 170741000, 187809000],
        tangibleBookValue: [56950000, 62146000, 50672000, 63090000],
        totalDebt: [106629000, 111088000, 132480000, 136522000],
        netDebt: [76686000, 81123000, 96423000, 89779000],
        sharesIssued: [15116786, 15550061, 15943425, 16426786],
    },
};

export default function BalanceSheet() {
    return (
        <div>
            <BalanceSheetTable data={balanceSheetData} />
        </div>
    );
}
