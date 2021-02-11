$('document').ready(function() {
  updateStatus();
  showGatekeepersPage();
  showModulesPage();
  $('#gatekeepers-tab .contact100-form-radio input:radio').on("change",function(){
    showModulesPage();
  });
});

function updateStatus() {
  $('#gatekeepers-status-value').text(selectedGatekeepers);
  if (selectedGatekeepers > 4)
    $('#gatekeepers-status').css('background-color', 'red');
  else
    $('#gatekeepers-status').css('background-color', 'green');

  $('#covered-clusters-value').text(getNumSelectedClusters());
  if(getNumSelectedClusters() < 6)
    $('#covered-clusters-status').css('background-color', 'red');
  else
    $('#covered-clusters-status').css('background-color', 'green');

  $('#selected-modules-value').text(getTotalCheckedModules());
  if(getTotalCheckedModules() !== 9)
    $('#selected-modules-status').css('background-color', 'red');
  else
    $('#selected-modules-status').css('background-color', 'green');
}

