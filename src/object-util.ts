/**
 * 深冻结对象 使其不能修改删除元素
 * @param constantConfig
 */
export function freezeDeep(constantConfig: any){
    if(Object.prototype.toString.call(constantConfig) === '[object Object]'){
        Object.freeze(constantConfig);
        for (const key in constantConfig){
            freezeDeep(constantConfig[key])
        }
    }
}
