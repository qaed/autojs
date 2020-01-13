auto.waitFor()
//进入文章内执行
while(true){
    swipe(device.width / 2, device.height / 4 * 3,
        device.width / 2, device.height / 2, 1000);
    sleep(1000);
    if(id("ach").findOnce()){ //不包含广告
        //log("find-->"+id("ach").findOnce())
        q = id("ach").findOnce().bounds();
        click(q.centerX(), q.centerY());
        sleep(5000);
    }
}
