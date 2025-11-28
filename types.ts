export interface Property {
  id: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  price: string;
  guests: number;
}

export interface Amenity {
  id: string;
  label: string;
  iconName: 'Coffee' | 'Wifi' | 'Wind' | 'Music' | 'Book' | 'Sun';
}

export type MousePosition = {
  x: number;
  y: number;
};
