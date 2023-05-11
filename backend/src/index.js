var app = require("./app");

var port = process.env.PORT || 3900;

async function init() {
  app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);
  });
}
init();
