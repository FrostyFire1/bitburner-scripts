/** @param {import("../.").NS} ns */
export async function main(ns){
    ns.disableLog("ALL");
    let industryName = "Avast LLC";
    let corpoName = "Frosty Inc.";
    let bitnode = ns.getPlayer().bitnode

    //Create corpo using seed money if in bn3
    if(bitnode == 3) ns.corporation.createCorporation(corpoName,false)
    else {
        //Wait until player can self-fund corpo
        while(ns.getPlayer().money < 150e9) await ns.sleep(30000);
        ns.corporation.createCorporation(corpoName,true);
    }
    ns.corporation.expandIndustry("Software",industryName);
    ns.corporation.unlockUpgrade("Smart Supply");

    let cities = ["Aevum","Chongqing","Ishima","Volhaven","New Tokyo"]
    for(const city of cities){
        ns.corporation.expandCity(industryName,city);
        ns.print(`SUCCESS: Expanded to ${city}`);
    }

    let division = ns.corporation.getDivision(industryName);
    //Do initial job assignment
    for(const city of division.cities){
        ns.corporation.setSmartSupply(industryName,city,true);
        ns.corporation.purchaseWarehouse(industryName,city)
        for(let i = 0; i <3 ; i++) ns.corporation.hireEmployee(industryName,city);
        let employees = ns.corporation.getOffice(industryName,city).employees;
        await ns.corporation.assignJob(industryName,city,employees[0],"Operations");
        await ns.corporation.assignJob(industryName,city,employees[1],"Engineer");
        await ns.corporation.assignJob(industryName,city,employees[2],"Business");
        for(let i = 0; i<2; i++) ns.corporation.upgradeWarehouse(industryName,city)
        
    }
}