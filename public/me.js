$('document').ready(function() {
  console.log(plan);
  initPlanName(plan);
  updateStatus();
  showGatekeepersPage();
  initPlanGatekeepers(plan);
  showModulesPage();
  initPlanModules(plan);
  $('#gatekeepers-tab .contact100-form-radio input:radio').on('change', function() {
    showModulesPage();
  });
});

function initPlanName(plan) {
  if (plan.name == null)
    return;
  $('#plan-name').val(plan.name);
}

function initPlanGatekeepers(plan) {
  if (plan.name == null)
    return;
  for (let gatekeeper in plan.gatekeepers) {
    let value = plan.gatekeepers[gatekeeper];
    let radios = $(`input:radio[name=gatekeeper-${gatekeeper}]`);
    radios.filter(`[value=${value}]`).prop('checked', true).trigger('change');
  }
}

function initPlanModules(plan) {
  if (plan.name == null)
    return;
  for (let moduleName of plan.modules)
    $(`#${moduleName}`).prop('checked', true).trigger('change');
}

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
  let planName = $('#plan-name').val();
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
    url: '/plans',
    success: function() {
      window.alert(`Plan ${planName} was saved!`);
      if (window.location.pathname !== '/plans/' + planName)
        window.location.replace('/plans/' + planName);
    },
    error: function() {
      window.alert(`Saving plan failed!!!!!`);
    }
  });
}

