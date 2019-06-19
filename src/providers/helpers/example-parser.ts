import { Types } from 'mongoose';
import { ExampleDto } from '../../models/dtos/example';
import { IExampleDocument } from '../../models/interfaces/example';

export class ExampleParser {
  public static dtoToDocument(dto: ExampleDto): IExampleDocument {
    const document = {
      _id: dto.id ? dto.id : new Types.ObjectId(),
      name: dto.name,
      description: dto.description,
      createdAt: dto.createdAt ? dto.createdAt : new Date()
    };

    return document as IExampleDocument;
  }

  public static documentToDto(document: IExampleDocument): ExampleDto {
    const doc = new ExampleDto(document._id, document.name, document.description, document.createdAt);
    return doc;
  }

  public static documentsToDtos(documents: IExampleDocument[]): ExampleDto[] {
    const dtos: ExampleDto[] = [];
    documents.forEach((document) => dtos.push(this.documentToDto(document)));
    return dtos;
  }
}
