/** @param {import("../.").NS} ns */
export async function main(ns){
   //Check if can get red pill. If yes install immediately
    if(ns.checkFactionInvitations().includes("Daedalus")) ns.joinFaction("Daedalus");
    if(ns.getPlayer().factions.includes("Daedalus")){
        if(ns.getFactionRep("Daedalus") >= 2.5e6 && !ns.getOwnedAugmentations().includes("The Red Pill")) {
            ns.tprintf(`WARNING: INSTALLING THE RED PILL`);
            ns.purchaseAugmentation("Daedalus","The Red Pill");
            ns.installAugmentations("/Master/AutoPlay.js");
        }
    }
}