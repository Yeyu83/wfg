export interface RowData {
  value: number;
  date: Date;
}

export interface Row {
  last: RowData;
  close: RowData;
  dayChangePercentage: number;
  dayChange: number;
  volume: number;
  turnover: number;
  previousYearClose: RowData;
  ytdPercentage: number;
}
