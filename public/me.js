$('document').ready(function() {
  //let plan = {{{plan}}};
  //console.log(plan);
  updateStatus();
  showGatekeepersPage();
  showModulesPage();
  $('#gatekeepers-tab .contact100-form-radio input:radio').on('change', function() {
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
  if (getNumSelectedClusters() < 6)
    $('#covered-clusters-status').css('background-color', 'red');
  else
    $('#covered-clusters-status').css('background-color', 'green');

  $('#selected-modules-value').text(getTotalCheckedModules());
  if (getTotalCheckedModules() !== 9)
    $('#selected-modules-status').css('background-color', 'red');
  else
    $('#selected-modules-status').css('background-color', 'green');
}

function savePlan() {
  let passedGateKeepersObject = {};
  passedGatekeepers.forEach((isPassed, gatekeeper) => {
    if (isPassed)
      passedGateKeepersObject[gatekeeper] = $(`input:radio[name=gatekeeper-${gatekeeper}]:checked`).val();
  });
  let planName=  $('#plan-name').val();
  let requestBody = {
    name: planName,
    gatekeepers: passedGateKeepersObject,
    modules: [...selectedModulesSet]
  };
  $.ajax({
    contentType: 'application/json',
    data: JSON.stringify(requestBody),
    processData: false,
    type: 'POST',
    url: '/planner',
    success: function(){
      window.alert(`Plan ${planName} was saved!`)
    },
    error:function(){
      console.log("error")
    }
  });
}
