$(document).ready(restore_options)
function restore_options() {
    chrome.storage.sync.get({
        // 默认选项
        ak: null,
        sk: null,
        bucket: null,
        domain: null
    }, function(items) {
        $('#ak').val(items.ak);
        $('#sk').val(items.sk);
        $("#bucket").val(items.bucket);
        $("#domain").val(items.domain);
    });
    }


$('#save-form').submit(function save_options(){
    var ak = $("#ak").val();
    var sk = $("#sk").val();
    var bucket = $("#bucket").val();
    var domain = $("#domain").val();

    chrome.storage.sync.set({
        ak: ak,
        sk: sk,
        bucket: bucket,
        domain: domain
        }, function() {
            console.log('保存成功！');
            window.location = "options.html";
        }
    );
})
