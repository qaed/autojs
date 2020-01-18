auto.waitFor()
//进入文章内执行
/**
 * 文章：90金，大约阅读30分钟，逐渐降低至40金
 * 视频：80金
 * 小视频：一开始就只有20金，考虑任务5圈100金，也只有40金
 */

while (true) {
    //关闭首页的开启推送通知
    var ig = id("ig").findOnce();
    if(ig){
        ig.click();
    }
    //下滑
    doSwipe();
    //允许的情况下,进入下一篇文章
    nextArticle();
    //处理翻倍金币
    execDdoubleCoin();
    //网页错误。有时会出现网络错误，页面打不开
    //TODO

    //金币累计器没出现
    if(!id("aca").findOnce() && isArticlePage()){//同层还有2个id：pv,qh外层id是ado
        toastLog("金币累加器没出现")
        back();
        sleep(1000);
        doFastSwipe();
    }
    

}
//下滑
function doSwipe(){
    swipe(device.width / 2, device.height / 4 * 3,
        device.width / 2, device.height / 2, 1500);
    sleep(500);
}
function doFastSwipe(){//快速下滑
    swipe(device.width / 2, device.height / 8 * 7,
        device.width / 2, device.height / 8, 1500);
    sleep(200);
}
//允许的情况下,进入下一篇文章
function nextArticle(){
    if (id("ach").findOnce()) {//拿到的是正常文章列表，不包含广告
        //log("find-->"+id("ach").findOnce())
        q = id("ach").findOnce().bounds();
        click(q.centerX(), q.centerY());
        sleep(2000);
    }
}
//处理翻倍金币
function execDdoubleCoin(){
    doubleCoin = textContains("金币翻倍").findOnce()//立即领取>
    if (doubleCoin) {
        doubleCoin.click();
        // getCoin = textContains("立即领取").findOnce()
        // if(getCoin){
        //     getCoin.click()
        // }
    }
}
function isArticlePage(){//文章页
    return  currentActivity() == "com.songheng.eastfirst.business.newsdetail.view.activity.NewsDetailHardwareActivity";
}
function isArticlePage(){//视频页
    return  currentActivity() == "com.songheng.eastfirst.business.video.view.activity.VideoDetailActivity";
}
function isArticlePage(){//小视频页 
    return  currentActivity() == "com.songheng.eastfirst.business.xiaoshiping.videodetail.view.activity.DouYinVideoActivity";
}
//在视频页，看下一个视频
function nextVideo(){
    var gz = id("gz").findOnce();
    if(gz){//一般都是有的
        var q = gz.bounds();
        click(q.centerX(),q.centerY());
    }else{
        doSwipe();
        nextVideo();
    }
     
}