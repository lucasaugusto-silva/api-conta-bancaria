const express = require("express");
const { v4: uuid } = require("uuid");

const app = express();
const PORT = process.argv.PORT || 3000;

app.use(express.json());

const customers = [];

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return res.status(404).json({ error: "Customer already exists!" });
  } else {
    customers.push({
      cpf,
      name,
      id: uuid(),
      statement: [],
    });
  }
  return res.status(201).send();
});

app.get("/statement/", (req, res) => {
  const { cpf } = req.headers;
  const customer = customers.find((customer) => customer.cpf === cpf);
  if (!customer) {
    return res.status(400).json({ error: "Customer not found" });
  }
  return res.json(customer.statement);
});

app.listen(PORT, () => {
  console.log(`Server is running in localhost://${PORT}`);
});
