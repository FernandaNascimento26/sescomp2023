const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

let tasks = [
  { id: 1, description: 'Comprar leite' },
  { id: 2, description: 'Pagar conta de luz' },
  { id: 3, description: 'Estudar JavaScript' },
]

// GET /tasks - retorna todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks)
})

// GET /tasks/:id - retorna uma tarefa específica
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const task = tasks.find(task => task.id === id)

  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' })
  }

  res.json(task)
})

// POST /tasks - cria uma nova tarefa
app.post('/tasks', (req, res) => {
  const { description } = req.body
  const id = tasks.length + 1
  const task = { id, description }

  tasks.push(task)

  res.json(task)
})

// PUT /tasks/:id - atualiza uma tarefa existente
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const taskIndex = tasks.findIndex(task => task.id === id)

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' })
  }

  const { description } = req.body
  const task = { id, description }

  tasks[taskIndex] = task

  res.json(task)
})

// DELETE /tasks/:id - exclui uma tarefa existente
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id)
  tasks = tasks.filter(task => task.id !== id)

  res.status(204).send()
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
