document.getElementById('collect_image').addEventListener('click', function(e){
    chrome.runtime.sendMessage({type:'collect'});
    window.close();
});

document.getElementById('manage_group').addEventListener('click', function(e){
    window.location = "group.html";
});

document.getElementById('visit_site').addEventListener('click', function(e){
    chrome.tabs.create({url:"https://leiyiming.com/"});
    window.close();
});