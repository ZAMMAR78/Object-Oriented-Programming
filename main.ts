import inquirer from "inquirer";

class Student {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class Person {
  students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

const programStart = async (persons: Person) => {
  console.log("Welcome!");
  while (true) {
    const ans = await inquirer.prompt({
      name: "Select",
      type: "list",
      message: "Whom would you like to interact with?",
      choices: ["Staff", "Student", "Exit"]
    });
    if (ans.Select === "Staff") {
      console.log("You approach the staffroom. Please feel free to ask any questions.");
    } else if (ans.Select === "Student") {
      const studentNameInput = await inquirer.prompt({
        name: "student",
        type: "input",
        message: "Enter the student's name you wish to engage with:"
      });
      const studentName = studentNameInput.student;
      if (studentName) {
        const existingStudent = persons.students.find(student => student.name === studentName);
        if (!existingStudent) {
          const newStudent = new Student(studentName);
          persons.addStudent(newStudent);
          console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
          console.log("New student added.");
          console.log("Current Student List:");
          console.log(persons.students);
        } else {
          console.log(`Hello, I am ${existingStudent.name}. Nice to see you again!`);
          console.log("Existing student list:");
          console.log(persons.students);
        }
      } else {
        console.log("Student name is not provided.");
      }
    } else if (ans.Select === "Exit") {
      console.log("Exiting the program...");
      break;
    }
  }
};

programStart(persons);
