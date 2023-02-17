import path from "path";
import fs from "fs";

export type FileStructure = {
    name: string;
    type: "folder" | "file";
    isOpen?: boolean;
    fileLocation: string;
    children?: FileStructure[];
};
async function walk(root: FileStructure): Promise<FileStructure> {
    console.log("walking", root.fileLocation);
    const dirs = await fs.promises.opendir(root.fileLocation);
    // sort all the folders up to the top
    const awaitedDirs = [];
    for await (const d of dirs) {
        awaitedDirs.push(d);
    }
    awaitedDirs.sort((a, b) => {
        if (!a.isFile() && b.isFile()) return -1;
        if (a.isFile() && !b.isFile()) return 1;
        // if they are the same sort alphabetically
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    });
    // and parse them
    for (const d of awaitedDirs) {
        if (d.isDirectory()) {
            if (d.name === "node_modules") continue;
            if (d.name === ".next") continue;
            console.log("walking deeper...");
            const entry: FileStructure = {
                name: d.name,
                type: "file",
                children: [],
                isOpen: false,
                fileLocation: path.join(root.fileLocation, d.name),
            };

            const walkedEntry = await walk(entry);
            root.children?.push(walkedEntry);
        } else if (d.isFile()) {
            if (d.name === ".env") continue;
            if (d.name === ".env.local") continue;
            if (d.name === ".DS_Store") continue;

            const entry: FileStructure = {
                name: d.name,
                type: "file",

                fileLocation: path.join(root.fileLocation, d.name),
            };

            console.log("adding file", entry.name);
            root.children?.push(entry);
        }
    }
    return root;
}

export const mapFiles = async (): Promise<FileStructure> => {
    const dirLevel: FileStructure = {
        name: "USE-MILLER",
        type: "folder",
        isOpen: true,
        fileLocation: path.join(__dirname, "../../../../.."),
        children: [],
    };
    const final = await walk(dirLevel);

    // sort so all directories are first
    final.children?.sort((a, b) => {
        if (a.type === "folder" && b.type === "file") return -1;
        if (a.type === "file" && b.type === "folder") return 1;
        return 0;
    });
    return final;
};
