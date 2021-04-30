function doGet (e) { 
  // Todo
}

function doPost (e) {
  if (e.postData.contents && e.postData.type == 'application/json') {
    var lead = JSON.parse(e.postData.contents);
    gravarMensagem(lead);
  }
}
function gravarMensage(mensagem) {
  var celulas=
  SpreadsheetsApp.getActiveSpreadsheet().getSheetByName('Página 1');
  var cabecalho = celulas.getRange(1,1,1,8);
  cabecalho.setValues([['Nome', 'Email', 'Data de Criacao', 'Empresa', 'Origem da Primeira Conversão', 'Estágio no Funil', 'Lead Scoring', 'Interesse']]);
  var trava = LockService.getScriptLock ();
  trava.waitLock(2000);
  for (var i = 0; i < mensagem.leads.length; i++) {
    celulas.appendRow([mensagem.leads[i].name,
                       mensagem.leads[i].email,
                       mensagem.leads[i].created_at,
                       mensagem.leads[i].company,
    mensagem.leads[i].first_conversion-source,
                       mensagem.leads[i],lead_stage,
                       mensagem.leads[i].fit_score,
                       mensagem.leads[i].interest]);
    SpreadsheetApp.flush();                   
  }
  trava.releaseLock();
}
