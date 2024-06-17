var point = "https://www.arkimede.net/api/rest/";
async function getToken() {
  let formData = new FormData();
  formData.set("user", "admin");
  formData.set("password", "1q2w3e4r");
  const response = await fetch(point + "getToken/", {
    body: formData,
    method: "post",
  });
  const data = await response.json();
  return data;
}
async function query(sql, token, enq = "no") {
  /*enq='yes' :ExecuteNonQuery 
  (esegue una query complessa diversa dai semplici insert,update,delete,select (select into, drop, ecc... ))*/
  let formData = new FormData();
  formData.set("sql", sql);
  formData.set("token", token);
  formData.set("enq", enq);
  const response = await fetch(point + "query/", {
    body: formData,
    method: "post",
  });
  const data = await response.json();
  return data;
}

//funzioni specifiche per il db  EpisodiST.accdb (tabelle collegate da EpisodiSTMadre.accdb)
async function getEpisodi(token, sql = "") {
  let formData = new FormData();
  formData.set("token", token);
  if (sql != "") formData.set("sql", sql);
  const response = await fetch(point + "getEpisodi/", {
    body: formData,
    method: "post",
  });
  const data = await response.json();
  return data;
}
async function putEpisodio(json) {
  const response = await fetch(point + "putEpisodio/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });
  const data = await response.json();
  return data;
}
async function deleteEpisodio(token, id = "0") {
  let formData = new FormData();
  formData.set("token", token);
  formData.set("id", id);
  const response = await fetch(point + "deleteEpisodio/", {
    body: formData,
    method: "post",
  });
  const data = await response.json();
  return data;
}
exports.getToken = getToken;
exports.query = query;
exports.getEpisodi = getEpisodi;
exports.putEpisodio = putEpisodio;
exports.deleteEpisodio = deleteEpisodio;
