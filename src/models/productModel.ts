export class ProductModel{
  constructor(
    public id: number,
    public category: string,
    public description: string,
    public image: string,
    public price: number,
    public title: string,
    public raiting: {rate: number, count: number}
  ){}
}