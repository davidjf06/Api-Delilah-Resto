CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_usuario VARCHAR(60) NOT NULL,
    nombre_apellido VARCHAR (100) NOT NULL,
    email VARCHAR (60) NOT NULL,
    telefono INT NOT NULL,
    direccion VARCHAR(200) NOT NULL,
    password VARCHAR(100) NOT NULL,
    es_admin INT NOT NULL
    );

CREATE TABLE productos (
    id_producto INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(60) NOT NULL,
    imagen VARCHAR (500) NOT NULL,
    precio FLOAT NOT NULL
    );

CREATE TABLE pedidos (
    id_pedido INT PRIMARY KEY AUTO_INCREMENT,
    hora DATETIME NOT NULL,
    estado VARCHAR (60) NOT NULL,
    total INT NOT NULL,
    metodo_pago VARCHAR (60) NOT NULL,
    id_usuario INT NOT NULL
    );

CREATE TABLE productos_x_pedidos (
    id_pro_pe INT PRIMARY KEY AUTO_INCREMENT,
    id_producto INT NOT NULL,
    id_pedido INT NOT NULL,
    cantidad INT NOT NULL
    );

INSERT INTO usuarios VALUES (NULL, 'davidjf_06', 'David Farias', 'davidfarias@gmail.com', 123456789, 'Calle 123', 'David123',0);
INSERT INTO usuarios VALUES (NULL, 'mc_ferreyra', 'Cecilia Ferreyra', 'ceciliaferreyra@gmail.com', 987654321, 'Calle 456', 'Ceci123',0);
INSERT INTO usuarios VALUES (NULL, 'Rocio_ff', 'Rocio Ferreyra', 'rociof@gmail.com', 123123123, 'Calle 789', 'Rocio123',0);
INSERT INTO usuarios VALUES (NULL, 'Male_ff', 'Malena Farias', 'malef@mail.com', 456456456, 'Calle 321', 'Male123',0);
INSERT INTO usuarios VALUES (NULL, 'Hugo_F', 'Hugo Farias', 'hugof@gmail.com', 789789789, 'Calle 001', 'Hugo123',0);
INSERT INTO usuarios VALUES (NULL, 'Susana_G', 'Susana Gallardo', 'susanagallardo@gmail.com', 111111111, 'Calle 002', 'Susi123',0);
INSERT INTO usuarios VALUES (NULL, 'Eliana_F', 'Eliana Farias', 'elianaf@gmail.com', 222222222, 'Calle 003', 'Eli123',0);
INSERT INTO usuarios VALUES (NULL, 'Natalia_F', 'Natalia Farias', 'nataliaf@gmail.com', 333333333, 'Calle 004', 'Nati123',0);
INSERT INTO usuarios VALUES (NULL, 'Agustina_L', 'Agustina Londero', 'agustinal@gmail.com', 444444444, 'Calle 005', 'Agus123',0);
INSERT INTO usuarios VALUES (NULL, 'Benja_L', 'Benjamin Londero', 'benjal@gmail.com', 555555555, 'Calle 006', 'Benja123',0);
INSERT INTO usuarios VALUES (NULL, 'Martin_A', 'Martin Acosta', 'martin_a@gmail.com', 666666666, 'Calle 007', 'Martin123',0);
INSERT INTO usuarios VALUES (NULL, 'Cristian_J', 'Cristian Jimenes', 'cristianj@gmailcom', 777777777, 'Calle 008', 'Cris123',0);
INSERT INTO usuarios VALUES (NULL, 'Adrian_M', 'Adrian Martinez', 'adrianm@gmail.com', 888888888, 'Calle 009', 'Adri123',0);
INSERT INTO usuarios VALUES (NULL, 'Jorge_S', 'Jorge Sosa', 'jorges@gmail.com', 999999999, 'Calle 010', 'Jorge123',0);
INSERT INTO usuarios VALUES (NULL, 'Gaspar_S', 'Gaspar Sosa', 'gaspars@gmail.com', 999888777, 'Calle 011', 'Gaspar123',0);;
INSERT INTO usuarios VALUES (NULL, 'Gonza_S', 'Gonzalo Sposetti', 'gonzas@gmail.com', 111112222, 'Calle 012', 'Gonza123',0);
INSERT INTO usuarios VALUES (NULL, 'Delilah_Admin', 'Delilah Resto', 'delilahresto@gmail.com', 111111110, 'Calle 111', 'Delilah123',1);

