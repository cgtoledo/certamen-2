
import { Router } from 'express';
import { authMiddleware } from '../middleware/valmidle.js'
import { createtodoSchema, updateTodoSchema } from '../schemas/valido.js'
import { getTodos, getTodo, createTodo, updatetodo, deletetodo } from '../repositories/todos.js';

const router = Router()


router.get("/", authMiddleware, (req, res) => {
  res.send(getTodos());
});

router.get("/:id", authMiddleware, (req, res) => {
  const todo = getTodo(req.params.id)

  if (todo) {
    res.send(todo)
  } else {
    res.status(404).send({
      error: "dato no encontrado"
    })
  }
})

router.post("/", authMiddleware, (req, res) => {
  let todo;
  try {
    todo = createtodoSchema.validateSync(req.body, {
      stripUnknown: true, strict: true,
  
    });
  } catch (ex) {
    return res.status(400).send(ex)({
      error: 'Datos incorrectos'
    })
  }
  res.status(201).send(createTodo(todo));
});

router.put("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  let validatedtodo;
  
  try {
    validatedtodo = updateTodoSchema.validateSync(req.body, {
      stripUnknown: true,strict: true,
      
    });
    const updatedt = updatetodo(id, validatedtodo);

    if (updatedt === undefined) {
      return res.status(404).send({
        error: "dato no encontrado"
      })
    }

    res.status(200).send(updatedt);


  } catch (ex) {
    return res.status(400).send(ex)
  }


});

router.delete("/:id", authMiddleware, (req, res) => {
  let d = deletetodo(req.params.id)
  if (d === 'no existe') {
    return res.status(404).send({
      error: "dato no encontrado"
    })
  }
  if (d === 'ok') {
    return res.status(204).send();
  }

});

export default router;