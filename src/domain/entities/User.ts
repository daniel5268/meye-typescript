import { hash } from 'bcrypt';
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

const saltRounds: number = 8;

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({
    type: 'varchar', length: 32, nullable: false, unique: true,
  })
    username: string;

  @Column({
    type: 'varchar', length: 64, nullable: false,
  })
    password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
    createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
    updatedAt!: Date;

  public async hashPassword(): Promise<void> {
    this.password = await hash(this.password, saltRounds);
  }

  constructor(username: string, notHashedPassword: string) {
    this.username = username;
    this.password = notHashedPassword;
  }
}
