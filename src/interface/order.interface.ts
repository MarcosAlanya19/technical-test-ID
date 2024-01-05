export enum EStatus {
  PROCESO= 'En proceso',
  COMPLETADO= 'Completado',
  PENDIENTE= 'Pendiente'
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
