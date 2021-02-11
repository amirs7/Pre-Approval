
showTab(0);

function printLog() {
    console.log(selectedGatekeepers);
    console.log(selectedModules);
    console.log(getNumSelectedClusters());
}

function getTotalCheckedModules() {
    return selectedModules.reduce((a,b) => a + b, 0);
}

function getNumSelectedClusters() {
    return selectedModules.reduce((total, a) => { return a > 0 ? total+1 : total }, 0);
}

function checkCluster(moduleNo) {
    return (selectedModules[moduleNo] < currentRules[moduleNo]);
}

function checkTotalModules() {
    return getTotalCheckedModules() != maxModules;
}

function activateCheckboxes() {
    moduleMap.forEach((value, key) => {
        if (value._checked && !value.isSelectable()) {
            document.getElementById(key).checked = false;
            document.getElementById(key).disabled = true;
            moduleMap.get(key)._checked = false;
            selectedModules[moduleMap.get(key)._membership]--;
        }
        else if (value.isSelectable()) {
            if (checkTotalModules() && checkCluster(value._membership)) {
                document.getElementById(key).disabled = false;
            } else {
                document.getElementById(key).disabled = !value._checked;
            }
        } else {
            document.getElementById(key).disabled = true;
        }
    });
}

function selectModule(box) { 
    moduleMap.get(box.name).setChecked(box.checked);
    var moduleNo = moduleMap.get(box.name)._membership;
    selectedModules[moduleNo] = box.checked ? selectedModules[moduleNo]+1 : selectedModules[moduleNo]-1;  
    activateCheckboxes();
    if (gatekeepersModules.includes(box.name)) {
        selectedGatekeepers = box.checked ? selectedGatekeepers+1 : selectedGatekeepers-1;
    }
}

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  x[n].style.display = "-webkit-box";
  x[n].style.display = "-webkit-flex";
  x[n].style.display = "-moz-box";
  x[n].style.display = "-ms-flexbox";
  x[n].style.display = "flex";
  x[n].style.flexWrap = "wrap";
  x[n].style.justifyContent = "space-between";
  $('html,body').scrollTop(0);
}

function showGatekeepersPage() {
    var valid = true;    
    var input = document.getElementById("personal-data-tab").getElementsByClassName("input100");    
    for(var i = 0; i < input.length; i++) {
        if(validatePersonalData(input[i]) == false) {
            showValidatePersonalData(input[i]);
            valid = false;
        }
    }
    var dropdownSpec = document.getElementById("specialisation-subject");
    if (dropdownSpec.selectedIndex == 0) {
        valid = false;
        document.getElementById("specialisation-subject-label").style.color = "#fa4251";
    }
    if (valid) {
        document.getElementById("error-gatekeeper").style.display = "none";
        var x = document.getElementsByClassName("tab");
        x[0].style.display = "none"; 
        showTab(1);
        fixStepIndicator(1);
        selectedSpecialisation = dropdownSpec.options[dropdownSpec.selectedIndex].value;
        maxModules = 9;
        if (selectedSpecialisation == "computer-science")
            currentRules = computerScienceRules;
        else if (selectedSpecialisation == "scientific-computing")
            currentRules = scientificComputingRules;
        else {
            currentRules = dataScienceRules;
            maxModules = 7;
        }            
    }
}

function generatePIN(){
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var toEmail = document.getElementById("email").value;
    document.getElementById("send-code-title").style.display = "none"; 
    document.getElementById("send-code-success").style.display = "none";
    document.getElementById("send-code-error").style.display = "none";
    $.ajax({
        url: "/computer-science/generator.php?to_email=" + toEmail + "&first_name=" + firstName + "&last_name=" + lastName,
        method: 'POST',
        processData: false,
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        success: function(response) {
                    console.log(response);
                    if (response == "Authentification Code has been sent")
                        document.getElementById("send-code-success").style.display = "inline-block";
                    else
                        document.getElementById("send-code-error").style.display = "inline-block";
                },
        error: function(err) {
                console.log(err);
                document.getElementById("send-code-error").style.display = "inline-block";
            }
    });
}

function createPDF(target) {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var matriculationNo = document.getElementById("matriculation-number").value;
    var pdfName = "Wahlmodulplanung_" + firstName + "_" + lastName + "_" + matriculationNo;

    if (target == "email") {
        var pdf = new jsPDF("p", "mm", "a4");
        writeHeader(pdf);
        writePersonalData(pdf);
        var baseY =  writeGatekeepers(pdf);
        var baseY = writeClusters(pdf, baseY);
        writeFooter(pdf, baseY);  
        
        pdf.setProperties({
            title: 'Module Planning'
        });

        if (document.getElementById("confirm").checked) {
            var requestType = typeRequestFullName.get($("input[name='type-request']:checked").val());
            var blob = pdf.output('blob');
            var formData = new FormData();
            formData.append('data', blob, pdfName + '.pdf');
            var toEmail = document.getElementById("email").value;
            var pin = document.getElementById("pin").value;
            $.ajax({
                url: "/computer-science/process.php?to_email=" + toEmail + "&first_name=" + firstName + "&last_name=" + lastName + "&matriculation_no=" + matriculationNo
                    + "&request_type=" + requestType + "&pin=" + pin,
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(response) {
                            console.log(response);
                            if (response == "Module Planning has been sent") {
                                let x = document.getElementsByClassName("tab");
                                x[3].style.display = "none";
                                showTab(4);
                                fixStepIndicator(4); 
                            } else
                                document.getElementById("error-unknown").style.display = "inline-block";
                        },
                error: function(err) {
                        console.log(err);
                        if (err.status == 401)
                            document.getElementById("error3").style.display = "inline-block";
                        else
                            document.getElementById("error-unknown").style.display = "inline-block";
                    }
            });            
        } else {
            document.getElementById("error2").style.display = "inline-block";
        }
    } else {
        var pdf = new jsPDF("p", "mm", "a4");
        writePreviewText(pdf);
        writeHeader(pdf);
        writePersonalData(pdf);
        var baseY =  writeGatekeepers(pdf);
        var baseY = writeClusters(pdf, baseY);
        writeFooter(pdf, baseY);       
        writePreviewText(pdf); //if the document is longer than 1 page
        pdf.setProperties({
            title: 'Module Planning'
        });
        pdf.save(pdfName + '_preview.pdf');
    } 
}

