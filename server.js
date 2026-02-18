const express = require("express");
const fileHandler = require("./modules/fileHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


// Dashboard
app.get("/", async (req, res) => {
  const employees = await fileHandler.read();
  res.render("index", { employees });
});


// Add Page
app.get("/add", (req, res) => {
  res.render("add");
});


// Add Employee
app.post("/add", async (req, res) => {
  let { name, department, salary } = req.body;
  salary = Number(salary);

  if (!name || salary < 0) return res.redirect("/");

  const employees = await fileHandler.read();

  employees.push({
    id: Date.now(),
    name,
    department,
    salary
  });

  await fileHandler.write(employees);
  res.redirect("/");
});


// Delete
app.get("/delete/:id", async (req, res) => {
  let employees = await fileHandler.read();
  employees = employees.filter(emp => emp.id != req.params.id);
  await fileHandler.write(employees);
  res.redirect("/");
});


// Edit Page
app.get("/edit/:id", async (req, res) => {
  const employees = await fileHandler.read();
  const emp = employees.find(e => e.id == req.params.id);
  res.render("edit", { emp });
});


// Update
app.post("/update/:id", async (req, res) => {
  let { name, department, salary } = req.body;
  salary = Number(salary);

  if (!name || salary < 0) return res.redirect("/");

  const employees = await fileHandler.read();

  const index = employees.findIndex(e => e.id == req.params.id);

  employees[index] = {
    id: employees[index].id,
    name,
    department,
    salary
  };

  await fileHandler.write(employees);
  res.redirect("/");
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));