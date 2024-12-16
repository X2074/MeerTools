
import JSZip from "jszip";
import { saveAs } from "file-saver";
import axios from "axios";
const files = import.meta.glob("/public/**/*");
export async function downloadAllFiles(replacementName?, replacement?) {
    const zip = new JSZip();
    let filesStructurePbulic = Object.keys(files);
    // 获取文件结构
    const filesChild = filesStructurePbulic.filter((item) => {
        return item.includes("/public/files/project");
    });
    console.log(filesChild, "files");
    // 遍历文件列表，获取文件内容并添加到 zip 中
    const promises = [];
    filesChild.forEach((item) => {
        const promise = getFile(item).then((data: any) => {
            if (item.includes(".txt")) {
                item = item.replace(/\.txt$/, ".ts"); // 使用正则表达式匹配 .txt 后缀
            }
            // 如果存在这个数据，说明要替换.sol文件内容
            if (replacement) {
                if (item.includes("MyToken.sol")) {
                    item = item.replace(/\MyToken$/, replacementName); // 使用正则表达式匹配替换文件名
                    data = replacement; //替换当前文件内容
                }
            }
            item = item.replace("/public/files/project/", "");

            const blob = new Blob([data], { type: "application/json" });
            zip.file(item, blob, { binary: true }); //逐个添加文件
        });
        promises.push(promise);
    });
    Promise.all(promises)
        .then(() => {
            zip.generateAsync({ type: "blob" }).then((content) => {
                saveAs(content, "project.zip");
            });
        })
        .catch((err) => {
            console.log("文件压缩失败");
        });
};

export function getFile(url) {
    return new Promise((resolve, reject) => {
        axios({
            url: url,
            method: "get",
        }).then((res) => {
            resolve(res.data);
        });
    });
};