export class ExampleDto {
  public id?: string;
  public readonly name: string;
  public readonly description: string;
  public createdAt?: Date;

  constructor(id: string, name: string, description: string, createdAt: Date) {
    this.id = id;
    this.name = name ? name : undefined;
    this.description = description ? description : undefined;
    this.createdAt = createdAt ? createdAt : new Date();
  }
}
