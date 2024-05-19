import express from 'express';
import cors from "cors";
import todos from './controllers/todos.js';
import usuarios from './controllers/usuarios.js';


const app = express();
app.use(express.json());

app.use(express.static('public'))
app.use(cors());

app.use("/api/todos", todos);
app.use("/api", usuarios);

app.get('/api', (req, res) => {
	res.type('text/plain')
	res.end('Hello World!')
})



export default app
