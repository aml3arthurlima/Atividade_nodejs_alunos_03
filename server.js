const express = require('express');

const app = express();
const PORT = 3000;


app.use(express.json());


let alunos = [
  { id: 1, nome: 'Ana', curso: 'Computação' },
  { id: 2, nome: 'Pedro', curso: 'Sistemas de Informação' }
];

// O próximo ID é sempre maior que o maior
let proximoId = Math.max(...alunos.map(aluno => aluno.id)) + 1;


app.get('/alunos', (req, res) => {
  res.status(200).json(alunos);
});


app.get('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const aluno = alunos.find(item => item.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado.' });
  }

  return res.status(200).json(aluno);
});


app.post('/alunos', (req, res) => {
  const { nome, curso } = req.body;

  if (typeof nome !== 'string' || !nome.trim() ||
      typeof curso !== 'string' || !curso.trim()) {
    return res.status(400).json({ erro: 'Informe nome e curso corretamente' });
  }

  const novoAluno = {
    id: proximoId++,
    nome: nome.trim(),
    curso: curso.trim()
  };

  alunos.push(novoAluno);
  return res.status(201).json(novoAluno);
});


app.put('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const aluno = alunos.find(item => item.id === id);

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado.' });
  }

  const { nome, curso } = req.body;
  if (typeof nome !== 'string' || !nome.trim() ||
      typeof curso !== 'string' || !curso.trim()) {
    return res.status(400).json({ erro: 'Informe nome e curso corretamente' });
  }

  aluno.nome = nome.trim();
  aluno.curso = curso.trim();
  return res.status(200).json(aluno);
});


app.delete('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = alunos.findIndex(item => item.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado.' });
  }

  alunos.splice(indice, 1);
  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API de alunos disponível em http://localhost:${PORT}`);
});
