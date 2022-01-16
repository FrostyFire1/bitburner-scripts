/** @param {import("../.").NS} ns */
export async function main(ns){
    let amount = ns.sleeve.getNumSleeves();
    while(true){

        if(ns.getCrimeChance("Homicide") > .5){
            for(let i = 0; i < amount; i++){
                ns.sleeve.setToCommitCrime(i,"Homicide");
            }
            ns.exit()
        }else {
            for(let i = 0; i < amount; i++){
                ns.sleeve.setToCommitCrime(i,"Mug someone");
            }
        }

    await ns.sleep(5000);
    }   
}