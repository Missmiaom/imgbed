chrome.contextMenus.create({
    title: "Save to Figure Bed",
    id: "parentMenus",
    contexts: ['image']
});

$(document).ready(restore_contextMenus)
function restore_contextMenus() {
    chrome.storage.sync.get({
        groups: []
    }, function() {
        for(group in groups){
            chrome.contextMenus.create({
                title: "分组: " + group,
                parentId: "parentMenus",
                contexts:["image"],
                //onclick: theSecondFunction
              });
        }
    });
    }

