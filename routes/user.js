const express = require("express");
 
const dotenv = require("dotenv");
dotenv.config();

//conectar con la base de datos
const {connection} = require("../config.db");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const app = express()
const cors = require("cors");
const  bcrypt  =  require ( 'bcrypt' ) ; 
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))


app.get('/', (req, res) => {
	res.send('hola desde tu primera ruta de la Api')
})

const getUsuarios = (request, response) => {
    connection.query("SELECT * FROM tb_usuarios ",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta de consumo
app.route("/users")

.get(getUsuarios);

const getUsuario = (request, response) => {
	const {id_usuarios} = request.body;
    connection.query("select * from tb_usuarios where id_usuarios = ?",
	[id_usuarios],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta de consumo
app.route("/user")
.get(getUsuario);

const postUsuarios = (request, response) => {
    const {nombre_usuario, correo_usuario, password} = request.body;
    bcrypt.hash(password,10, (err, hash) =>{
        if (err) {
            console.log(err)
            res.status(405).json(['error','no se pudo crear']);
            }
    connection.query("INSERT into tb_usuarios (nombre_usuario, correo_usuario, password) VALUES (?, ?, ?)",
    [nombre_usuario,correo_usuario, hash],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    })

    })};

app.route("/register")
.post(postUsuarios);

/* const postUsuarios = (request, response) => {
    const {id_usuarios, nombre_usuario, telefono, correo_usuario, password, direccion, activo,  ciudad, pais, codigo_postal} = request.body;
    bcrypt.hash(password,10, (err, hash) =>{
        if (err) {
            console.log(err)
            res.status(405).json(['error','no se pudo crear']);
            }
    connection.query("INSERT into tb_usuarios (id_usuarios, nombre_usuario, telefono, correo_usuario, password, direccion, activo, ciudad, pais, codigo_postal) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?,?)",
    [id_usuarios, nombre_usuario, telefono, correo_usuario, hash, direccion, activo,  ciudad, pais, codigo_postal],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    })

    })};

app.route("/register")
.post(postUsuarios); */


const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.send("Por favor suminstra un token válido");
    } else {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if (err) {
                console.log(err);
                res.json({ auth: false, message: "Falló la autenticación"});
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    }
};

app.get('/isUserAuth', verifyJWT , (req, res) => {
    res.send("Autentcación exitosa:")
})

const putUsuarios = (request, response) => {
    const {nombre_usuario, telefono, correo_usuario, password, direccion, activo, id_usuarios} = request.body;
    connection.query("update tb_usuarios set  nombre_usuario = ?, telefono = ?, correo_usuario =? , password =?, direccion= ?, activo=? where id_usuarios= ?",
    [nombre_usuario, telefono, correo_usuario, password, direccion, activo, id_usuarios],
	(error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};

app.route("/user")
.put(putUsuarios);

/* Metodo delete */

const deleteUsuarios = (request, response) => {
    const {id_usuarios} = request.body;
    connection.query("update tb_usuarios set activo = 0 where id_usuarios = ?",
    [id_usuarios],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
};
app.route("/user")
.delete(deleteUsuarios);


const postloginUsuario = (request, response) =>{
    const {correo_usuario, password} = request.body;
    console.log(request.body);
    connection.query("SELECT * FROM tb_usuarios WHERE correo_usuario = ?;",
    [correo_usuario], 
    (err, result)=> {
        if (err) {
            response.send({err: err});
        } 

        if (result.length > 0) {
            
            bcrypt.hash(password,10, (err, hash) => {

                if (err) {
                    console.log(err)
                }
                console.log(hash)
            })

            bcrypt.compare(password, result[0].password, (error, res) => {
                if (res) {
                    const id = result[0].id
                    const token = jwt.sign({id}, "jwtSecret", {
                        expiresIn: 300,
                    })
                    /* request.session.user = result; */

                   /*  console.log(req.session.user); */
                    response.json({auth: true, token: token, result: result});
                } else{
                    response.json({auth: false, message: "Wrong username password"}); 
                }
            })
        } else {
            response.json({auth: false, message: "no user exists"});
        }
    }
    );
};
app.route("/login")
.post(postloginUsuario);

const putloginUsuario = (request, response) => {
    const {correo_usuario, password} = request.body;
    bcrypt.hash(password,10, (err, hash) =>{
        if (err) {
            console.log(err)
            res.status(405).json(['error','no se pudo crear']);
            }
    connection.query("update tb_usuarios SET password = ? WHERE (correo_usuario = ?)",
    [hash, correo_usuario],
	(error, results) => {
        if(error)
            throw error;
        response.status(201).json(results);
    });
})};

app.route("/login")
.put(putloginUsuario);

module.exports = app



