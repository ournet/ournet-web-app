// import { OurnetProjectName } from "./ournet/app-data";

// export class AppAssets<KEYS extends string> {
//     constructor(private project: OurnetProjectName, private production: boolean) { }

//     getUrl(type: 'css' | 'js', key: KEYS, production?: boolean) {
//         production = production === undefined ? this.production : production;

//         return getAssetUrl(this.project, type, key, production);
//     }
// }

const assets: { [type: string]: { [key: string]: string } } = {};

function getAssetName(project: string, type: 'css' | 'js', key: string) {
    if (!assets[type]) {
        const data = require(`../public/static/${type}/rev-manifest.json`);
        assets[type] = Object.keys(data).reduce<any>((obj, key) => {
            obj[key] = (/\.([a-z0-9-_]+)\./.exec(data[key]) as string[])[1];
            return obj;
        }, {});
    }
    return assets[type][project + '/' + key + '.' + type];
}

export function getAssetUrl(project: string, type: 'css' | 'js', key: string, production: boolean) {
    if (production) {
        const name = getAssetName(project, type, key);

        return `//d1mm9th3p1o4yr.cloudfront.net/ournet/${type}/${project}/${key}.${name}.${type}`;
    }

    return `http://localhost:8080/${type}/${project}/${key}.${type}`;
}

