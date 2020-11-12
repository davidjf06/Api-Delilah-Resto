const jwt = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { response } = require('express');
const sequelize = new Sequelize('mysql://root:@localhost:3306/proyecto_delilah_resto');
const app = express();

app.use(bodyParser.json());
const claveJwt = 'delilah123';



//Login

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    await sequelize.query('SELECT * FROM usuarios WHERE email = ? AND password = ?', {
        type: sequelize.QueryTypes.SELECT, replacements: [email, password],
    })
        .then(async (user) => {
            let usuario = user[0]
            if (usuario === undefined) {
                res.status(403).send('Email o password incorrectos');
            } else {
                const token = jwt.sign(usuario, claveJwt)
                res.status(200).json({ token: token })
            }
        })
})

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403).json('Token inválido');
    }
}



//USUARIOS

//Mostrar Usuarios

app.get('/api/usuarios', soloAdmin, (req, res) => {
    const query = 'SELECT * FROM usuarios';
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.status(200).json(response);
        }).catch((e) => res.status(400).json({ error: 'No se pueden visualizar usuarios' }));
});

//Mostrar un usuario (Para ver su propio usuario) 

app.get('/api/usuarios/:id', ensureToken, (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.json(response);
            console.log(response);
        }).catch((e) => res.status(400).json({ error: 'No se puede mostrar el usuario' }));
});

//Agregar usuario (El campo Administrador es por defecto 0. Para tener permisos de Administrador, el campo deberá ser 1)      

app.post('/api/usuarios', existeUsuario, (req, res) => {
    const query = 'INSERT INTO usuarios VALUES (NULL, ?, ?, ?, ?, ?, ?, 0)';
    const { nombre_usuario, nombre_apellido, email, telefono, direccion, password } = req.body;
    console.log(nombre_usuario, nombre_apellido, email, telefono, direccion, password);
    if (!nombre_usuario || !nombre_apellido || !email || !telefono || !direccion || !password) {
        res.status(401).json({ error: 'Faltan campos obligatorios' });
    } else {
        sequelize.query(query, { replacements: [nombre_usuario, nombre_apellido, email, telefono, direccion, password] })
            .then((response) => {
                res.status(200).send('Usuario agregado correctamente');
            }).catch(e => console.error('No se pudo agregar usuario', e), res.status(400));
    }
});

//Eliminar usuario

app.delete('/api/usuarios/:id', soloAdmin, (req, res) => {
    const id = req.params.id;
    const myQuery = 'DELETE FROM usuarios WHERE id_usuario = ?';
    const query = 'SELECT * FROM usuarios WHERE id_usuario = ?';
    sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            if (response.length) {
                sequelize.query(myQuery, { replacements: [id] })
                    .then((data) => {
                        console.log(data);
                        res.status(200).send('Usuario eliminado correctamente');
                    }).catch((e) => res.status(400).json({ error: 'No se pudo eliminar usuario' }));
            } else {
                res.status(404).send('Usuario inexistente');
            }
        }).catch((e) => res.status(400).json({ error: 'Algo salió mal' }));
});

//Actualizar Usuario (para cambiar usuario administrador u otros campos)

app.put('/api/usuarios/:id', soloAdmin, (req, res) => {
    const query = 'UPDATE usuarios SET nombre_usuario =?, nombre_apellido =?, email = ?, telefono =?, direccion = ?, password =?, es_admin = ? WHERE id_usuario=?';
    const id = req.params.id;
    const nombre = req.body.nombre_usuario;
    const apellido = req.body.nombre_apellido;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const password = req.body.password;
    const es_admin = req.body.es_admin;
    sequelize.query(query, { replacements: [nombre, apellido, email, telefono, direccion, password, es_admin, id] })
        .then((response) => {
            (response)
            res.status(200).send('Usuario actualizado correctamente');
        }).catch(e => console.error('No se modificó el usuario', e), res.status(400));
});




//PRODUCTOS

//Mostrar todos los productos

