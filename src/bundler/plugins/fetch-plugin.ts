import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({ name: "filecache" });

export const fetchPlugin = (inputCode: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {

            build.onLoad({ filter: /(^index\.js$)/ } , () => {
                return {
                    loader: "jsx",
                    contents: inputCode,
                };
            });

            // Dummy onLoad to run common code to to following onLoads below and prevent duplication
            // Therefore we use a generic filter so this runs for all cases essentially
            // If anything is returned then NO other onLoads run but if nothing returned then the following onLoads are run
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // Check to see if we already have the fetched data in browser storage cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) return cachedResult;
            });

            build.onLoad({ filter: /.css$/ }, async (args: any) => {

                // If not in cache then fetch it and also store in cache for future!
                const { data, request } = await axios.get(args.path);
                console.log({ data, request });

                // collapse to single line > escape double quotes > escape single quotes!
                const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
                const contents = `
                    const style = document.createElement("style");
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `;

                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents,
                    resolveDir: new URL("./", request.responseURL).pathname,
                }
                await fileCache.setItem(args.path, result);
                return result;
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log("onLoad", args);

                // If not in cache then fetch it and also store in cache for future!
                const { data, request } = await axios.get(args.path);
                console.log({ data, request });

                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents: data,
                    resolveDir: new URL("./", request.responseURL).pathname,
                }
                await fileCache.setItem(args.path, result);
                return result;
            });
        }
    }
}