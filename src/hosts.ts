import env from "./env";
import { OurnetProjectName } from "./ournet/data";

export type HostInfo = {
    project: OurnetProjectName
    country: string
}

const hosts: { [host: string]: HostInfo } = require('../data/hosts.json');

// export function getHostsByProject(project: string) {
//     return Object.keys(hosts).reduce<HostInfo[]>((list, host) => {
//         if (hosts[host].project === project) {
//             list.push(hosts[host]);
//         }
//         return list;
//     }, []);
// }

export function getHostInfo(host: string): HostInfo {
    const data = hosts[host];
    if (data) {
        return data;
    }
    if (!env.COUNTRY || !env.PROJECT) {
        throw new Error(`DEFAULT_COUNTRY & DEFAULT_PROJECT required!`)
    }

    return {
        project: env.PROJECT as OurnetProjectName,
        country: env.COUNTRY,
    }
}
