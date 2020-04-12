## Tabla de contenidos

- [Prerequisitos](#prerequisitos)
- [Inicio rapido](#inicio-rapido)

## Prerequisitos

- MariaDB 10.1+ (preferido) o MySQL 5.7+
- PHP 7.1.3+ 
- Node 12.16+
- NPM 6.13+
- Laravel 5.8+

## Inicio rapido
- Ejecutar `composer install`
- Ejecutar `npm install`
- Ejecutar `php -r "file_exists('.env') || copy('.env.example', '.env');"`
- Configurar el archivo .env con las credenciales de base de datos respectivas
- Ejecutar `php artisan key:generate`
- Ejecutar `php artisan storage:link`
- Ejecutar `php artisan migrate`
- Ejecutar `php artisan passport:keys --force`
- Ejecutar `npm run watch`
- Ejecutar `php artisan serve`

## Tabla de contenidos
 [Demo](http://pruebatecnicaapp.herokuapp.com)
 Credenciales login:
    Email: joyce@joyce.com
    Password: joyce
O puede registrarse para entrar con sus propias credenciales.
Cabe recalcar que cuando se entra el listado de usuarios, no se podra borrar el usuario con el que se loggeo para evitar
problemas de peticiones denegadas.

 [Repo](https://github.com/jebenite/pruebaTecnica)
