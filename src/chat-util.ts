/**
 * 字符处理工具类
 *  包装了一些常用的字符处理工具
 */

export function convertThousand(number:string | number) {
    let num = String(number);
    const splitArr = num.split('.');
    let p1 = splitArr[0].length - 1;
    const chatArr = [];
    for (let i = 1; ; i++) {
        const chat = num[p1];
        chatArr.push(chat)
        if (i % 3 === 0) {
            if(num[p1-1] && num[p1-1] !== '-'){
                chatArr.push(',');
            }
        }
        if (p1 === 0) {
            break;
        }
        p1--;
    }
    return splitArr.length > 1 ? chatArr.reverse().join('') + '.' + splitArr[1] : chatArr.reverse().join('');
}
