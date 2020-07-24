const fs = require("fs");
const yargs = require("yargs");
function loadDatas(path) {
  let data = fs.readFileSync(path);
  return JSON.parse(data.toString());
}
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "title note",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "body note",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    let note = {
      title: argv.title,
      body: argv.body,
    };

    let user = loadDatas("./datas/notes.json");
    user.push(note);
    console.log(user);
    fs.writeFile("./datas/notes.json", JSON.stringify(user), (err) => {
      if (err) throw err;
      console.log("Note ajoutée");
    });
  },
}).argv;
