import Dexie from 'dexie';

const databaseName = "dimai";
const databaseVersion = 1;

// 初始化数据库
const indexDbData = new Dexie(databaseName);
// 按版本 初始化表和字段
indexDbData.version(databaseVersion).stores({
    ateons: "++id, name, *logotype",
    mycreation: "++id, name, *logotype"

});

/** 添加或更新 一条数据*/
export function putData(object) {
    indexDbData.mycreation.put(object);
}

/** 批量添加或更新数据 */
export function putDatas(array) {
    indexDbData.mycreation.bulkPut(array);
}

/** 删除一条数据 */
export function deleteData(key) {
    indexDbData.mycreation.delete(key);
}

/** 查询一条数据 */
export async function getData(key) {
    return await indexDbData.mycreation.get(key);
}

/** 查询所有数据 */
export async function getDatas(key) {
    return await indexDbData.mycreation.where(key);
}

/** 查询数据个数 */
export async function getCount() {
    return await indexDbData.mycreation.count();
}

/** 清空数据库
 * key:数据库名称
 */
export async function clearDb(key) {
    return await indexDbData[key].clear();
}


export default {
    putData,
    putDatas,
    deleteData,
    getData,
    getDatas,
    getCount,
    clearDb
}