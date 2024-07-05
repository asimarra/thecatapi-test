import { Server } from "./presentation/server";

(() => {
    main();
})();

async function main() {
    // todo: database connection

    new Server({
        port: process.env.PORT ? +process.env.PORT : 3100
    }).start();
}