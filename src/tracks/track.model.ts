import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Track extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  audio: string;

  @Column
  cover: string;

  @Column
  isActive: boolean;
}
