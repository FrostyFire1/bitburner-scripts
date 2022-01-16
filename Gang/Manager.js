/** @param {import("../.").NS} ns */
export async function main(ns){
    if (ns.getPlayer().factions.includes("Slum Snakes")) ns.gang.createGang("Slum Snakes");
    else if (ns.checkFactionInvitations().includes("Slum Snakes")) {
        ns.joinFaction("Slum Snakes");
        ns.gang.createGang("Slum Snakes");
    } else {
        ns.tprint("Can't form a gang!");
        ns.exit();
    }
    let i = 1;
    while(true){
        while(ns.gang.canRecruitMember()) {
            ns.gang.recruitMember(i);
            i++;
        }
        await ns.sleep(5000);
    }
}
