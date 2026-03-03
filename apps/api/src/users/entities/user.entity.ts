import { BaseEntity } from "../../lib/base-entity";
import { Column, Entity } from "typeorm";

@Entity('test')
export class Test extends BaseEntity {

    @Column({ unique: true })
    email: string;
}
