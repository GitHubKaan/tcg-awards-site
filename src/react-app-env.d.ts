/// <reference types="react-scripts" />

declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module "*.png" {
    import React = require("react");
    export const ReactComponent: React.FC<React.PNGProps<PNGPNGElement>>;
    const src: string;
    export default src;
}

declare module "*.jpg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.JPGProps<JPGJPGElement>>;
    const src: string;
    export default src;
}