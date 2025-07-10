import { AppDataSource } from "./data-source";
import { CreateTableUsers1751319761328 } from "./typeorm/migrations/1751319761328-create-table-users"

async function runMigrations() {
    // 1. Inicialize explicitamente a fonte de dados
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }

    const queryRunner = AppDataSource.createQueryRunner();
    
    try {
        // 2. Gerencie manualmente a conexão
        await queryRunner.connect();
        await queryRunner.startTransaction();

        // 3. Execute a migration
        const migration = new CreateTableUsers1751319761328();
        console.log("Executando migration...");
        await migration.up(queryRunner);
        
        // 4. Comite as alterações
        await queryRunner.commitTransaction();
        console.log("Migration executada com sucesso!");
    } catch (error) {
        // 5. Reverta em caso de erro
        await queryRunner.rollbackTransaction();
        console.error("Erro na migration:", error);
    } finally {
        // 6. Libere os recursos mesmo em caso de sucesso ou erro
        await queryRunner.release();
        await AppDataSource.destroy();
    }
}

runMigrations();