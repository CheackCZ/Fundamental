create database fundamental;

use fundamental;

-- Vytvoření admin uživatele pro správu databáze
create user 'admin'@'localhost' identified by 'admin_password';

-- Vyhrazení všech práv administrátorovi
grant all privileges on fundamental.user TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;


-- Vytvoření tabulky pro uživatele
create table `user` (
	id int primary key auto_increment,
    email varchar(255) unique not null,
    password_hash varchar(255) not null,
    created_at timestamp default current_timestamp
);