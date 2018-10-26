// import { OurnetProjectName } from "./ournet/app-data";

// export class AppAssets<KEYS extends string> {
//     constructor(private project: OurnetProjectName, private production: boolean) { }

//     getUrl(type: 'css' | 'js', key: KEYS, production?: boolean) {
//         production = production === undefined ? this.production : production;

//         return getAssetUrl(this.project, type, key, production);
//     }
// }

const assets: { [project: string]: { css: { [key: string]: string }, js: { [key: string]: string } } } = {};

function getAssetName(project: string, type: 'css' | 'js', key: string) {
    if (!assets[project]) {
        assets[project] = {
            css: require(`../public/static/css/${project}/rev-manifest.json`),
            js: require(`../public/static/js/${project}/rev-manifest.json`),
        }
    }
    return assets[project][type][key];
}

export function getAssetUrl(project: string, type: 'css' | 'js', key: string, production: boolean) {
    if (production) {
        const name = getAssetName(project, type, key);

        return `//assets.ournetcdn.net/ournet/${type}/${project}/${key}-${name}.${type}`;
    }

    return `http://localhost:8080/${type}/${project}/${key}.${type}`;
}