app.get('/api/productos', ensureToken, (req, res) => {
    const query = 'SELECT * FROM productos';
    jwt.verify(req.token, claveJwt, (error, data) => {
        if (error) {
            res.sendStatus(403).json('Debe iniciar sesión');
        } else {
            sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                .then((response) => {
                    res.status(200).json(response);
                }).catch((e) => res.status(400).json({ error: 'No se pueden visualizar productos' }));
        }
    })
});

//Mostrar producto por id

app.get('/api/productos/:id', ensureToken, (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM productos WHERE id_producto = ?';
    jwt.verify(req.token, claveJwt, (error, data) => {
        if (error) {
            res.sendStatus(403).json('Debes iniciar sesión');
        } else {
            sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
                .then((response) => {
                    if (response.length) {
                        res.json(response);
                        console.log(response);
                    } else {
                        res.status(404).send('No existe el producto')
                    }
                }).catch((e) => res.status(400).json({ error: 'No se puede mostrar el producto' }));
        }
    })
});

//Agregar productos

app.post('/api/productos', soloAdmin, (req, res) => {
    const query = 'INSERT INTO productos VALUES (NULL,?, ?, ?)';
    const { nombre, imagen, precio } = req.body;
    sequelize.query(query, { replacements: [nombre, imagen, precio] })
        .then((response) => {
            res.status(200).send('Producto agregado a la base de datos');
        }).catch(e => console.error('No se pudo agregar producto', e), res.status(400));
});

//Actualizar producto

app.put('/api/productos/:id', soloAdmin, (req, res) => {
    const query = 'UPDATE productos SET nombre = ?, imagen = ?, precio =? WHERE id_producto = ?';
    const id = req.params.id;
    const nombre = req.body.nombre;
    const imagen = req.body.imagen;
    const precio = req.body.precio;
    sequelize.query(query, { replacements: [nombre, imagen, precio, id] })
        .then((response) => {
            res.status(200).send('Producto actualizado');
        }).catch((e) => res.status(400).json({ error: 'No se pudo actualizar el producto' }));
});

//Eliminar producto

app.delete('/api/productos/:id', soloAdmin, (req, res) => {
    const id = req.params.id;
    const myQuery = 'DELETE FROM productos WHERE id_producto = ?';
    const query = 'SELECT * FROM productos WHERE id_producto = ?';
    sequelize.query(myQuery, { replacements: [id] })
        .then((data) => {
            res.status(200).send('Producto eliminado correctamente');
        }).catch((e) => res.status(400).json({ error: 'No se pudo eliminar producto' }));

});




//PEDIDOS

//Mostrar todos los datos de todos los pedidos

app.get('/api/pedidos', soloAdmin, (req, res) => {
    const query = 'SELECT estado, hora, pedidos.id_pedido As Número, nombre, cantidad, metodo_pago, total, nombre_usuario, direccion FROM usuarios JOIN pedidos join productos_x_pedidos JOIN productos ON pedidos.id_usuario = usuarios.id_usuario AND pedidos.id_pedido = productos_x_pedidos.id_pedido AND productos_x_pedidos.id_producto = productos.id_producto';
    sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        .then((response) => {
            res.status(200).json(response);
        }).catch(e => console.error('No se pueden visualizar los pedidos', e), res.status(400));
});

//Agregar pedidos (Por defecto el estado siempre es "Nuevo")

app.post('/api/pedidos', ensureToken, (req, res) => {
    const query = 'INSERT INTO pedidos VALUES (NULL, ?, "Nuevo", ?, ?, ?)';
    const { hora, estado, total, metodo_pago, id_usuario } = req.body;
    jwt.verify(req.token, claveJwt, (error, data) => {
        if (error) {
            res.sendStatus(403).json('Debes iniciar sesión');
        } else {
            if (!hora || !estado || !total || !metodo_pago || !id_usuario) {
                res.status(400).send('Faltan campos obligatorios');
            } else {
                sequelize.query(query, { replacements: [hora, total, metodo_pago, id_usuario] })
                    .then((response) => {
                        res.status(200).send('Pedido agregado correctamente');
                    }).catch(e => console.error('No se pudo agregar pedido', e), res.status(404));
            }
        }
    })
});

//Mostrar pedido por id

