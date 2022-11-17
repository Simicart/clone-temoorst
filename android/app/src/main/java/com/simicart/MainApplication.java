package com.simicart;

import android.app.Application;

import com.facebook.react.PackageList;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.react.BuildConfig;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.cookies.CookieManagerPackage;
import com.wenkesj.voice.VoicePackage;

import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.simicart.wraper.NativeMethodPackage;

import java.util.List;

import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            packages.add(new RNFirebaseMessagingPackage());
            packages.add(new RNFirebaseNotificationsPackage());
            packages.add(new RNFirebaseAnalyticsPackage());
            packages.add(new NativeMethodPackage());
            return packages;
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(this);
        SoLoader.init(this, /* native exopackage */ false);
    }

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }
}
