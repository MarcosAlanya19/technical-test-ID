export enum EStatus {
  PENDIENTE= 'Pendiente',
  PROCESO= 'En proceso',
  COMPLETADO= 'Completado',
}

export interface IPlate {
  quantity: number;
  name: string;
  ingredients: string[]
}

export interface IOrder {
  plate: IPlate[],
  status: EStatus;
  table: number;
  waiter: string;
  comment: string;
}

export interface IOrderWithId extends IOrder {
  id: string;
}