app.get('/api/pedidos/:id', ensureToken, (req, res) => {
    const id = req.params.id;
    const query = 'SELECT estado, hora, pedidos.id_pedido As Número, nombre, cantidad, metodo_pago, total, nombre_usuario, direccion FROM usuarios JOIN pedidos join productos_x_pedidos JOIN productos ON pedidos.id_usuario = usuarios.id_usuario AND pedidos.id_pedido = productos_x_pedidos.id_pedido AND productos_x_pedidos.id_producto = productos.id_producto WHERE pedidos.id_pedido = ?';
    jwt.verify(req.token, claveJwt, (error, data) => {
        if (error) {
            res.sendStatus(403).json('Debes iniciar sesión');
        } else {
            sequelize.query(query, { replacements: [id], type: sequelize.QueryTypes.SELECT })
                .then((data) => {
                    res.status(200).json(data)
                }).catch(e => console.error('No se puede mostrar el pedido', e), res.status(400));
        }
    })
});

//Eliminar pedido

app.delete('/api/pedidos/:id', soloAdmin, (req, res) => {
    const id = req.params.id;
    const myQuery = 'DELETE FROM pedidos WHERE id_pedido =?';
    sequelize.query(myQuery, { replacements: [id] })
        .then((data) => {
            res.status(200).send('Pedido eliminado correctamente');
        }).catch(e => console.error('No se pudo eliminar el pedido', e), res.status(400));
});

//Actualizar pedidos (Ruta solo para el Administrador)

app.put('/api/pedidos/:id', soloAdmin, (req, res) => {
    const id = req.params.id;
    const hora = req.body.hora;
    const estado = req.body.estado;
    const total = req.body.total;
    const metodo_pago = req.body.metodo_pago;
    const id_usuario = req.body.id_usuario;
    const myQuery = `UPDATE pedidos SET hora = ?, estado = ?, total = ?, metodo_pago = ?, id_usuario = ?  WHERE id_pedido = ?`;
    sequelize.query(myQuery, { replacements: [hora, estado, total, metodo_pago, id_usuario, id] })
        .then((data) => {
            res.status(200).send('Pedido actualizado correctamente');
        }).catch(e => console.error('No se pudo actualizar producto', e), res.status(400));
});

//Agregar productos (para el ingreso de la cantidad de un producto)

app.post('/api/productos_x_pedidos', ensureToken, (req, res) => {
    const query = 'INSERT INTO productos_x_pedidos VALUES (NULL, ?, ?, ?)';
    const { id_producto, id_pedido, cantidad } = req.body;
    jwt.verify(req.token, claveJwt, (error, data) => {
        if (error) {
            res.sendStatus(403).json('Debe iniciar sesión');
        } else {
            sequelize.query(query, { replacements: [id_producto, id_pedido, cantidad] })
                .then((response) => {
                    res.status(200).send('Producto agregado correctamente al pedido');
                }).catch(e => console.error('No se pudo agregar el producto al pedido', e), res.status(400));
        }
    })
});




// Función para aprobar usos sólo del Administrador.

function soloAdmin(req, res, next) {
    const autorizacion = req.headers['authorization'];
    const token = autorizacion && autorizacion.split(' ')[1];
    if (token == null) return res.sendStatus(401).send('Token inexistente');
    jwt.verify(token, claveJwt, (err, usuario) => {
        if (err) {
            return res.sendStatus(403).send('Error de autenticación');
        }
        const user = usuario;
        console.log(usuario);
        sequelize.query('SELECT * FROM usuarios WHERE id_usuario = ? ', {
            replacements: [user.id_usuario], type: sequelize.QueryTypes.SELECT
        }).then((usuarios) => {
            if (usuarios[0].es_admin === 1) {
                next();
            } else {
                res.status(403).send('No tienes permisos de Administrador');
            }
        })
    })
}

// Función para determinar el usuario a crear ya existe.

function existeUsuario(req, res, next) {
    const usuario = req.body.nombre_usuario;
    sequelize.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', {
        type: sequelize.QueryTypes.SELECT, replacements: [usuario]
    })
        .then((user) => {
            if (user.length) {
                res.status(403).send('Usuario ya existente. Elija otro.');
            }
            else {
                next();
            }
        });
}

app.listen(4000, function (request, response) { console.log('Servidor corriendo') });