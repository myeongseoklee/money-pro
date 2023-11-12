import { Ulid } from './../../util/ulid';
import { EntityBase } from '../../base/entity.base';
import { Column, Entity, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User extends EntityBase {
  @Column({ name: 'email', type: 'varchar', nullable: false, length: 60 })
  email!: string;

  static create(email: string): User {
    const user = new User();
    user.id = Ulid.createUlid();
    user.email = email;

    return user;
  }

  static byEmail(email: string): User {
    const user = new User();
    user.email = email;
    return user;
  }
}
