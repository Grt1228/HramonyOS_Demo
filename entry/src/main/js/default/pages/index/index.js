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
        cartText: 'Add To Cart',
        cartStyle: 'cart-text',
        isCartEmpty: true,
        descriptionFirstParagraph: 'This is the food page including fresh fruit, meat, snack and etc. You can pick whatever you like and add it to your Cart. Your order will arrive within 48 hours. We gurantee that our food is organic and healthy. Feel free to ask our 24h online service to explore more about our platform and products.',
        imageList: ['/common/food_000.JPG', '/common/food_001.JPG', '/common/food_002.JPG', '/common/food_003.JPG'],
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

//        router.push ({
//            uri: 'pages/detail/detail',
//        });
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
    onInit(){
        this.date = new Date().;
        this.time = new Date();
    }
}