import CashFlowTable from "./CashFlowStatementTable";

const cashflowData = {
    dates: ["TTM", "2024-09-30", "2023-09-30", "2022-09-30", "2021-09-30"],
    values: {
        operatingCashFlow: [
            108294000, 118254000, 110543000, 122151000, 104038000,
        ],
        investingCashFlow: [10800000, 2935000, 3705000, -22354000, -14545000],
        financingCashFlow: [
            -130769000, -121983000, -108488000, -110749000, -93353000,
        ],
        endCashPosition: [30299000, 29943000, 30737000, 24977000, 35929000],
        incomeTaxPaid: [37498000, 26102000, 18679000, 19573000, 25385000],
        interestPaid: [null, null, 3803000, 2865000, 2687000],
        capitalExpenditures: [
            -9995000, -9447000, -10959000, -10708000, -11085000,
        ],
        issuanceOfCapitalStock: [null, null, null, null, 1105000],
        issuanceOfDebt: [null, null, 5228000, 5465000, 20393000],
        repaymentOfDebt: [-14927000, -9958000, -11151000, -9543000, -8750000],
        repurchaseOfStock: [
            -98416000, -94949000, -77550000, -89402000, -85971000,
        ],
        freeCashFlow: [98299000, 108807000, 99584000, 111443000, 92953000],
    },
};

export default function CashFlowStatement() {
    return (
        <div>
            <CashFlowTable data={cashflowData} />
        </div>
    );
}
