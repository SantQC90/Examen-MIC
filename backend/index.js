//IMPORTAR MODULOS
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//CONFIGURACION DEL SERVIDOR Y EL PUERTO
const app = express();
const PORT = 3000;

//CONFIGURACION CORS PARA PERMITIR SOLICITUDES DE UN SERVIDOR DIFERENTE
const corsOptions = {
    origin: 'http://localhost:3002',
};

app.use(cors(corsOptions));

//CONFIGURACION DE CONEXION A LA BASE DE DATOS
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inmobiliaria'
});

//PRUEBA DE CONEXION A LA BASE DE DATOS
connection.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos: ', error);
    } else {
        console.log('Conexión a la base de datos MySQL establecida');
    }
});

// MIDDLEWARE PARA MANEJAR DATOS JSON
app.use(express.json());

//CRUD
// Obtener todos los inmuebles
app.get('/inmueble', (req, res) => {
    connection.query('SELECT * FROM inmueble', (error, results) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos: ', error);
            res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
        } else {
            res.json(results);
        }
    });
});

// Obtener un inmueble por su ID
app.get('/inmueble/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM inmueble WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error al obtener datos de la base de datos: ', error);
            res.status(500).json({ error: 'Error al obtener datos de la base de datos' });
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).json({ message: 'inmueble no encontrado' });
            }
        }
    });
});

// Crear un nuevo inmueble
app.post('/inmueble', (req, res) => {
    const { id, direccion, num_habitaciones, tipo, costo } = req.body;
    connection.query('INSERT INTO inmueble (id, direccion, num_habitaciones, tipo, costo) VALUES (?, ?, ?, ?, ?)', [id, direccion, num_habitaciones, tipo, costo], (error, results) => {
        if (error) {
            console.error('Error al insertar inmueble en la base de datos: ', error);
            res.status(500).json({ error: 'Error al insertar inmueble en la base de datos' });
        } else {
            res.status(201).json({ message: 'inmueble creado exitosamente', id: results.insertId });
        }
    });
});

// Actualizar un inmueble
app.put('/inmueble/:id', (req, res) => {
    const { id } = req.params;
    const { direccion, num_habitaciones, tipo, costo } = req.body;
    connection.query('UPDATE inmueble SET direccion = ?, num_habitaciones = ?, tipo = ?, costo = ? WHERE id = ?', [direccion, num_habitaciones, tipo, costo, parseInt(id)], (error, results) => {
        if (error) {
            console.error('Error al actualizar inmueble en la base de datos: ', error);
            res.status(500).json({ error: 'Error al actualizar inmueble en la base de datos' });
        } else {
            if (results.affectedRows > 0) {
                res.json({ message: 'inmueble actualizado exitosamente' });
            } else {
                res.status(404).json({ message: 'inmueble no encontrado' });
            }
        }
    });
});

// Eliminar un inmueble
app.delete('/inmueble/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM inmueble WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar inmueble de la base de datos: ', error);
            res.status(500).json({ error: 'Error al eliminar inmueble de la base de datos' });
        } else {
            if (results.affectedRows > 0) {
                res.json({ message: 'inmueble eliminado exitosamente' });
            } else {
                res.status(404).json({ message: 'inmueble no encontrado' });
            }
        }
    });
});

//INICIO DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
