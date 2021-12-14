package com.ajgarcia.Notea;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
//import com.capacitorjs.plugins.storage.storagePlugin;
//import com.whitestein.securestorage.SecureStoragePlugin;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
//import com.hemangkumar.capacitorgooglemaps.CapacitorGoogleMaps;


public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        //Aqui los puglins oficiales
        registerPlugin(GoogleAuth.class);
        //registerPlugin(CapacitorGoogleMaps.class);

    }
}

