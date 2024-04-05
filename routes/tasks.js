const express = require("express");
const app = express()
const cors = require("cors");
 
const dotenv = require("dotenv");
dotenv.config();
//conectar con la base de datos
const {connection} = require("../config.db");

const getTasks = (request, response) => {
    connection.query("SELECT * FROM tb_tareas ",
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta de consumo
app.route("/tasks")
.get(getTasks);

const getTask = (request, response) => {
	const {id_tareas} = request.body;
    connection.query("select * from tb_tareas where id_tareas = ?",
	[id_tareas],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
//ruta de consumo
app.route("/tasks")
.get(getTask);

const postTasks = (request, response) => {
    const {id_tareas, tarea, descripcion, fecha_vencimiento, prioridad, estado} = request.body;
    connection.query("INSERT INTO tb_tareas (id_tareas, tarea, descripcion, fecha_vencimiento, prioridad, estado) VALUES (?, ?, ?, ?, ?, ?)",
    [id_tareas, tarea, descripcion, fecha_vencimiento, prioridad, estado],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(['success','tarea creada']);
    });
};

//ruta de consumo
app.route("/tasks")
.post(postTasks);

const putTasks = (request, response) => {
    const {tarea, descripcion, fecha_vencimiento, prioridad, estado, id_tareas} = request.body;
    connection.query("update tb_tareas SET  tarea = ?, descripcion = ?, fecha_vencimiento = ?, prioridad = ?, estado = ? WHERE id_tareas = ?",
    [tarea, descripcion, fecha_vencimiento, prioridad, estado, id_tareas],
	(error, results) => {
        if(error)
            throw error;
        response.status(201).json(['success','tarea modificada']);
    });
};

//ruta de consumo
app.route("/tasks")
.put(putTasks);
/* Metodo delete */

const deleteTasks = (request, response) => {
    const {id} = request.body;
    connection.query("delete from tb_tareas where id_tareas = ?",
    [id],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json(['success','tarea eliminada']);
    });
};
app.route("/tasks")
.delete(deleteTasks);



module.exports = app