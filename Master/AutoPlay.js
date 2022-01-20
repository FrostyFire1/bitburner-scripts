import { getServers, rootServer } from "../utils/servers";

let serverList = [];
let originalTarget = ""
/** @param {import("../.").NS} ns */
function connectToServer(ns,target){
	if(originalTarget == "") {
		originalTarget = target;
		serverList.push(target);
	}
	const servers = ['home'];
	if(target == "home") {
		delete serverList[serverList.length-1];
		ns.print(serverList);
        ns.connect("home")
		serverList.reverse().forEach(server => {
			ns.connect(server)
		})
		serverList = [];
		
		return 1;
	}
	for(const server of servers){
		let serverScan = ns.scan(server);
		if(serverScan.includes(target)) {
			serverList.push(server);
			connectToServer(ns,server);
		} else{
		ns.scan(server)
			.filter(x => !servers.includes(x) && x.slice(0,6)!="Server")
			.forEach(x => servers.push(x));
		}
	}
}

/** @param {import("../.").NS} ns */
export async function main(ns){
    ns.disableLog("ALL");

    let porters = [
    {name:"BruteSSH.exe", cost:5e5},
    {name:"FTPCrack.exe",cost:1.5e6},
    {name:"relaySMTP.exe",cost:5e6},
    {name:"HTTPWorm.exe",cost:3e7},
    {name:"SQLInject.exe",cost:2.5e8}];
	let controllers = [
    "/Contracts/Solver.js",
    "/Sleeve/Manager.js",
    "/Singularity/AugmentInstall",
    "/Singularity/KarmaFarm.js",
    "/Corporation/Manager.js"].map(x=>{return {
        name:x,
        alreadyRan:false,
    };})
    let toBackdoor = ["CSEC","avmnite-02h","I.I.I.I","run4theh111z","w0r1d_d43m0n"]
    while(true){

        
        let count = 0;
        for(const porter of porters) if(ns.fileExists(porter.name)) count++;
        //Try to buy TOR
        if(ns.getPlayer().money > 2e5 && !ns.getPlayer().tor) ns.purchaseTor();
        //If TOR is bought then try to buy darkweb programs
        if(ns.getPlayer().tor) {
            for(const porter of porters) {
                //Check if you can buy program with 50% of current money
                if(!ns.fileExists(porter.name)&&ns.getPlayer().money/2 >= porter.cost) {
                    ns.purchaseProgram(porter.name);
                    ns.tprintf(`SUCCESS: Purchased ${porter.name}`);
                }
            }
        }
        //Nuke every server you can
        let nukable = getServers(ns)
        .filter(x=>!ns.hasRootAccess(x) && 
        ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(x) && 
        count >= ns.getServerNumPortsRequired(x))
        for(const server of nukable){
            rootServer(server)
        }
        
        //backdoor the important servers either to get into the faction  or to end the game
        for(const server of toBackdoor){
            if(ns.hasRootAccess(server) && !ns.getServer(server).backdoorInstalled){
                connectToServer(ns,server);
                await ns.installBackdoor();
                ns.tprintf(`INFO: installed backdoor on ${server}`);
                ns.connect("home");
            }
        } 
        //Spend 20% of current money to upgrade ram
        while(ns.getPlayer().money/5 >= ns.getUpgradeHomeRamCost()) ns.upgradeHomeRam();

        //Activate controllers if enough ram is available
        for(let controller of controllers){
            if(controller.alreadyRan) continue;
            if(ns.getServerMaxRam("home")-ns.getServerUsedRam("home") >= ns.getScriptRam(controller.name)){
                ns.run(controller.name);
                ns.tprintf(`INFO: Running ${controller.name}`)
                controller.alreadyRan = true;
            }
            
        }
        await ns.sleep(5000);
    }
}