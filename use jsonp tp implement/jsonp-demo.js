const $ = function (selector) {
    return document.querySelector(selector);
}

const getJsonp = function (url,callbackKeyValue) {
    return new Promise(function (resolve, reject) {
        
        const callback = Object.keys(callbackKeyValue)[0];
        const callbackName = Object.values(callbackKeyValue)[0];

        //implement a function which is named callbackname in global scope to set jsonpdata to a variable called jsonpData.
        window[callbackName] = function (data) {
            window["jsonpData"] = data;
        }

        //create a script node
        const script = document.createElement("script");
        //set attribute src to script in order to visit the src without cross-origin limit
        script.src = `${url}/?${callback}=${callbackName}`;
        //append script node to head element to visit the src and execute
        document.head.appendChild(script);
        script.onload = function () {
            //when script is loaded and executed
            resolve(jsonpData);
            //delete appended script
            script.parentNode.removeChild(script);
            //delete window's prop
            delete window.jsonpData;            
        }
    })
}

window.onload = function () {
    $("#btn").onclick = function () {
        getJsonp("http://localhost:3000", { callback: "callbackHandler" }).then(data=>console.log(data));
    };
}