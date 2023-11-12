import { Ulid } from './../../util/ulid';
import { DateOfMonth, Month } from './../../common/types/date.type';
import { Gender } from './../../common/types/gender.type';
import { EntityBase } from '../../base/entity.base';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_profiles' })
export class UserProfile extends EntityBase {
  @OneToOne(() => User, (user) => user.id, {
    cascade: ['soft-remove', 'remove'],
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_profile_user_id',
  })
  user: User;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 20 })
  name: string;

  @Column({
    name: 'gender',
    type: 'enum',
    nullable: false,
    enum: Gender,
  })
  gender: Gender;

  @Column({ name: 'birth_year', type: 'int', unsigned: true, nullable: false })
  birthYear: number;

  @Column({ name: 'birth_month', type: 'enum', nullable: false, enum: Month })
  birthMonth: Month;

  @Column({
    name: 'birth_date',
    type: 'tinyint',
    unsigned: true,
    nullable: false,
  })
  birthDate: DateOfMonth;

  static create(
    user: User,
    name: string,
    gender: Gender,
    birthYear: number,
    birthMonth: Month,
    birthDate: DateOfMonth,
  ): UserProfile {
    const userProfile = new UserProfile();

    userProfile.id = Ulid.createUlid();
    userProfile.user = user;
    userProfile.name = name;
    userProfile.gender = gender;
    userProfile.birthYear = birthYear;
    userProfile.birthMonth = birthMonth;
    userProfile.birthDate = birthDate;

    return userProfile;
  }
}
