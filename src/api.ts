
export type ChartDatum = { name: string; value: number };
export type ChartData = {
  [key: string]: ChartDatum[];
};

export async function fetchChartData(): Promise<ChartData> {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        chart1: [
          { name: 'Jan', value: 400 },
          { name: 'Feb', value: 300 },
          { name: 'Mar', value: 200 },
          { name: 'Apr', value: 278 },
          { name: 'May', value: 189 },
        ],
        chart2: [
          { name: 'Mon', value: 240 },
          { name: 'Tue', value: 139 },
          { name: 'Wed', value: 980 },
          { name: 'Thu', value: 390 },
          { name: 'Fri', value: 480 },
        ],
        chart3: [
          { name: 'A', value: 240 },
          { name: 'B', value: 139 },
          { name: 'C', value: 980 },
          { name: 'D', value: 390 },
          { name: 'E', value: 480 },
        ],
        chart4: [
          { name: 'Q1', value: 400 },
          { name: 'Q2', value: 300 },
          { name: 'Q3', value: 200 },
          { name: 'Q4', value: 278 },
        ],
      });
    }, 1000);
  });
}

export async function persistChartOrder(newOrder: string[]): Promise<{ status: string }> {
  return new Promise((resolve) => {
    console.log('Persisting new order:', newOrder);
    setTimeout(() => {
      resolve({ status: 'ok' });
    }, 500);
  });
}
