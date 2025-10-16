
import React from 'react';

const AIGLogo = () => (
    React.createElement('svg', {
        viewBox: "0 0 100 50",
        xmlns: "http://www.w3.org/2000/svg",
        className: "max-h-16 w-auto",
        "aria-label": "AIG Logo"
    },
        React.createElement('rect', {
            width: "100",
            height: "50",
            rx: "5",
            fill: "#004b90"
        }),
        React.createElement('text', {
            x: "50",
            y: "32",
            fontFamily: "Arial, sans-serif",
            fontSize: "24",
            fontWeight: "bold",
            fill: "white",
            textAnchor: "middle",
            letterSpacing: "2"
        }, 'AIG')
    )
);


interface Carrier {
    name: string;
    domain: string | null;
    websiteUrl: string;
    customLogo?: React.ReactNode;
}

export const trusted_carriers: Carrier[] = [
    { name: 'Aflac', domain: 'aflac.com', websiteUrl: 'https://www.aflac.com' },
    { name: 'Americo', domain: 'americo.com', websiteUrl: 'https://www.americo.com' },
    { name: 'American Continental Insurance Co', domain: 'aetna.com', websiteUrl: 'https://www.aetna.com' },
    { name: 'Banner Life', domain: 'lgamerica.com', websiteUrl: 'https://www.lgamerica.com' },
    { name: 'Blue Ridge Ins Co.', domain: 'donegalgroup.com', websiteUrl: 'https://www.donegalgroup.com' },
    { name: 'Bristol West', domain: 'bristolwest.com', websiteUrl: 'https://www.bristolwest.com' },
    { name: 'Combined Insurance', domain: 'combinedinsurance.com', websiteUrl: 'https://www.combinedinsurance.com' },
    { name: 'Corebridge Financial', domain: 'corebridgefinancial.com', websiteUrl: 'https://www.corebridgefinancial.com' },
    { name: 'F&G', domain: 'fglife.com', websiteUrl: 'https://www.fglife.com' },
    { name: 'Foremost', domain: 'foremost.com', websiteUrl: 'https://www.foremost.com' },
    { name: 'Geico', domain: 'geico.com', websiteUrl: 'https://www.geico.com' },
    { name: 'Gerber Life', domain: 'gerberlife.com', websiteUrl: 'https://www.gerberlife.com' },
    { name: 'Great American Insurance Group', domain: 'greatamericaninsurancegroup.com', websiteUrl: 'https://www.greatamericaninsurancegroup.com' },
    { name: 'The Hartford', domain: 'thehartford.com', websiteUrl: 'https://www.thehartford.com' },
    { name: 'Illinois Mutual', domain: 'illinoismutual.com', websiteUrl: 'https://www.illinoismutual.com' },
    { name: 'John Hancock', domain: 'johnhancock.com', websiteUrl: 'https://www.johnhancock.com' },
    { name: 'Protective Life', domain: 'protective.com', websiteUrl: 'https://www.protective.com' },
    { name: 'Liberty Bankers Life', domain: 'lbig.com', websiteUrl: 'https://www.lbig.com' },
    { name: 'Lincoln Financial', domain: 'lfg.com', websiteUrl: 'https://www.lfg.com' },
    { name: 'National Life Group', domain: 'nationallife.com', websiteUrl: 'https://www.nationallife.com' },
    { name: 'New York Life', domain: 'newyorklife.com', websiteUrl: 'https://www.newyorklife.com' },
    { name: 'Next Insurance', domain: 'nextinsurance.com', websiteUrl: 'https://www.nextinsurance.com' },
    { name: 'Prudential', domain: 'prudential.com', websiteUrl: 'https://www.prudential.com' },
    { name: 'Root Insurance', domain: 'joinroot.com', websiteUrl: 'https://www.joinroot.com' },
    { name: 'Symetra', domain: 'symetra.com', websiteUrl: 'https://www.symetra.com' },
    { name: 'Transamerica', domain: 'transamerica.com', websiteUrl: 'https://www.transamerica.com' },
    { name: 'AIG', domain: null, websiteUrl: 'https://www.aig.com', customLogo: React.createElement(AIGLogo) },
    { name: 'Allianz', domain: 'allianz.com', websiteUrl: 'https://www.allianz.com' },
    { name: 'Ameritas Life', domain: 'ameritas.com', websiteUrl: 'https://www.ameritas.com' },
    { name: 'Foresters Financial', domain: 'foresters.com', websiteUrl: 'https://www.foresters.com' },
    { name: 'Kansas City Life', domain: 'kclife.com', websiteUrl: 'https://www.kclife.com' },
    { name: 'Mutual of Omaha', domain: 'mutualofomaha.com', websiteUrl: 'https://www.mutualofomaha.com' },
].sort((a, b) => a.name.localeCompare(b.name));
