//global variables
var moduleMap = new Map();
var selectedSpecialisation = "computer-science";
var typeRequestFullName = new Map([["initial-request", "Initial Request"],
    ["change-request", "Change Request"]]);
var specialisationFullName = new Map([["computer-science", "Computer Science (in general)"],
    ["data-science", "Data Science"], ["scientific-computing", "Scientific Computing"]]);
var passedGatekeepers = new Map([["cna", false], ["fda", false], ["pc", false],
                            ["cs", false], ["dse", false], ["gfx", false],
                            ["sip", false], ["ise", false]]);
var gatekeepersFullName = new Map([["cna", "Combinatorial and Numerical Algorithms (CNA)"], ["fda", "Foundation of Data Analysis (FDA)"], ["pc", "Parallel Computing (PC)"],
                            ["cs", "Cooperative Systems (CS)"], ["dse", "Distributed Systems Engineering (DSE)"], ["gfx", "Foundations of Computer Graphics (GFX)"],
                            ["sip", "Signal and Image Processing (SIP)"], ["ise", "Information Management & Systems Engineering (ISE)"]]);

var allModuleClusters = [["cna", "aal", "hpa", "stl", "dpa1", "atal"], ["fda", "dm", "co", "nlp", "vis1", "atda"], ["pc", "cc1", "dse1", "hpc", "pop", "sdm1", "dpa2", "atpc"],
                            ["cs", "ntm1", "nce", "sec", "atnet"], ["dse2", "cc2", "iop", "bpm", "atics"], ["gfx", "cga", "gat", "ims", "rcg", "vis2", "atgfx"],
                            ["sip", "ipa", "mcm1", "mre", "mrs", "mst", "ntm2", "atmm"], ["ise", "bi1", "bi2", "ke", "mcm2", "sdm2", "atise"]];

var gatekeepersModules = ["cna", "fda", "pc", "cs", "dse1", "dse2", "gfx", "sip", "ise"];

//rules
var maxModules = 0;
var dataScienceRules = [2, 4, 1, 0, 0, 0, 0, 0];
var scientificComputingRules = [3, 1, 4, 1, 0, 0, 0, 0];
var computerScienceRules = [4, 4, 4, 4, 4, 4, 4, 4];
var currentRules = computerScienceRules;

//status
var selectedGatekeepers = 0;
var selectedModules = [0, 0, 0, 0, 0, 0, 0, 0];

class Module {
    constructor(name, membership, fields, requirements, children, passed = false) {
        this._name = name;
        this._membership = membership;
        this._fields = fields; //first field is own field
        this._requirements = requirements;
        this._children = children;
        this._checked = false;
        this._passed = passed;
    }
    isSelectable() {
        if (this._passed) return false;

        for (var i = 1; i < this._fields.length; ++i) {
            if (moduleMap.get(this._fields[i])._checked)
                return false;
        }

        if (this._requirements.length > 0) {
            var rqmtCnt = 0;
            this._requirements.forEach((value) => {
                if (moduleMap.get(value)._checked)
                    rqmtCnt++;
            });
            if (rqmtCnt == 0) return false;
        }

        return true;
    }
    setChecked(checked){
        this._checked = checked;
    }
}
