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
    let porters = ["BruteSSH.exe","FTPCrack.exe","relaySMTP.exe","HTTPWorm.exe","SQLInject.exe"];
    let count = 0;
    for(const porter of porters) if(ns.fileExists(porter)) count++;
	ns.disableLog("ALL");

    while(true){

        for(const server of getServers(ns).filter(x=>!ns.hasRootAccess(x) && 
        ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(x) &&
        count >= ns.getServerNumPortsRequired(x))){
            rootServer(server)
        }

        let toBackdoor = ["CSEC","avmnite-02h","I.I.I.I","run4theh111z","w0r1d_d43m0n"]
        for(const server of toBackdoor){
            if(ns.hasRootAccess(server) && !ns.getServer(server).backdoorInstalled){
                connectToServer(ns,server);
                await ns.installBackdoor();
                ns.print(`INFO: installed backdoor on ${server}`);
                ns.connect("home");
            }
        } 
        while(ns.getPlayer().money/5 >= ns.getUpgradeHomeRamCost()) ns.upgradeHomeRam();

        let controllers = ["/Sleeve/Manager.js","/Singularity/KarmaFarm.js","/Corporation/Manager.js"].map(x=>{return {
            name:x,
            alreadyRan:false,
        };})
        for(let controller of controllers){
            if(!controller.alreadyRan){
                if(ns.getServerMaxRam("home")-ns.getServerUsedRam("home") > ns.getScriptRam(controller.name)){
                    ns.run(controller.name);
                    controller.alreadyRan = true;
                }
            }
        }



        await ns.sleep(5000);
    }
}