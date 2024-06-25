// LanguageContext.js

import React, { createContext, useState } from 'react';
const { Proskomma } = require('proskomma-core');

const ProskommaContext = createContext();

const ProskommaProvider = ({ children }) => {
    const [pk, setPk] = useState(new Proskomma([

        {
            name: "source",
            type: "string",
            regex: "^[^\\s]+$",
        },
        {
            name: "project",
            type: "string",
            regex: "^[^\\s]+$",
        },
        {
            name: "revision",
            type: "string",
            regex: "^[^\\s]+$",
        },
    ]));
    function resetProsko(){
        setPk(new Proskomma([
            {
                name: "source",
                type: "string",
                regex: "^[^\\s]+$",
            },
            {
                name: "project",
                type: "string",
                regex: "^[^\\s]+$",
            },
            {
                name: "revision",
                type: "string",
                regex: "^[^\\s]+$",
            },
        ]))}
    
    return (
        <ProskommaContext.Provider value={{ pk, setPk,resetProsko }}>
            {children}
        </ProskommaContext.Provider>
    );
};

export { ProskommaContext, ProskommaProvider };
