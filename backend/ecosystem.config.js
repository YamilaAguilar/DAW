module.exports = {
  apps: [
    {
      name: 'gestion-proyectos',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        DB_HOST: 'localhost',
        DB_PORT: 5432,
        DB_NAME: 'gestion_proyectos',
        DB_USER: 'postgres',
        DB_PASSWORD: 'maraluna26',
        JWT_SECRET: 'mi_secreto_dev',
      },
    },
  ],
};