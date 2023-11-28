export interface Product {
  action: string;
  title: string;
  isRecommended: boolean;
  prices: {
    [name: string]: {
      value: string;
      lookupKey: string;
    }
  };
  features: string[];
  role: string;
}
