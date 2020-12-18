import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1607858429283 implements MigrationInterface {
    name = 'CreateTables1607858429283'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "reservation_frequency_enum" AS ENUM('0', '1', '2', '3', '4', '5', '6')`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" SERIAL NOT NULL, "startsAt" TIMESTAMP NOT NULL, "endsAt" TIMESTAMP NOT NULL, "frequency" "reservation_frequency_enum" NOT NULL, "until" TIMESTAMP NOT NULL, "count" integer NOT NULL, "interval" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "aircraftId" integer, "ownerId" integer, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_organization_role_name_enum" AS ENUM('owner', 'member')`);
        await queryRunner.query(`CREATE TABLE "user_organization_role" ("id" SERIAL NOT NULL, "name" "user_organization_role_name_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "organizationId" integer, CONSTRAINT "PK_af7e0d9e6a5a3001b829ced9500" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aircraft" ("id" SERIAL NOT NULL, "registration" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "organizationId" integer, CONSTRAINT "PK_46f8c680e9ff88a752b7834bba4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_de6789172a3722c8e6cd63f2288" FOREIGN KEY ("aircraftId") REFERENCES "aircraft"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_c991b37bd45d50032e212d0bebf" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_organization_role" ADD CONSTRAINT "FK_b7f91d67c393f0811a5849650ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_organization_role" ADD CONSTRAINT "FK_da27d13f9e8e0baf068a2331f97" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aircraft" ADD CONSTRAINT "FK_8a5eddf592945006f848f804c40" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "aircraft" DROP CONSTRAINT "FK_8a5eddf592945006f848f804c40"`);
        await queryRunner.query(`ALTER TABLE "user_organization_role" DROP CONSTRAINT "FK_da27d13f9e8e0baf068a2331f97"`);
        await queryRunner.query(`ALTER TABLE "user_organization_role" DROP CONSTRAINT "FK_b7f91d67c393f0811a5849650ea"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_c991b37bd45d50032e212d0bebf"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_de6789172a3722c8e6cd63f2288"`);
        await queryRunner.query(`DROP TABLE "aircraft"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP TABLE "user_organization_role"`);
        await queryRunner.query(`DROP TYPE "user_organization_role_name_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TYPE "reservation_frequency_enum"`);
    }

}