function showFinalPage() {
    var valid = false;
    if (selectedSpecialisation == "computer-science") {
        if (getTotalCheckedModules() == maxModules && selectedGatekeepers < 5 && getNumSelectedClusters() > 5)
            valid = true;
    } else {
        if (getTotalCheckedModules() == maxModules && isEqual(currentRules, selectedModules))
            valid = true;
    }

    if (valid) {
        var x = document.getElementsByClassName("tab");
        x[2].style.display = "none";
        showTab(3);
        fixStepIndicator(3);
    } else {
        document.getElementById("error1").style.display = "inline-block";
    }       
}

function setPassedGatekeepers(){
    passedGatekeepers.set("cna", ($("input:radio[name=gatekeeper-cna]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("fda", ($("input:radio[name=gatekeeper-fda]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("pc", ($("input:radio[name=gatekeeper-pc]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("cs", ($("input:radio[name=gatekeeper-cs]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("dse", ($("input:radio[name=gatekeeper-dse]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("gfx", ($("input:radio[name=gatekeeper-gfx]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("sip", ($("input:radio[name=gatekeeper-sip]:checked").val() != "not-passed") ? true : false);
    passedGatekeepers.set("ise", ($("input:radio[name=gatekeeper-ise]:checked").val() != "not-passed") ? true : false);
}

function displayClusters() {
    var instructions = document.getElementsByClassName("title-instructions-spec");
    var clusters = document.getElementsByClassName("cluster");
    initialiseAlgorithmCluster(clusters);
    initialiseDataAnalysisCluster(clusters);
    initialiseParallelComputingCluster(clusters);
    if (selectedSpecialisation == "data-science") {
        instructions[0].style.display = "block";
    } else if (selectedSpecialisation == "scientific-computing") {
        initialiseNetworks(clusters);
        instructions[1].style.display = "block";
    } else {
        initialiseNetworks(clusters);
        initialiseInternetComputing(clusters);
        initialiseComputerGraphics(clusters);
        initialiseMultimedia(clusters);
        initialiseInformationManagement(clusters);
        instructions[2].style.display = "block";
    }
}

function showModulesPage() {
    clearAllModules();
    setPassedGatekeepers();
    if (validateGatekeeperAlternatives()) {
        var x = document.getElementsByClassName("tab");
        x[1].style.display = "none";
        document.getElementById("error1").style.display = "none";
        showTab(2);
        fixStepIndicator(2);
        createModuleMap();
        displayClusters();  
    } else {
        document.getElementById("error-gatekeeper").style.display = "inline-block";
    }
      
}

function validateGatekeeperAlternatives() {
    var altInfoGiven = true;
    passedGatekeepers.forEach((value, key) => {
        if (value) {
            var desc = "";
            switch($("input:radio[name=gatekeeper-" + key + "]:checked").val()) {
                case "alternative1": 
                    desc = $("input:text[name=" + key + "-alternative]").val();
                    if (desc == "") altInfoGiven = false;
                    break;
                case "alternative2":
                    desc = $("input:text[name=" + key + "-ext-alternative]").val();
                    if (desc == "") altInfoGiven = false;
                    break;
                default: break;
            }
        }
    } )

    return altInfoGiven;

}

window.checkSpecialisation = function(e) {
    if (e.value != "")
        document.getElementById("specialisation-subject-label").style.color = "black";
}

function fixStepIndicator(n) {
    var i, x = document.getElementById("progressbar").getElementsByTagName("li");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace("current", "active");
    }
    if (n < 4)
        x[n].className += " current";
}

function validatePersonalData(input) {
    if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
        if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(univie.ac.at)$/) == null) {
            return false;
        }
    }
    else if($(input).attr('type') == 'matriculation' || $(input).attr('name') == 'matriculation-number') {
        if($(input).val().trim().match(/^([a-z]?\d{7,8})$/) == null) {
            return false;
        }
    }
    else {
        if($(input).val().trim() == '') {
            return false;
        }
    }
}

function showValidatePersonalData(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');

    $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
    $('.btn-hide-validate').each(function() {
        $(this).on('click',function() {
           hideValidate(this);
        });
    });
}

function hideValidatePersonalData(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).removeClass('alert-validate');
    $(thisAlert).find('.btn-hide-validate').remove();
}

(function ($) {
    "use strict";

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function() {
        $(this).on('blur', function() {
            if(validate(this) == false) {
                showValidate(this);
            }
            else {
                $(this).parent().addClass('true-validate');
            }
        })    
    })

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function() {
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false) {
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function() {
        $(this).focus(function() {
           hideValidate(this);
           $(this).parent().removeClass('true-validate');
        });
    });

     function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(univie.ac.at)$/) == null) {
                return false;
            }
        }
        else if($(input).attr('type') == 'matriculation' || $(input).attr('name') == 'matriculation-number') {
            if($(input).val().trim().match(/^([a-z]?\d{7,8})$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf136;</span>')
        $('.btn-hide-validate').each(function() {
            $(this).on('click',function() {
               hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }
    
})(jQuery);