INSERT INTO productos VALUES (NULL, 'Bagel de salmon', 'http://DR/images/bagelsalmon',425);
INSERT INTO productos VALUES (NULL, 'Hamburguesa clásica', 'http://DR/images/hamb_clas',350);
INSERT INTO productos VALUES (NULL, 'Hamburguesa Especial', 'http://DR/images/hamb_clas_esp',380);
INSERT INTO productos VALUES (NULL, 'Sandwich veggie', 'http://DR/images/sand_ve', 310);
INSERT INTO productos VALUES (NULL, 'Ensalada veggie', 'http://DR/images/ens_ve', 340);
INSERT INTO productos VALUES (NULL, 'Focaccia', 'http://DR/images/focca', 300);
INSERT INTO productos VALUES (NULL, 'Sandwich Focaccia', 'http://DR/images/sand-focca', 440);
INSERT INTO productos VALUES (NULL, 'Sandwich Queso', 'http://DR/images/sand-queso', 268);
INSERT INTO productos VALUES (NULL, 'Cerveza Lata', 'http://DR/images/cerv-lata', 110);
INSERT INTO productos VALUES (NULL, 'Gaseosa Lata ', 'http://DR/images/gaseo-lata', 100);
INSERT INTO productos VALUES (NULL, 'Agua', 'http://DR/images/agua', 90);
INSERT INTO productos VALUES (NULL, 'Pizza Especial', 'http://DR/images/pizza-esp', 450);
INSERT INTO productos VALUES (NULL, 'Pizza Muzzarella', 'http://DR/images/pizza-m', 420);

INSERT INTO pedidos VALUES (NULL, '2020-11-01 10:46:36', 'Preparando', 670, 'Efectivo', 1);
INSERT INTO pedidos VALUES (NULL, '2020-11-01 19:22:44', 'Confirmado', 525, 'Tarjeta', 5);
INSERT INTO pedidos VALUES (NULL, '2020-11-03 12:36:20', 'Preparando', 1860, 'Tarjeta', 10);
INSERT INTO pedidos VALUES (NULL, '2020-11-03 18:10:58', 'Enviando', 900, 'Efectivo', 8);
INSERT INTO pedidos VALUES (NULL, '2020-11-05 20:34:40', 'Cancelado', 90, 'Efectivo', 13);
INSERT INTO pedidos VALUES (NULL, '2020-11-05 21:11:11', 'Entregado', 660, 'Efectivo', 5);
INSERT INTO pedidos VALUES (NULL, '2020-11-05 21:23:01', 'Preparado', 368, 'Efectivo', 6);

INSERT INTO productos_x_pedidos VALUES (NULL, 12, 1, 1);
INSERT INTO productos_x_pedidos VALUES (NULL, 9, 1, 2);
INSERT INTO productos_x_pedidos VALUES (NULL, 1, 2, 1);
INSERT INTO productos_x_pedidos VALUES (NULL, 10, 2, 1);
INSERT INTO productos_x_pedidos VALUES (NULL, 4, 3, 6);
INSERT INTO productos_x_pedidos VALUES (NULL, 2, 4, 2);
INSERT INTO productos_x_pedidos VALUES (NULL, 10, 4, 2);
INSERT INTO productos_x_pedidos VALUES (NULL, 11, 5, 1);
INSERT INTO productos_x_pedidos VALUES (NULL, 5, 6, 2);
INSERT INTO productos_x_pedidos VALUES (NULL, 9, 6, 2);
INSERT INTO productos_x_pedidos VALUES (NULL, 10, 6, 1);
INSERT INTO productos_x_pedidos VALUES (NULL, 8, 7, 1);
INSERT INTO productos_x_pedidos VALUES (NULL, 10, 7, 1);

ALTER TABLE pedidos ADD FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario);
ALTER TABLE productos_x_pedidos ADD FOREIGN KEY (id_producto) REFERENCES productos(id_producto);
ALTER TABLE productos_x_pedidos ADD FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido);

ALTER TABLE productos_x_pedidos DROP FOREIGN KEY productos_x_pedidos_ibfk_1;
ALTER TABLE productos_x_pedidos ADD CONSTRAINT productos_x_pedidos_ibfk_1 FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE productos_x_pedidos DROP FOREIGN KEY productos_x_pedidos_ibfk_2;
ALTER TABLE productos_x_pedidos ADD CONSTRAINT productos_x_pedidos_ibfk_2 FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido) ON DELETE CASCADE ON UPDATE RESTRICT;