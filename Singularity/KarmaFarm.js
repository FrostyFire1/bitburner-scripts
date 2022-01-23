/** @param {import("../.").NS} ns */
export async function main(ns){
    let karmaThreshold = ns.getPlayer().bitNodeN == 2? -9:-54000;
    while(true){
        ns.tail();
        if(ns.getCrimeChance("Homicide") > .5)  ns.commitCrime("Homicide");
        else ns.commitCrime("Mug someone");

        while(ns.isBusy()){await ns.asleep(0)}
        if(ns.getPlayer().strength < 30) continue;
        if(ns.getPlayer().defense < 30) continue;
        if(ns.getPlayer().dexterity < 30) continue;
        if(ns.getPlayer().agility < 30) continue;
        
        if(ns.heart.break() <= karmaThreshold) {
            ns.toast("Karma requirement achieved!");
            let canRunGang = ns.getPlayer().factions.includes("Slum Snakes") || ns.checkFactionInvitations().includes("Slum Snakes");
            while(ns.getServerMaxRam("home") - ns.getServerUsedRam("home") < ns.getScriptRam("/Gang/Manager.js") || !canRunGang){await ns.sleep(1000)}
            ns.run("/Gang/Manager.js");
            break;
        }
        await ns.asleep(0);
        }
}