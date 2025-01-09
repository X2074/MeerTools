import JSZip from 'jszip'
import FileSaver from 'file-saver'

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