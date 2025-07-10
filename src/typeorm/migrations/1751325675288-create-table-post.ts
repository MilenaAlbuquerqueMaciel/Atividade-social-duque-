import { Column, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTablePost1751325675288 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(new Table({
            name: 'posts',
            columns:[

                {name: 'id', type: 'varchar', isPrimary: true},
                {name: 'content ', type: 'text', isNullable: false },
                {name: 'authorId', type: 'varchar'},
                {name: 'created_at', type: 'datetime', default: "'CURRENT_TIMESTAMP'"}

            ],

            foreignKeys: [
             {
                columnNames:['authorId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
             },
            ]
        }))
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('posts')
        
    }

}
