import * as fs from "fs";
import * as mkdirp from "mkdirp";

export class FileManagerService {
  static createFile(path: string, filename: string, content: string) {
    // create path if not exist
    mkdirp.sync(path);
    try {
      fs.writeFileSync(path + filename, content, "utf8");
    } catch (err) {
      console.log("error writing template:" + err.message);
    }
  }

  static removeFileFromPath(path: string): string {
    const result = /((\/\w+)|(^\w+))\.\w{2,}$/.exec(path);
    if (result) {
      return path.substring(0, path.lastIndexOf("/"));
    }

    return path;
  }
}
