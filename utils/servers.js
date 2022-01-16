/** @param {import("../.").NS} ns */
export function getServers(ns) {
    const servers = ['home'];
    for (const server of servers){
        ns.scan(server)
            .filter(x => !servers.includes(x) && x.slice(0,6)!="Server")
            .forEach(x => servers.push(x));
    }
    servers.shift();
    return servers;
}
/** @param {import("../.").NS} ns */
export function rootServer(ns,server){
    
    if (ns.fileExists("BruteSSH.exe")) ns.brutessh(server);
    if (ns.fileExists("FTPCrack.exe")) ns.ftpcrack(server);
    if (ns.fileExists("relaySMTP.exe")) ns.relaysmtp(server);
    if (ns.fileExists("HTTPWorm.exe")) ns.httpworm(server);
    if (ns.fileExists("SQLInject.exe")) ns.sqlinject(server);
    ns.nuke(server);
}