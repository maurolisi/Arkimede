const express = require("express");
const app = express();
var point = "https://www.arkimede.net/api/rest/";
const arkimede = require("./_moduls/arkimede.js");
app.get("/", async (req, res) => {
  var tk = await arkimede.getToken();
  console.log(tk);
  var episodi = await arkimede.query(
    "select * from episodi order by id",
    tk[0].token
  );
  let tbl = "";
  episodi.datiEstratti.map((item) => {
    tbl += "<tr>";
    tbl +=
      '<td><img width="160" src="https://www.arkimede.net/api/rest/STPic/' +
      item.Foto +
      '"></td>';
    tbl += "<td>" + item.Serie + "</td>";
    tbl += "<td>" + item.Stagione_Episodio + "</td>";
    tbl += "<td>" + item.TitoloItaliano + "</td>";
    tbl += "<td>" + item.Riassunto + "</td>";
    tbl += "</tr>";
  });
  var testa = "<tr>";
  testa += "<th>Image</th>";
  testa += "<th>Serie</th>";
  testa += "<th>Stagione Episodio</th>";
  testa += "<th>Titolo</th>";
  testa += "<th>Riassunto</th>";
  testa += "</tr>";
  tbl = "<table width=100% border=1>" + testa + tbl + "</table>";
  res.send(tbl);
});
app.get("/query", async (req, res) => {
  var tk = await arkimede.getToken();
  // var sql = "insert into utenti (nome,cognome)values('nnome','ccognome')";
  // sql = "update utenti set mail='provaUpdate2' where idUtente=7";
  sql = "select top 2 * from token";
  // sql = "delete from episodi where sigla='mau'";
  // sql =
  // ("SELECT Count(Episodi.id) AS Eps, Episodi.Sigla, Episodi.Serie FROM Episodi GROUP BY Episodi.Sigla, Episodi.Serie;");
  // sql = "delete from utenti where idUtente=7";
  // sql = "select * into ep2 from episodi";
  // sql = "drop table ep2";
  var rsp = await arkimede.query(sql, tk[0].token);
  console.log(rsp);

  res.json(rsp);
});
app.get("/put", async (req, res) => {
  var json = {
    id: 0,
    Sigla: "mau",
    Serie: "mauro",
    Ordine: "1502",
    Stagione_Episodio: "1.01",
    TitoloOriginale: "Gooo",
    TitoloItaliano: "VAIIII",
    Foto: "ds9/5-04.jpg",
    FotoSuStic: "http://www.stic.it/immagini/dsn/episodi/5-04.jpg",
    Riassunto: "prova inserimento episodio",
  };
  var tk = await arkimede.getToken();
  json.token = tk[0].token;
  var rsp = await arkimede.putEpisodio(json);
  res.send(rsp);
});
app.get("/del", async (req, res) => {
  var tk = await arkimede.getToken();
  //for (i = 698; i < 714; i++) await arkimede.deleteEpisodio(tk[0].token, i);
  var rsp = await arkimede.deleteEpisodio(tk[0].token, "712");
  res.send(rsp);
});
//eseguzione di una funzione asynctrona senza bisogno di chiamarla (non ha nome)
(async () => {
  /*codice*/
})();

//controllers:
app.listen(3000);
