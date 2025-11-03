type Card = {
  id: string;
  name: string;
  setName: string;
  setCode: string;
  number: string;
  rarity: string;
  finish: string;
  language: string;
  year: number;
  condition: string;
  gradeCompany: string;
  grade: string | number;
  acquiredFrom: string;
  acquiredPrice: number;
  estimatedValue?: number;
  owned: boolean;
  quantity: number;
  tags: string[];
  images: { front: string; back?: string };
  notes?: string;
  forTrade?: boolean;
  forSale?: boolean;
};

export default Card;

