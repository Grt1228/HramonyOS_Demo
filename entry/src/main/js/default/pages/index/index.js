// index.js
// abilityType: 0-Ability; 1-Internal Ability
const ABILITY_TYPE_EXTERNAL = 0;
const ABILITY_TYPE_INTERNAL = 1;
// syncOption(Optional, default sync): 0-Sync; 1-Async
const ACTION_SYNC = 0;
const ACTION_ASYNC = 1;
const ACTION_MESSAGE_CODE_PLUS = 1001;

import router from '@system.router';
import fetch from '@system.fetch';

export default {
    data: {
        flag: true,
        date: null,
        time: null,
        emoji: [{
                    "path": "../common/1-1.png",
                    "selectPath": "../common/1.png",
                    "id": 1
                },
                {
                    "path": "../common/2-2.png",
                    "selectPath": "../common/2.png",
                    "id": 2
                },
                {
                    "path": "../common/3-3.png",
                    "selectPath": "../common/3.png",
                    "id": 3
                }
        ],
        imgOne: "https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png",
        imgTwo: "../common/2-2.png",
        imgThree: "../common/3-3.png",
        cartText: 'Add To Cart',
        cartStyle: 'cart-text',
        isCartEmpty: true,
        descriptionFirstParagraph: 'This is the food page including fresh fruit, meat, snack and etc. You can pick whatever you like and add it to your Cart. Your order will arrive within 48 hours. We gurantee that our food is organic and healthy. Feel free to ask our 24h online service to explore more about our platform and products.',
        imageList: ['/common/food_000.JPG', '/common/food_001.JPG', '/common/food_002.JPG', '/common/food_003.JPG'],
    },
    changeFace(index){
        if(index == 1){
            this.imgOne = "../common/1.png";
        }else if(index == 2){
            this.imgTwo = "../common/2.png";
        }else{
            this.imgThree = "../common/3.png";
        }
    },
    changeDate: function(val){
        val.month = val.month +1;
        if (val.month >= 0 && val.month <= 9) {
            val.month = "0" + val.month;
        }
        if (val.day >= 0 && val.day <= 9) {
            val.day = "0" + val.day;
        }
        this.date = val.year + "-" + val.month + "-" + val.day
    },
    changeTime: function(val){
        if (val.minute >= 0 && val.minute <= 9) {
            val.minute = "0" + val.minute;
        }
        if (val.hour >= 0 && val.hour <= 9) {
            val.hour = "0" + val.hour;
        }
        this.time = val.hour + ":" + val.minute
    },
    history: function(){
        router.push ({
            uri: 'pages/detail/detail',
        });
    },
    top: function(){
        router.push ({
            uri: 'pages/top/top',
        });
    },
    submit: function() {
        this.$element('dialog').show()
//        var param = {"phoneLevel":"0"}

//        fetch.fetch({
//            //url: "https://api.vvhan.com/api/ti.ku?ti=题目",
//            url: "https://wjd.jgsu.wiki/portal/phonebook/list.do",
//            //url: "https://jdr.jgsu.wiki/",
//            data: param,
//            method: "POST",
//            header: {"Content-Type": "application/json"},
//            responseType: "json",
//            success(response) {
//                console.log("2222222222222222222222222")
//                console.log("1111111"+JSON.stringify(response))
//            },
//            fail(data, code){
//                console.log("111111111111111111111111")
//                console.log(JSON.stringify(data))
//                console.log(code)
//            }
//        })


    },
    getSum: function () {
        console.log("222222222222222222222222222222")

        var actionData = {};
        actionData.firstNum = 1024;
        actionData.secondNum = 2048;

        var action = {};
        action.bundleName = 'com.huawei.hiaceservice';
        action.abilityName = 'com.huawei.hiaceservice.ComputeInternalAbility';
        action.messageCode = ACTION_MESSAGE_CODE_PLUS;
        action.data = actionData;
        action.abilityType = ABILITY_TYPE_EXTERNAL;
        //action.syncOption = ACTION_SYNC;

        var result = FeatureAbility.callAbility(action);
        //        new Promise(
        //                resolve => {
        //                    resolve(FeatureAbility.callAbility(action))
        //                }
        //        ).then(
        //                res => {
        //                    console.log("this is res!!!!!!!!!!!!!!!!1")
        //                    console.log(res)
        //                }
        //        )
        var ret = JSON.parse(result);
        if (ret.code == 0) {
            console.info('plus result is:' + JSON.stringify(ret.abilityResult));
        } else {
            console.error('plus error code:' + JSON.stringify(ret.code));
        }
    },
    swipeToIndex(index) {
        this.$element('swiperImage').swipeTo({
            index: index
        });
    },
    addCart() {
        console.log("11111111111111111111111111111111111111")
        if (this.isCartEmpty) {
            this.cartText = 'Cart + 1';
            this.cartStyle = 'add-cart-text';
            this.isCartEmpty = false;
        }
        console.log("1111111111111111111" + this.getSum())
    },
    getFocus() {
        if (this.isCartEmpty) {
            this.cartStyle = 'cart-text-focus';
        }
    },
    lostFocus() {
        if (this.isCartEmpty) {
            this.cartStyle = 'cart-text';
        }
    },
    getNowFormatDateTime() {
        var date = new Date();
        var seperatorDate = "-";
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString();
        var strDate = (date.getDate()).toString();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperatorDate + month + seperatorDate + strDate;
        this.date = currentdate;
        var hour = date.getHours().toString();//得到小时
        var minu = date.getMinutes().toString();//得到分钟
        var sec = date.getSeconds();//得到秒
        var seperatorTime = ":"
        if (minu >= 0 && minu <= 9) {
            minu = "0" + minu;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        var currentTime = hour + seperatorTime + minu ;
        this.time = currentTime;
    },

    onInit(){
        console.log("------------------"+this.emoji.toString())
        this.getNowFormatDateTime();
    }
}