import { Ulid } from './../../util/ulid';
import { EntityBase } from '../../base/entity.base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('user_passwords')
export class UserPassword extends EntityBase {
  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @OneToOne(() => User, (user) => user.id, {
    cascade: ['soft-remove', 'remove'],
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_password_user_id',
  })
  user: User;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 60 })
  password: string;

  static create(user: User, password: string): UserPassword {
    const userPassword = new UserPassword();
    userPassword.id = Ulid.createUlid();
    userPassword.user = user;
    userPassword.password = password;

    return userPassword;
  }

  static of(user: User, password: string): UserPassword {
    const userPassword = new UserPassword();
    userPassword.user = user;
    userPassword.password = password;
    return userPassword;
  }

  setHashedPassword(hashedPassword: string): void {
    this.password = hashedPassword;
  }
}
