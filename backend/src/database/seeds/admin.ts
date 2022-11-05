import { dataSource } from "../ormconfig";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

async function create() {
  const id = uuidV4();
  const password = await hash("admin",8);

  dataSource.initialize().then(async () => {
    console.log('Data source has been initialized');
    await dataSource.transaction( async (transactionEntityManager) => {
      await transactionEntityManager.query(
        `INSERT INTO USERS(id, name, email, password, driver_license, is_admin, created_at)
          values('${id}', 'admin', 'admin@rentx.com.br', '${password}', '123456', true, 'now()' )
        `,
      );
    });
    console.log("User admin created");
  }).catch((err) => {
    console.error('Error during Data souzer initialization', err);
  });
}

create();