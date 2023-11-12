import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 'expenditure_category' })
export class ExpenditureCategory {
  @PrimaryColumn({ name: 'code', type: 'varchar', length: 6 })
  code: string;

  @Column({ name: 'name', type: 'varchar', length: 10, nullable: false })
  name: string;

  @ManyToOne(
    () => ExpenditureCategory,
    (expenditureCategory) => expenditureCategory.code,
    {
      cascade: ['soft-remove', 'remove'],
      onDelete: 'CASCADE',
      nullable: true,
    },
  )
  @JoinColumn({
    name: 'parent_code',
    referencedColumnName: 'code',
    foreignKeyConstraintName: 'fk_expenditure_category_code',
  })
  parentExpenditureCategory: ExpenditureCategory;

  @Column({ name: 'sort_order', type: 'tinyint', nullable: false })
  sortOrder: number;
}
