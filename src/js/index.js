window.onload = function(){
    // get url from param and insert into iframe
    const url = getUrlParam('url');
    if (url){
        loadIframe(url);
    } else {
        $('#blank-state').css('display', 'flex');
    }

    // watch for enter in the input
    var input = document.getElementById("url-search");
    input.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // trigger the button submit
        submit();
      }
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
        }
    return urlparameter;
}

function insertParam(key, value){
    key = encodeURI(key); value = encodeURI(value);
    var kvp = document.location.search.substr(1).split('&');
    var i=kvp.length; var x; while(i--){
        x = kvp[i].split('=');

        if (x[0]==key)
        {
            x[1] = value;
            kvp[i] = x.join('=');
            break;
        }
    }
    if(i<0) {kvp[kvp.length] = [key,value].join('=');}

    //this will reload the page, it's likely better to store this until finished
    var url = kvp.join('&');
    url = url.replace("&", "?");  // replace first '&' with '?'
    document.location.search = url; 
}

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

function submit(){
    url = document.getElementById('url-search').value;
    if (url){
        insertParam('url', url);
    } else {
        // autofocus on the url field if we don't have a url
        var input = document.getElementById("url-search");
        input.focus();
    }
}

// function canAccessIFrame(iframe) {
//     if (navigator.userAgent.indexOf("MSIE") > -1 && !window.opera) {
//       iframe.onreadystatechange = function(){
//         if (iframe.readyState == "complete"){
//           alert("Iframe is now loaded.");
//         }
//       };
//     } else {
//       iframe.onload = function(){
//         alert("Iframe is now loaded.");
//       };
//     }
// }

function afterLoading(){
    console.log('iframe loaded');
    $('#iframe-window').css('display', 'block');    

    // const iframe = document.getElementById('iframe-window');
}   

function loadIframe(url){
    if (!url){
        url = document.getElementById('url-search').value;
    }
    if (url){
        document.getElementById('url-search').value = url;

        if (!validURL(url)){
            var input = document.getElementById("url-search");
            // input.classList.add("error");
            $('#error-message').css('display', 'flex');
            document.getElementById("error-text").textContent="'" + url + "' is not a valid url";
            input.focus();
            // return;
        } else {
            document.getElementById('iframe-window').src = url;
            $('#iframe-window').css('display', 'none');
            $('#blank-state').css('display', 'none');
            $('#loading-state').css('display', 'flex');
            $('#iframe-window').load(function(){
                afterLoading()
            });
        }
        
    } else {
        $('#iframe-window').css('display', 'none');
        $('#blank-state').css('display', 'flex');
        $('#loading-display').css('display', 'none');
    }
}
