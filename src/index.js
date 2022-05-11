const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.argv.PORT || 3000;

app.use(express.json());

const customer = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const customerAlreadyExists = customer.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return res.status(404).json({ error: "Customer already exists!" });
  } else {
    customer.push({
      cpf,
      name,
      id: uuid(),
      statement: [],
    });
  }
  return res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`Server is running in localhost://${PORT}`);
});
