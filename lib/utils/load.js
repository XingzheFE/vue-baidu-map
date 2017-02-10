/**
 * Load Baidu Map Function
 * @param key           {{ String }}            required
 * @param version       {{ String || Number }}  required
 * @param callback      {{ String }}            optional
 */
function load( config ) {
    const key = config.key || "i";
    const version = config.version || 2;
    const callback = "vue_baidu_map_initialize_callback_fn";

    if ( window.BMap !== undefined && typeof window.BMap === "object" && typeof window.BMap.Map === "function") {
        if ( process.env.NODE_ENV === "development" ) console.log("[vue-baidu-map] BMap 不能重复加载！");
        return;
    } else {
        window.BMap = undefined;
        if ( process.env.NODE_ENV === "development" ) console.log("[vue-baidu-map] BMap 不存在！")
    }

    if ( !key || !version
    ){
        throw new Error("[vue-baidu-map] 百度地图初始化方法的 key 和 version 参数不能为空！");
    }

    if ( typeof key !== "string" ||
        !(Number( version ) === 1.4 || Number( version ) === 2) ||
        !(typeof callback === "string")
    ){
        throw new Error("[vue-baidu-map] 地图初始化的参数格式不正确，key应为 String， version 为 Number，callbackName 为字符串！");
    }

    let body = document.body;
    let script = document.createElement("SCRIPT");
    let url = "https://api.map.baidu.com/api?v=" + version + "&ak=" + key + "&callback=" + callback;
    script.setAttribute("src", url);
    script.setAttribute("defer", "");
    script.setAttribute("async", "");

    body.appendChild(script);
}

export default load;
