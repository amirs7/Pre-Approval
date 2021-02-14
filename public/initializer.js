function createModuleMap() {
    //Algorithm cluster
    moduleMap.set("cna", new Module("Combinatorial and Numerical Algorithms (CNA)", 0, ["cna"], [], ["aal", "hpa", "stl", "dpa1", "dpa2", "atal"], passedGatekeepers.get("cna")));
    moduleMap.set("aal", new Module("Advanced Algorithms (AAL)", 0, ["aal"], passedGatekeepers.get("cna") ? [] : ["cna"], []));
    moduleMap.set("hpa", new Module("Numerical High Performance Algorithms (HPA)", 0, ["hpa"], passedGatekeepers.get("cna") ? [] : ["cna"], []));
    moduleMap.set("stl", new Module("Software Tools and Libraries for Scientific Computing (STL)", 0, ["stl"], passedGatekeepers.get("cna") ? [] : ["cna"], []));
    moduleMap.set("dpa1", new Module("Distributed and Parallel Algorithms (DPA)", 0, ["dpa1", "dpa2"], passedGatekeepers.get("cna") || passedGatekeepers.get("pc") ? [] : ["cna", "pc"], []));
    moduleMap.set("atal", new Module("Advanced Topics in Algorithms (AT-AL)", 0, ["atal"], passedGatekeepers.get("cna") ? [] : ["cna"], []));
    //Data Analysis
    moduleMap.set("fda", new Module("Foundations of Data Analysis (FDA)", 1, ["fda"], [], ["dm", "co", "nlp", "vis1", "vis2", "atda"], passedGatekeepers.get("fda")));
    moduleMap.set("dm", new Module("Data Mining (DM)", 1, ["dm"], passedGatekeepers.get("fda") ? [] : ["fda"], []));
    moduleMap.set("co", new Module("Computational Optimisation (CO)", 1, ["co"], passedGatekeepers.get("fda") ? [] : ["fda"], []));
    moduleMap.set("nlp", new Module("Natural Language Processing (NLP)", 1, ["nlp"], passedGatekeepers.get("fda") ? [] : ["fda"], []));
    moduleMap.set("vis1", new Module("Visualisation and Visual Data Analysis (VIS)", 1, ["vis1", "vis2"], passedGatekeepers.get("gfx") || passedGatekeepers.get("fda") ? [] : ["fda", "gfx"], []));
    moduleMap.set("atda", new Module("Advanced Topics in Data Analysis (AT-DA)", 1, ["atda"], passedGatekeepers.get("fda") ? [] : ["fda"], []));
    //Parallel Computing
    moduleMap.set("pc", new Module("Parallel Computing (PC)", 2, ["pc"], [], ["cc1", "cc2", "hpc", "pop", "sdm1", "sdm2", "dpa1", "dpa2", "atpc"], passedGatekeepers.get("pc")));
    moduleMap.set("cc1", new Module("Cloud Computing (CC)", 2, ["cc1", "cc2"], passedGatekeepers.get("pc") || passedGatekeepers.get("dse") ? [] : ["pc", "dse1", "dse2"], []));
    moduleMap.set("dse1", new Module("Distributed Systems Engineering (DSE)", 2, ["dse1", "dse2"], [], ["cc1", "cc2", "iop", "bpm", "atics"], passedGatekeepers.get("dse")));
    moduleMap.set("hpc", new Module("High Performance Computing (HPC)", 2, ["hpc"], passedGatekeepers.get("pc") ? [] : ["pc"], []));
    moduleMap.set("pop", new Module("Program Optimisations and Runtime Systems (POP)", 2, ["pop"], passedGatekeepers.get("pc") ? [] : ["pc"], []));
    moduleMap.set("sdm1", new Module("Scientific Data Management (SDM)", 2, ["sdm1", "sdm2"], passedGatekeepers.get("ise") || passedGatekeepers.get("pc") ? [] : ["pc", "ise"], []));
    moduleMap.set("dpa2", new Module("Distributed and Parallel Algorithms (DPA)", 2, ["dpa2", "dpa1"], passedGatekeepers.get("cna") || passedGatekeepers.get("pc") ? [] : ["cna", "pc"], []));
    moduleMap.set("atpc", new Module("Advanced Topics in Parallel Computing (AT-PC)", 2, ["atpc"], passedGatekeepers.get("pc") ? [] : ["pc"], []));
    //Networks
    moduleMap.set("cs", new Module("Cooperative Systems (CS)", 3, ["cs"], [], ["ntm1", "ntm2", "nce", "sec", "atnet"], passedGatekeepers.get("cs")));
    moduleMap.set("ntm1", new Module("Network Technologies for Multimedia Applications (NTM)", 3, ["ntm1", "ntm2"], passedGatekeepers.get("cs") || passedGatekeepers.get("sip") ? [] : ["cs", "sip"], []));
    moduleMap.set("nce", new Module("Network-Based Communication Ecosystems (NCE)", 3, ["nce"], passedGatekeepers.get("cs") ? [] : ["cs"], []));
    moduleMap.set("sec", new Module("Network Security (SEC)", 3, ["sec"], passedGatekeepers.get("cs") ? [] : ["cs"], []));
    moduleMap.set("atnet", new Module("Advanced Topics in Networks (AT-NET)", 3, ["atnet"], passedGatekeepers.get("cs") ? [] : ["cs"], []));
    //Internet Computing & Software Technology
    moduleMap.set("dse2", new Module("Distributed Systems Engineering (DSE)", 4, ["dse2", "dse1"], [], ["cc1", "cc2", "iop", "bpm", "atics"], passedGatekeepers.get("dse")));
    moduleMap.set("cc2", new Module("Cloud Computing (CC)", 4, ["cc2", "cc1"], passedGatekeepers.get("pc") || passedGatekeepers.get("dse") ? [] : ["pc", "dse1", "dse2"], []));
    moduleMap.set("iop", new Module("Interoperability (IOP)", 4, ["iop"], passedGatekeepers.get("dse") ? [] : ["dse1", "dse2"], []));
    moduleMap.set("bpm", new Module("Business Process Management (BPM)", 4, ["bpm"], passedGatekeepers.get("dse") ? [] : ["dse1", "dse2"], []));
    moduleMap.set("atics", new Module("Advanced Topics in Internet Computing and Software Technology (AT-ICS)", 4, ["atics"], passedGatekeepers.get("dse") ? [] : ["dse1", "dse2"], []));
    //Computer Graphics
    moduleMap.set("gfx", new Module("Foundations of Computer Graphics (GFX)", 5, ["gfx"], [], ["cga", "ntm2", "nce", "sec", "atnet"], passedGatekeepers.get("gfx")));
    moduleMap.set("cga", new Module("Cloud Gaming (CGA)", 5, ["cga"], passedGatekeepers.get("gfx") ? [] : ["gfx"], []));
    moduleMap.set("gat", new Module("Gaming Technologies (GAT)", 5, ["gat"], passedGatekeepers.get("gfx") ? [] : ["gfx"], []));
    moduleMap.set("ims", new Module("Image Synthesis (IMS)", 5, ["ims"], passedGatekeepers.get("gfx") ? [] : ["gfx"], []));
    moduleMap.set("rcg", new Module("Real-Time Computer Graphics (RCG)", 5, ["rcg"], passedGatekeepers.get("gfx") ? [] : ["gfx"], []));
    moduleMap.set("vis2", new Module("Visualisation and Visual Data Analysis (VIS)", 5, ["vis2", "vis1"], passedGatekeepers.get("gfx") || passedGatekeepers.get("fda") ? [] : ["fda", "gfx"], []));
    moduleMap.set("atgfx", new Module("Advanced Topics in Computer Graphics (AT-GFX)", 5, ["atgfx"], passedGatekeepers.get("gfx") ? [] : ["gfx"], []));
    //Multimedia
    moduleMap.set("sip", new Module("Signal and Image Processing (SIP)", 6, ["sip"], [], ["cga", "ntm2", "nce", "sec", "atnet"], passedGatekeepers.get("sip")));
    moduleMap.set("ipa", new Module("Image Processing and Image Analysis (IPA)", 6, ["ipa"], passedGatekeepers.get("sip") ? [] : ["sip"], []));
    moduleMap.set("mcm1", new Module("Multimedia Content Management (MCM)", 6, ["mcm1", "mcm2"], passedGatekeepers.get("sip") || passedGatekeepers.get("ise") ? [] : ["sip", "ise"], []));
    moduleMap.set("mre", new Module("Multimedia Representation and Encoding (MRE)", 6, ["mre"], passedGatekeepers.get("sip") ? [] : ["sip"], []));
    moduleMap.set("mrs", new Module("Multimedia Retrieval and Content-Based Search (MRS)", 6, ["mrs"], passedGatekeepers.get("sip") ? [] : ["sip"], []));
    moduleMap.set("mst", new Module("Multimedia and Semantic Technologies (MST)", 6, ["mst"], passedGatekeepers.get("sip") ? [] : ["sip"], []));
    moduleMap.set("ntm2", new Module("Network Technologies for Multimedia Applications (NTM)", 6, ["ntm2", "ntm1"], passedGatekeepers.get("cs") || passedGatekeepers.get("sip") ? [] : ["cs", "sip"], []));
    moduleMap.set("atmm", new Module("Advanced Topics in Multimedia (AT-MM)", 6, ["atmm"], passedGatekeepers.get("sip") ? [] : ["sip"], []));
    //Information Management & Systems Engineering    
    moduleMap.set("ise", new Module("Information Management & Systems Engineering (ISE)", 7, ["ise"], [], ["bi1", "bi2", "ke", "mcm1", "mcm2", "sdm1", "sdm2", "atise"], passedGatekeepers.get("ise")));
    moduleMap.set("bi1", new Module("Business Intelligence I (BI1)", 7, ["bi1"], passedGatekeepers.get("ise") ? [] : ["ise"], []));
    moduleMap.set("bi2", new Module("Business Intelligence II (BI2)", 7, ["bi2"], passedGatekeepers.get("ise") ? [] : ["ise"], []));
    moduleMap.set("ke", new Module("Knowledge Engineering (KE)", 7, ["ke"], passedGatekeepers.get("ise") ? [] : ["ise"], []));
    moduleMap.set("mcm2", new Module("Multimedia Content Management (MCM)", 7, ["mcm2", "mcm1"], passedGatekeepers.get("sip") || passedGatekeepers.get("ise") ? [] : ["sip", "ise"], []));
    moduleMap.set("sdm2", new Module("Scientific Data Management (SDM)", 7, ["sdm2", "sdm1"], passedGatekeepers.get("ise") || passedGatekeepers.get("pc") ? [] : ["pc", "ise"], []));
    moduleMap.set("atise", new Module("Advanced Topics in Information Management & Systems Engineering (AT-ISE)", 7, ["atise"], passedGatekeepers.get("ise") ? [] : ["ise"], []));
}

