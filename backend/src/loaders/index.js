import initExpress from "./express";
import initSetup from "./setup";
export default async function({ app }) {
    // initialize all the app level components here such as express, mongoose connection etc.
    await initSetup();
    initExpress({ app });
}