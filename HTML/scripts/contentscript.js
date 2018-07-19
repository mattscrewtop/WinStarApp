chrome.runtime.sendMessage({
        method: 'POST',
        action: 'xhttp',
        url: 'http://dev.mobile-patron.solutiaconsulting.com/api/login/authenticate',
        data: "{""UserName"":""Screwtop5"",""Password"":""Password!19""}"
    }, function(reponseText) {
        alert(responseText);
    }); 