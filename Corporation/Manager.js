/** @param {import("../.").NS} ns */
export async function main(ns){
    let industryName = "Avast LLC";
    let corpoName = "Frosty Inc.";
    let bitnode = ns.getPlayer().bitnode
    if(bitnode == 3) ns.corporation.createCorporation(corpoName,false)
    else {
        while(ns.getPlayer().money < 150e9) await ns.sleep(30000);
        ns.corporation.createCorporation(corpoName,true);
    }
    ns.corporation.expandIndustry("Software",industryName);
    let cities = ["Aevum","Chongqing","Ishima","Volhaven","New Tokyo"]
    for(const city of cities){
        ns.corporation.expandCity(industryName,city);
        ns.print(`SUCCESS: Expanded to ${city}`);
        
    }

}