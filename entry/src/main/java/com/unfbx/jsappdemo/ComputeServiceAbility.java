package com.unfbx.jsappdemo;

import com.unfbx.jsappdemo.pojo.RequestParam;
import ohos.aafwk.ability.Ability;
import ohos.aafwk.content.Intent;
import ohos.rpc.IRemoteBroker;
import ohos.rpc.IRemoteObject;
import ohos.rpc.RemoteObject;
import ohos.rpc.MessageParcel;
import ohos.rpc.MessageOption;
import ohos.utils.zson.ZSONObject;

import java.util.HashMap;
import java.util.Map;

public class ComputeServiceAbility extends Ability {
    private static final String TAG = "ComputeServiceAbility";
    private MyRemote remote = new MyRemote();
    // FA在请求PA服务时会调用AbilityconnectAbility连接PA，连接成功后，需要在onConnect返回一个remote对象，供FA向PA发送消息
    @Override
    protected IRemoteObject onConnect(Intent intent) {
        super.onConnect(intent);
        return remote.asObject();
    }
    class MyRemote extends RemoteObject implements IRemoteBroker {
        private static final int ERROR = -1;
        private static final int SUCCESS = 0;
        private static final int PLUS = 1001;

        MyRemote() {
            super("MyService_MyRemote");
        }

        @Override
        public boolean onRemoteRequest(int code, MessageParcel data, MessageParcel reply, MessageOption option) {
            switch (code) {
                case PLUS: {
                    String zsonStr = data.readString();
                    RequestParam param = ZSONObject.stringToClass(zsonStr, RequestParam.class);

                    // 返回结果仅支持可序列化的Object类型
                    Map<String, Object> zsonResult = new HashMap<String, Object>();
                    zsonResult.put("code", SUCCESS);
                    zsonResult.put("abilityResult", param.getFirstNum() + param.getSecondNum());
                    reply.writeString(ZSONObject.toZSONString(zsonResult));
                    break;
                }
                default: {
                    reply.writeString("service not defined");
                    return false;
                }
            }
            return true;
        }

        @Override
        public IRemoteObject asObject() {
            return this;
        }
    }
}