function clearAllModules() {
    allModules = ["cna", "aal", "hpa", "stl", "dpa1", "atal","fda", "dm", "co", "nlp", "vis1", "atda", "pc", "cc1", "dse1", "hpc", "pop", "sdm1", "dpa2", "atpc",
        "cs", "ntm1", "nce", "sec", "atnet", "dse2", "cc2", "iop", "bpm", "atics", "gfx", "cga", "gat", "ims", "rcg", "vis2", "atgfx", 
        "sip", "ipa", "mcm1", "mre", "mrs", "mst", "ntm2", "atmm", "ise", "bi1", "bi2", "ke", "mcm2", "sdm2", "atise"];

    allModules.forEach((value) => document.getElementById(value).checked = false); 

    selectedGatekeepers = 0;
    selectedModules = [0, 0, 0, 0, 0, 0, 0, 0];
}

function initialiseAlgorithmCluster(clusters) {    
    var algoModules = ["cna", "aal", "hpa", "stl", "dpa1", "atal"];
    algoModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[0].style.display = "block";
}

function initialiseDataAnalysisCluster(clusters) {
    var daModules = ["fda", "dm", "co", "nlp", "vis1", "atda"];
    daModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[1].style.display = "block";
}

function initialiseParallelComputingCluster(clusters) {    
    var daModules = ["pc", "cc1", "dse1", "hpc", "pop", "sdm1", "dpa2", "atpc"];
    daModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[2].style.display = "block";
}

function initialiseNetworks(clusters) {
    var nwModules = ["cs", "ntm1", "nce", "sec", "atnet"];
    nwModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[3].style.display = "block";
}

function initialiseInternetComputing(clusters) {
    var icModules = ["dse2", "cc2", "iop", "bpm", "atics"];
    icModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[4].style.display = "block";
}

function initialiseComputerGraphics(clusters) {
    var gfxModules = ["gfx", "cga", "gat", "ims", "rcg", "vis2", "atgfx"];
    gfxModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[5].style.display = "block";
}

function initialiseMultimedia(clusters) {
    var mmModules = ["sip", "ipa", "mcm1", "mre", "mrs", "mst", "ntm2", "atmm"];
    mmModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[6].style.display = "block";
}

function initialiseInformationManagement(clusters) {
    var imModules = ["ise", "bi1", "bi2", "ke", "mcm2", "sdm2", "atise"];
    imModules.forEach((value) => document.getElementById(value).disabled = !moduleMap.get(value).isSelectable());
    clusters[7].style.display = "block";
}
