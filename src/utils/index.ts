import JSZip from 'jszip'
import FileSaver from 'file-saver'
import axios from "axios";
export function getCookie(cookieName: string) {
    const strCookie = document.cookie
    const cookieList = strCookie.split('; ')
    var cookieValue = 'false';
    for (let i = 0; i < cookieList.length; i++) {
        const arr = cookieList[i].split('=')
        if (cookieName === arr[0]) {
            cookieValue = arr[1];
        }
    }

    return cookieValue;
}

export function setCookie(name, value, minutes) {
    var millisecond = new Date().getTime();
    var expiresTime = new Date(millisecond + 60 * 1000 * minutes);
    document.cookie = name + '=' + value + ';expires=' + expiresTime.toUTCString()
}
// 用户名处理
export function userName(data) {
    if (data.length > 10) {
        return data.slice(0, 5) + '...' + data.slice(-4);
    } else {
        return data;
    }
}

//清除所有cookie函数
export function clearAllCookie() {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            if (keys[i] != "local") {
                setCookie(keys[i], '');
                // document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
            }
        }
    }
}

// 判断是安卓还是ios平台
export function judgePlatform() {
    let ua = window.navigator.userAgent.toLowerCase();
    //mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
    if (ua.match(/(iPhone|iPod|iPad);?/i)) {
        return 'ios';
    } else if (ua.match(/android/i)) {
        return 'android';
    }
}
export function handleDownloadQrIMg(data) {
    // 这里是获取到的图片base64编码,这里只是个例子哈，要自行编码图片替换这里才能测试看到效果
    const imgUrl = data.img_url;
    // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
    if (window.navigator.msSaveOrOpenBlob) {
        const bstr = atob(imgUrl.split(',')[1])
        let n = bstr.length
        const u8arr = new Uint8Array(n)
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
        }
        const blob = new Blob([u8arr])
        window.navigator.msSaveOrOpenBlob(blob, data.img_id + '.' + 'png')
    } else {
        // 这里就按照chrome等新版浏览器来处理
        const a = document.createElement('a')
        a.href = imgUrl
        a.setAttribute('download', data.img_id)
        a.click()
    }
}

// 批量下载
export function handleDownAllIMg(data, name) {
    var zip = new JSZip();
    var img = zip.folder(name);
    for (let i = 0; i < data.length; i++) {
        img.file(data[i].name + (i + 1) + ".png", data[i].file.replace(/^data:image\/(png|jpg);base64,/, ""), { base64: true });
    }
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            FileSaver.saveAs(content, name + ".zip");
        });

}
export function formatNumber(number) {
    if (number >= 1000)
        return (number / 1000).toFixed(1) + 'k';
    return number.toString();
}
// 判断活动是否结束
export function activityOverOrNo() {
    let nowTime = new Date().getTime();
    let overTime = new Date('2024-02-21T12:00:00Z').getTime();
    // 如果没超时就返回true
    if (nowTime < overTime) {
        return true;
    } else {
        return false;
    }
}


export async function waitForWaltConnect(maxRetries = 10, retryDelay = 500) {
    return new Promise((resolve) => {
        // 创建观察者实例,判断最外层的wcm-modal元素是否加载，这个属于钱包链接的预加载
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === "childList") {
                    const hostElement = document.querySelector("wcm-modal");
                    if (hostElement) {
                        // 停止观察
                        observer.disconnect();
                        // 开始检查 shadowRoot
                        checkShadowRoot(hostElement, resolve, 0, maxRetries, retryDelay);
                    }
                }
            });
        });

        // 配置观察选项
        const configDom = { childList: true, subtree: true };
        observer.observe(document.body, configDom);
    });
};
// 判断walltConnect是否加载完成
const checkShadowRoot = async (hostElement, resolve, retryCount, maxRetries, retryDelay) => {
    try {
        const shadowRootDom = hostElement.shadowRoot;
        // 检查 shadowRoot 是否存在
        if (!shadowRootDom) {
            resolve(false);
            return;
        }

        const shadowRootChildDom = shadowRootDom.querySelectorAll(".wcm-card");
        if (shadowRootChildDom.length) {
            resolve(true);
        } else if (retryCount < maxRetries) {
            // 等待一段时间后重试
            setTimeout(() => {
                checkShadowRoot(hostElement, resolve, retryCount + 1, maxRetries, retryDelay);
            }, retryDelay);
        } else {
            resolve(false);
        }
    } catch (error) {
        // 异常处理
        resolve(false);
    }
};