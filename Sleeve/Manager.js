/** @param {import("../.").NS} ns */
export async function main(ns){
    let amount = ns.sleeve.getNumSleeves();
    while(true){

        if(ns.heart.break() > -54000){
            for(let i = 0; i < amount; i++){
                if(ns.getCrimeChance("Homicide") > .5) ns.sleeve.setToCommitCrime(i,"Homicide");
                else ns.sleeve.setToCommitCrime(i,"Mug someone");
            }
        }

    await ns.sleep(5000);
    }   
}