const express = require("express");
const app = express()
const cors = require("cors");
 
const dotenv = require("dotenv");
dotenv.config();
//conectar con la base de datos
const {connection} = require("../config.db");

const getCategorias = (request, response) => {
    connection.query("SELECT * FROM tb_categorias ",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta de consumo
app.route("/categories")
.get(getCategorias);

const getCategoria = (request, response) => {
	const {id_categorias} = request.body;
    connection.query("select * from tb_categorias where id_categorias = ?",
	[id_categorias],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta de consumo
app.route("/categories")
.get(getCategoria);

const postCategorias = (request, response) => {
    const {id_categorias, categoria, etiquetas} = request.body;
    connection.query("INSERT INTO tb_categorias (id_categorias, categoria, etiquetas) VALUES (?, ?, ?);",
    [id_categorias, categoria, etiquetas],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(['success','categoria creada']);
    });
};

//ruta de consumo
app.route("/categories")
.post(postCategorias);

const putCategorias = (request, response) => {
    const {categoria, etiquetas, id_categorias } = request.body;
    connection.query("update tb_tareas SET  categoria = ?, etiquetas = ? WHERE id_categorias = ?",
    [categoria, etiquetas, id_categorias],
	(error, results) => {
        if(error)
            throw error;
        response.status(201).json(['success','categoria modificada']);
    });
};

//ruta de consumo
app.route("/categories")
.post(putCategorias);
/* Metodo delete */

const deletecategorias = (request, response) => {
    const {id} = request.body;
    connection.query("delete from tb_categorias where id_categorias = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(['success','categoria eliminada']);
    });
};
app.route("/categories")
.delete(deletecategorias);



module.exports = app