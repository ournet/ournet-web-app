import * as React from 'react';
import { getAssetUrl } from '../../../assets';
import { OurnetProjectName } from '../../../ournet/data';
import env from '../../../env';


export default function GalleryResources() {
    const project = OurnetProjectName.NEWS;

    return [
        <script key='gr-1' async={true} src={getAssetUrl(project, 'js', 'gallery', env.isProduction)} />,
        <link key='gr-2' type="text/css" rel="stylesheet" href={getAssetUrl(project, 'css', 'gallery', env.isProduction)} />,
    ];
}