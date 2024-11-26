
export const cancleEvent = () => {

    if (document.documentURI.includes('http://localhost:3000/') || document.documentURI.includes('https://test1.dimai.io/')) return;
    window.onkeydown = window.onkeyup = window.onkeypress = function (event: any) {
        // 判断是否按下F12，F12键码为123  
        if (event.keyCode == 123) {
            event.preventDefault() // 阻止默认事件行为  
            return false;
        }
    }
    window.oncontextmenu = function (event: any) {
        event.preventDefault() // 阻止默认事件行为  
        return false
    }
    //   let threshold = 160 // 打开控制台的宽或高阈值  
    window.setInterval(function () {
        check();
        if (window.console && window.console.firebug) {
            // 如果打开控制台，则刷新页面 
            window.location.reload()
        }
    }, 2000)
}
export const check = () => {
    if (document.documentURI.includes('http://localhost:3000/') || document.documentURI.includes('http://127.0.0.1:5173/')) return;
    function doCheck(a: any) {
        if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
            (function () { }
            ["constructor"]("debugger")())
        } else {
            (function () { }
            ["constructor"]("debugger")())
        }
        doCheck(++a)
    }
    try {
        doCheck(0)
    } catch (err) { }
};
