import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({ name: "filecache" });

export const fetchPlugin = (inputCode: string) => {
    return {
        name: "fetch-plugin",
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log("onLoad", args);

                if (args.path === "index.js") {
                return {
                    loader: "jsx",
                    contents: inputCode,
                };
                }
                
                // Check to see if we already have the fetched data in browser storage cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) return cachedResult;

                // If not in cache then fetch it and also store in cache for future!
                const { data, request } = await axios.get(args.path);
                console.log({ data, request });

                // Check if its a css file
                const fileType = args.path.match(/.css$/) ? "css" : "jsx";

                // collapse to single line > escape double quotes > escape single quotes!
                const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
                const contents = fileType === "css" ? 
                    `
                        const style = document.createElement("style");
                        style.innerText = '${escaped}';
                        document.head.appendChild(style);
                    ` : data;

                const result: esbuild.OnLoadResult = {
                    loader: "jsx",
                    contents,
                    resolveDir: new URL("./", request.responseURL).pathname,
                }
                await fileCache.setItem(args.path, result);
                return result;
            });
        }
    }
}