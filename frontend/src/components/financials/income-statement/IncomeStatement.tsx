import IncomeStatementTable from "./IncomeStatementTable";

const incomeStatementData = {
    dates: ["TTM", "2024-09-30", "2023-09-30", "2022-09-30", "2021-09-30"],
    values: {
        totalRevenue: [395760000, 391035000, 383285000, 394328000, 365817000],
        costOfRevenue: [211657000, 210352000, 214137000, 223546000, 212981000],
        grossProfit: [184103000, 180683000, 169148000, 170782000, 152836000],
        operatingExpense: [58428000, 57467000, 54847000, 51345000, 43887000],
        operatingIncome: [
            125675000, 123216000, 114301000, 119437000, 108949000,
        ],
        otherIncomeExpense: [71000, 269000, -565000, -334000, 60000],
        pretaxIncome: [125746000, 123485000, 113736000, 119103000, 109207000],
        taxProvision: [29596000, 29749000, 16741000, 19300000, 14527000],
        netIncome: [96150000, 93736000, 96995000, 99803000, 94680000],
        basicEPS: [6.33, 6.11, 6.16, 6.15, 5.67],
        dilutedEPS: [6.3, 6.08, 6.13, 6.11, 5.61],
        basicAverageShares: [
            15236773.25, 15343783, 15744231, 16215963, 16701272,
        ],
        dilutedAverageShares: [
            15301651, 15408095, 15812547, 16325819, 16864919,
        ],
        ebit: [125675000, 123216000, 114301000, 119437000, 111852000],
        ebitda: [137352000, 134661000, 125820000, 130541000, 123136000],
        reconciledDepreciation: [
            11677000, 11445000, 11519000, 11104000, 11284000,
        ],
        totalExpenses: [270085000, 267819000, 268984000, 274891000, 256868000],
        freeCashFlow: [98299000, 108807000, 99584000, 111443000, 92953000],
    },
};

export default function IncomeStatement() {
    return (
        <div>
            <IncomeStatementTable data={incomeStatementData} />
        </div>
    );
}
