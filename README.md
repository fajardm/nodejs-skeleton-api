# nodejs-api-skeleton
Nodejs API skeleton

# Sequelize
1. Create Models
node_modules/.bin/sequelize model:create --name user --attributes first_name:string,last_name:string,bio:text --models-path src/api/v1/users/services --underscored

2. Create Migrations
node_modules/.bin/sequelize migration:create --name user --underscored

3. Create Seeders
node_modules/.bin/sequelize seed:create --name users

4. Migrate
node_modules/.bin/sequelize db:migrate