// types.ts
export interface Deal {
  id: string;
  client: string;
  dealValue: string;
  dealStatus: string;
  closingDate: string;
  salesperson: string;
}

export interface CRMStats {
  totalRevenue: string;
  activeUsers: string;
  totalDeals: string;
  conversionRatio: string;
  revenueData: {
    month: string;
    thisYear: number;
    lastYear: number;
  }[];
  profitReport: {
    profit: string;
    revenue: string;
    expenses: string;
  };
}
