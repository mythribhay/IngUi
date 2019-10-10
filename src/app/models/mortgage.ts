export interface IMortgage {
    userId: number,
    mortgageId: number,
    mortgageAmount: number,
    interestRate: number,
    mortgageRepaid: number,
    mortgageOutstanding: number,
    emiAmount: number,
    emiDate: string,
    startDate: string,
    endDate: string,
    tenure: number
}