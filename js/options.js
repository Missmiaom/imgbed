var config = {
    host: "jiantuku.com"
};

$(document).ready(restore_options)
$('#min_width').bind('change', minWidthChange);
$('#min_width').bind('input', minWidthChange);
$('#min_height').bind('change', minHeightChange);
$('#min_height').bind('input', minHeightChange);
$('#save-button').click(save_options);

function minWidthChange(){
    var x = $("#min_width").val();
    $("#minWidthValue").html(x);
}

function minHeightChange(){
    var x = $("#min_height").val();
    $("#minHeightValue").html(x);
}

function restore_options() {
chrome.storage.sync.get({
    // 默认选项
    minWidthValue: 400,
    minHeightValue: 200,
    selectall: true,
    hotkey: true,
    ak: null,
    sk: null,
    bucket: null,
    domain: null,
    email: null,
    token: null,
    expires: 0
}, function(items) {
    $('#min_width').val(items.minWidthValue);
    $('#min_height').val(items.minHeightValue);
    $("#minWidthValue").html(items.minWidthValue);
    $("#minHeightValue").html(items.minHeightValue);
    document.getElementById('hotkey').checked = items.hotkey;
    document.getElementById('selectall').checked = items.selectall;
    // 登录状态
    $.get({
        method: "GET",
        url: "http://" + config.host + "/api/user/session",
        headers: {
            Authorization: "Bearer " + items.token
        },
        success:function(){
            $('#not-logined').css('display', 'none');
            $('#logined').css('display', 'block');
            $('#email').html(items.email);
        },
        error:function(){
            $('#not-logined').css('display', "block");
            $('#logined').css('display', "none");
        }
    });
});
}

function save_options(){
    var minWidthValue = $("#min_width").val();
    var minHeightValue = $("#min_height").val();
    var selectall = document.getElementById('selectall').checked;
    var hotkey = document.getElementById('hotkey').checked;
    chrome.storage.sync.set({
        minWidthValue: minWidthValue,
        minHeightValue: minHeightValue,
        selectall: selectall,
        hotkey:hotkey
        }, function() {
        $('#notify').css('display', "block");
        setTimeout(function() {
            $('#notify').css('display', "none");
        }, 1500);
    });
}

var VersionCompare = function (currVer, promoteVer) {
    currVer = currVer || "0.0.0";
    promoteVer = promoteVer || "0.0.0";
    if (currVer == promoteVer) return false;
    var currVerArr = currVer.split(".");
    var promoteVerArr = promoteVer.split(".");
    var len = Math.max(currVerArr.length, promoteVerArr.length);
    for (var i = 0; i < len; i++) {
        var proVal = ~~promoteVerArr[i],
            curVal = ~~currVerArr[i];
        if (proVal < curVal) {
            return false;
        } else if (proVal > curVal) {
            return true;
        }
    }
    return false;
};

var manifestData = chrome.runtime.getManifest();
var currentVersion = manifestData.version;
$('#version-info').html(currentVersion);

$.ajax({
    url:"http://test123.jiantuku.com/version.json",
    method:"GET",
    success:function(data){
        if(VersionCompare(currentVersion, data.latest)){
            var htmlTpl = currentVersion + "&nbsp;&nbsp;<a class='update-notice' href='https://jiantuku.com/#/plugin'>有新版本，点此去更新</a>";
            $('#version-info').html(htmlTpl);
        }
    }
})