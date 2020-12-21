package com.unfbx.jsappdemo;

import ohos.aafwk.content.Intent;
import ohos.ace.ability.AceAbility;

public class HiAceInternalAbility extends AceAbility {

    @Override
    public void onStart(Intent intent) {
        // 注册, 如果需要在Page初始化(onInit或之前)时调用AceInternalAbility的能力，注册操作需要在super.onStart之前进行
        ComputeInternalAbility.register(this);
        //...
        super.onStart(intent);
    }

    @Override
    public void onStop() {
        // 去注册
        ComputeInternalAbility.deregister();
        super.onStop();
    }
}
