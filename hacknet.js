import { myMoney, formatMoney } from "_helpers.js"

/** @param {NS} ns **/
export async function main(ns) {
	let sleepTimer = 15000;
	let maxHacknetNodes = 12;
	let maxLevel = 200;
	let maxCores = 16;
	let maxRAM = 64;
	let res = null;

	ns.disableLog("getServerMoneyAvailable");
	ns.disableLog("sleep");
	
	while(ns.hacknet.numNodes() < maxHacknetNodes) {
    	res = ns.hacknet.purchaseNode();
    	ns.print("Purchased Hacknet node with index " + res);
	};
	
	for (var i = 0; i < maxHacknetNodes; i++) {
    	while (ns.hacknet.getNodeStats(i).level < maxLevel) {
	        let cost = ns.hacknet.getLevelUpgradeCost(i, 10);
        	while (myMoney(ns) < cost) {
	            ns.print("Hacknet node #" + i + ": Level " + ns.hacknet.getNodeStats(i).level + " | Need " + formatMoney(cost) + ". Have " + formatMoney(myMoney(ns)));
            	await ns.sleep(sleepTimer);
        	}
        	res = ns.hacknet.upgradeLevel(i, 10);
    	};

		while (ns.hacknet.getNodeStats(i).ram < maxRAM) {
			let cost = ns.hacknet.getRamUpgradeCost(i, 2);
			while (myMoney(ns) < cost) {
				ns.print("Hacknet node #" + i + ": RAM " + ns.hacknet.getNodeStats(i).ram + " | Need " + formatMoney(cost) + ". Have " + formatMoney(myMoney(ns)));
				await ns.sleep(sleepTimer);
			}
			res = ns.hacknet.upgradeRam(i, 2);
		};

		while (ns.hacknet.getNodeStats(i).cores < maxCores) {
			let cost = ns.hacknet.getCoreUpgradeCost(i, 1);
			while (myMoney(ns) < cost) {
				ns.print("Hacknet node #" + i + ": Cores " + ns.hacknet.getNodeStats(i).cores + " | Need " + formatMoney(cost) + ". Have " + formatMoney(myMoney(ns)));
				await ns.sleep(sleepTimer);
			}
			res = ns.hacknet.upgradeCore(i, 1);
		};
	};

	ns.exit()
}
