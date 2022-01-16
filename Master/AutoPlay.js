let serverList = [];
/** @param {import("../.").NS} ns */
function connectToServer(ns,target){
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
export async function main(ns){
    connectToServer("The-Cave");
}