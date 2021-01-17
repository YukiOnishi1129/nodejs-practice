import {MigrationInterface, QueryRunner} from "typeorm";

export class user1610881084847 implements MigrationInterface {
    name = 'user1610881084847'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
