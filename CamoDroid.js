var logArguments=true;
var logReturnValue=true;

var returnValueTag="Returning value=== ";
var cloakMethodEnterTag="\nCloaking Method=== "

function concatArguments(argumentsPassed)
{
    var result="";
    for (var j = 0; j < argumentsPassed.length; j++) {
        result+=("arg[" + j + "]: " + argumentsPassed[j]+"\n");
    }
    return result;
}

function concatReturn(str,res)
{
    var result=str;
    result+="Result is: "+res+"\n";
    return result;
}

function printReturnValue(retValue)
{
    console.log(returnValueTag+retValue);
}

function printCloakMethodEnter(classAndMethodName)
{
    console.log(cloakMethodEnterTag+classAndMethodName);
}

function superPrint(methodAndClassName, type, retval, isCloackedMethod, methodArgs)
{
    var result="";
    if(isCloackedMethod)
    {
        result+="---(Cloacked!) ";
    }
    else
    {
        result+="+++ ";
    }

    result+="Entering "+type+" method=== "+methodAndClassName+"\n";

    for (var i=0;i<methodArgs.length;i++)
    {
        result+=("arg[" + i + "]: " + methodArgs[i]+"\n");
    }

    result+="Return value=== "+retval+"\n";
    return result;
}


function createArgumentsLikeObject(...args)
{
    var argumentsLikeJavascriptObject= {
        length: arguments.length,
        splice: function () {}
    }
    for (var i=0;i<argumentsLikeJavascriptObject.length;i++)
    {
        argumentsLikeJavascriptObject[i]=arguments[i];
    }
    return argumentsLikeJavascriptObject;
}

/*****************************************************************************/
///////                   Defining Variables                     //////////////
/*****************************************************************************/
var dangerousJavaAPIs=[
    "android.accounts.AccountAuthenticatorActivity.clearWallpaper",
    "android.accounts.AccountAuthenticatorActivity.removeStickyBroadcast",
    "android.accounts.AccountAuthenticatorActivity.removeStickyBroadcastAsUser",
    "android.accounts.AccountAuthenticatorActivity.setWallpaper",
    "android.accounts.AccountAuthenticatorActivity.stopService",
    "android.accounts.AccountAuthenticatorActivity.unbindService",
    "android.app.Activity.clearWallpaper",
    "android.app.Activity.removeStickyBroadcast",
    "android.app.Activity.removeStickyBroadcastAsUser",
    "android.app.Activity.setWallpaper",
    "android.app.Activity.stopLockTask",
    "android.app.Activity.stopService",
    "android.app.Activity.unbindService",
    "android.app.ActivityGroup.clearWallpaper",
    "android.app.ActivityGroup.removeStickyBroadcast",
    "android.app.ActivityGroup.removeStickyBroadcastAsUser",
    "android.app.ActivityGroup.setWallpaper",
    "android.app.ActivityGroup.stopService",
    "android.app.ActivityGroup.unbindService",
    "android.app.ActivityManager.getRecentTasks",
    "android.app.ActivityManager.getRunningAppProcesses",
    "android.app.ActivityManager.getRunningTasks",
    "android.app.ActivityManager.killBackgroundProcesses",
    "android.app.ActivityManager.moveTaskToFront",
    "android.app.ActivityManager.restartPackage",
    "android.app.admin.DevicePolicyManager.getWifiMacAddress",
    "android.app.AliasActivity.clearWallpaper",
    "android.app.AliasActivity.removeStickyBroadcast",
    "android.app.AliasActivity.removeStickyBroadcastAsUser",
    "android.app.AliasActivity.setWallpaper",
    "android.app.AliasActivity.stopService",
    "android.app.AliasActivity.unbindService",
    "android.app.Application.clearWallpaper",
    "android.app.Application.removeStickyBroadcast",
    "android.app.Application.removeStickyBroadcastAsUser",
    "android.app.Application.setWallpaper",
    "android.app.Application.stopService",
    "android.app.Application.unbindService",
    "android.app.backup.BackupAgentHelper.clearWallpaper",
    "android.app.backup.BackupAgentHelper.removeStickyBroadcast",
    "android.app.backup.BackupAgentHelper.removeStickyBroadcastAsUser",
    "android.app.backup.BackupAgentHelper.setWallpaper",
    "android.app.backup.BackupAgentHelper.stopService",
    "android.app.backup.BackupAgentHelper.unbindService",
    "android.app.backup.BackupManager.dataChanged",
    "android.app.ExpandableListActivity.clearWallpaper",
    "android.app.ExpandableListActivity.removeStickyBroadcast",
    "android.app.ExpandableListActivity.removeStickyBroadcastAsUser",
    "android.app.ExpandableListActivity.setWallpaper",
    "android.app.ExpandableListActivity.stopService",
    "android.app.ExpandableListActivity.unbindService",
    "android.app.JobSchedulerImpl.schedule",
    "android.app.KeyguardManager$KeyguardLock.disableKeyguard",
    "android.app.KeyguardManager$KeyguardLock.reenableKeyguard",
    "android.app.KeyguardManager.exitKeyguardSecurely",
    "android.app.ListActivity.clearWallpaper",
    "android.app.ListActivity.removeStickyBroadcast",
    "android.app.ListActivity.removeStickyBroadcastAsUser",
    "android.app.ListActivity.setWallpaper",
    "android.app.ListActivity.stopService",
    "android.app.ListActivity.unbindService",
    "android.app.NativeActivity.clearWallpaper",
    "android.app.NativeActivity.removeStickyBroadcast",
    "android.app.NativeActivity.removeStickyBroadcastAsUser",
    "android.app.NativeActivity.setWallpaper",
    "android.app.NativeActivity.stopService",
    "android.app.NativeActivity.unbindService",
    "android.app.Service.stopSelf",
    "android.app.Service.stopSelfResult",
    "android.app.TabActivity.clearWallpaper",
    "android.app.TabActivity.removeStickyBroadcast",
    "android.app.TabActivity.removeStickyBroadcastAsUser",
    "android.app.TabActivity.setWallpaper",
    "android.app.TabActivity.stopService",
    "android.app.TabActivity.unbindService",
    "android.app.WallpaperManager.clear",
    "android.app.WallpaperManager.setBitmap",
    "android.app.WallpaperManager.setResource",
    "android.app.WallpaperManager.setStream",
    "android.app.WallpaperManager.suggestDesiredDimensions",
    "android.bluetooth.BluetoothA2dp.getConnectedDevices",
    "android.bluetooth.BluetoothA2dp.getConnectionState",
    "android.bluetooth.BluetoothA2dp.getDevicesMatchingConnectionStates",
    "android.bluetooth.BluetoothA2dp.isA2dpPlaying",
    "android.bluetooth.BluetoothAdapter.cancelDiscovery",
    "android.bluetooth.BluetoothAdapter.closeProfileProxy",
    "android.bluetooth.BluetoothAdapter.disable",
    "android.bluetooth.BluetoothAdapter.enable",
    "android.bluetooth.BluetoothAdapter.getAddress",
    "android.bluetooth.BluetoothAdapter.getBluetoothLeAdvertiser",
    "android.bluetooth.BluetoothAdapter.getBluetoothLeScanner",
    "android.bluetooth.BluetoothAdapter.getBondedDevices",
    "android.bluetooth.BluetoothAdapter.getName",
    "android.bluetooth.BluetoothAdapter.getProfileConnectionState",
    "android.bluetooth.BluetoothAdapter.getProfileProxy",
    "android.bluetooth.BluetoothAdapter.getScanMode",
    "android.bluetooth.BluetoothAdapter.getState",
    "android.bluetooth.BluetoothAdapter.isDiscovering",
    "android.bluetooth.BluetoothAdapter.isEnabled",
    "android.bluetooth.BluetoothAdapter.isMultipleAdvertisementSupported",
    "android.bluetooth.BluetoothAdapter.isOffloadedFilteringSupported",
    "android.bluetooth.BluetoothAdapter.isOffloadedScanBatchingSupported",
    "android.bluetooth.BluetoothAdapter.listenUsingInsecureRfcommWithServiceRecord",
    "android.bluetooth.BluetoothAdapter.listenUsingRfcommWithServiceRecord",
    "android.bluetooth.BluetoothAdapter.setName",
    "android.bluetooth.BluetoothAdapter.startDiscovery",
    "android.bluetooth.BluetoothAdapter.startLeScan",
    "android.bluetooth.BluetoothAdapter.stopLeScan",
    "android.bluetooth.BluetoothDevice.connectGatt",
    "android.bluetooth.BluetoothDevice.createBond",
    "android.bluetooth.BluetoothDevice.createInsecureRfcommSocketToServiceRecord",
    "android.bluetooth.BluetoothDevice.createRfcommSocketToServiceRecord",
    "android.bluetooth.BluetoothDevice.fetchUuidsWithSdp",
    "android.bluetooth.BluetoothDevice.getBluetoothClass",
    "android.bluetooth.BluetoothDevice.getBondState",
    "android.bluetooth.BluetoothDevice.getName",
    "android.bluetooth.BluetoothDevice.getType",
    "android.bluetooth.BluetoothDevice.getUuids",
    "android.bluetooth.BluetoothDevice.setPin",
    "android.bluetooth.BluetoothGatt.abortReliableWrite",
    "android.bluetooth.BluetoothGatt.beginReliableWrite",
    "android.bluetooth.BluetoothGatt.close",
    "android.bluetooth.BluetoothGatt.connect",
    "android.bluetooth.BluetoothGatt.disconnect",
    "android.bluetooth.BluetoothGatt.discoverServices",
    "android.bluetooth.BluetoothGatt.executeReliableWrite",
    "android.bluetooth.BluetoothGatt.readCharacteristic",
    "android.bluetooth.BluetoothGatt.readDescriptor",
    "android.bluetooth.BluetoothGatt.readRemoteRssi",
    "android.bluetooth.BluetoothGatt.requestConnectionPriority",
    "android.bluetooth.BluetoothGatt.requestMtu",
    "android.bluetooth.BluetoothGatt.setCharacteristicNotification",
    "android.bluetooth.BluetoothGatt.writeCharacteristic",
    "android.bluetooth.BluetoothGatt.writeDescriptor",
    "android.bluetooth.BluetoothGattServer.addService",
    "android.bluetooth.BluetoothGattServer.cancelConnection",
    "android.bluetooth.BluetoothGattServer.clearServices",
    "android.bluetooth.BluetoothGattServer.close",
    "android.bluetooth.BluetoothGattServer.connect",
    "android.bluetooth.BluetoothGattServer.notifyCharacteristicChanged",
    "android.bluetooth.BluetoothGattServer.removeService",
    "android.bluetooth.BluetoothGattServer.sendResponse",
    "android.bluetooth.BluetoothHeadset.getConnectedDevices",
    "android.bluetooth.BluetoothHeadset.getConnectionState",
    "android.bluetooth.BluetoothHeadset.getDevicesMatchingConnectionStates",
    "android.bluetooth.BluetoothHeadset.isAudioConnected",
    "android.bluetooth.BluetoothHeadset.sendVendorSpecificResultCode",
    "android.bluetooth.BluetoothHeadset.startVoiceRecognition",
    "android.bluetooth.BluetoothHeadset.stopVoiceRecognition",
    "android.bluetooth.BluetoothHealth.connectChannelToSource",
    "android.bluetooth.BluetoothHealth.disconnectChannel",
    "android.bluetooth.BluetoothHealth.getConnectedDevices",
    "android.bluetooth.BluetoothHealth.getConnectionState",
    "android.bluetooth.BluetoothHealth.getDevicesMatchingConnectionStates",
    "android.bluetooth.BluetoothHealth.getMainChannelFd",
    "android.bluetooth.BluetoothHealth.registerSinkAppConfiguration",
    "android.bluetooth.BluetoothHealth.unregisterAppConfiguration",
    "android.bluetooth.BluetoothManager.getConnectedDevices",
    "android.bluetooth.BluetoothManager.getConnectionState",
    "android.bluetooth.BluetoothManager.getDevicesMatchingConnectionStates",
    "android.bluetooth.BluetoothManager.openGattServer",
    "android.bluetooth.BluetoothSocket.connect",
    "android.bluetooth.le.BluetoothLeAdvertiser.startAdvertising",
    "android.bluetooth.le.BluetoothLeAdvertiser.stopAdvertising",
    "android.bluetooth.le.BluetoothLeScanner.flushPendingScanResults",
    "android.bluetooth.le.BluetoothLeScanner.startScan",
    "android.bluetooth.le.BluetoothLeScanner.stopScan",
    "android.content.ContextWrapper.clearWallpaper",
    "android.content.ContextWrapper.removeStickyBroadcast",
    "android.content.ContextWrapper.removeStickyBroadcastAsUser",
    "android.content.ContextWrapper.setWallpaper",
    "android.content.ContextWrapper.stopService",
    "android.content.ContextWrapper.unbindService",
    "android.content.MutableContextWrapper.clearWallpaper",
    "android.content.MutableContextWrapper.removeStickyBroadcast",
    "android.content.MutableContextWrapper.removeStickyBroadcastAsUser",
    "android.content.MutableContextWrapper.setWallpaper",
    "android.content.MutableContextWrapper.stopService",
    "android.content.MutableContextWrapper.unbindService",
    "android.hardware.ConsumerIrManager.getCarrierFrequencies",
    "android.hardware.ConsumerIrManager.transmit",
    "android.hardware.fingerprint.FingerprintManager.authenticate",
    "android.hardware.fingerprint.FingerprintManager.hasEnrolledFingerprints",
    "android.hardware.fingerprint.FingerprintManager.isHardwareDetected",
    "android.inputmethodservice.InputMethodService.clearWallpaper",
    "android.inputmethodservice.InputMethodService.removeStickyBroadcast",
    "android.inputmethodservice.InputMethodService.removeStickyBroadcastAsUser",
    "android.inputmethodservice.InputMethodService.setWallpaper",
    "android.inputmethodservice.InputMethodService.stopService",
    "android.inputmethodservice.InputMethodService.unbindService",
    "android.location.LocationManager.addGpsStatusListener",
    "android.location.LocationManager.addNmeaListener",
    "android.location.LocationManager.addProximityAlert",
    "android.location.LocationManager.getBestProvider",
    "android.location.LocationManager.getLastKnownLocation",
    "android.location.LocationManager.getProvider",
    "android.location.LocationManager.getProviders",
    "android.location.LocationManager.registerGnssStatusCallback",
    "android.location.LocationManager.removeUpdates",
    "android.location.LocationManager.requestLocationUpdates",
    "android.location.LocationManager.requestSingleUpdate",
    "android.location.LocationManager.sendExtraCommand",
    "android.media.AsyncPlayer.play",
    "android.media.AsyncPlayer.stop",
    "android.media.AudioManager.adjustStreamVolume",
    "android.media.AudioManager.setBluetoothScoOn",
    "android.media.AudioManager.setMicrophoneMute",
    "android.media.AudioManager.setMode",
    "android.media.AudioManager.setSpeakerphoneOn",
    "android.media.AudioManager.setStreamMute",
    "android.media.AudioManager.setStreamVolume",
    "android.media.AudioManager.startBluetoothSco",
    "android.media.AudioManager.stopBluetoothSco",
    "android.media.browse.MediaBrowser.disconnect",
    "android.media.MediaPlayer.pause",
    "android.media.MediaPlayer.release",
    "android.media.MediaPlayer.reset",
    "android.media.MediaPlayer.setWakeMode",
    "android.media.MediaPlayer.start",
    "android.media.MediaPlayer.stop",
    "android.media.MediaRouter$RouteGroup.requestSetVolume",
    "android.media.MediaRouter$RouteGroup.requestUpdateVolume",
    "android.media.MediaRouter$RouteInfo.requestSetVolume",
    "android.media.MediaRouter$RouteInfo.requestUpdateVolume",
    "android.media.MediaScannerConnection.disconnect",
    "android.media.Ringtone.play",
    "android.media.Ringtone.setAudioAttributes",
    "android.media.Ringtone.setStreamType",
    "android.media.Ringtone.stop",
    "android.media.RingtoneManager.getRingtone",
    "android.media.RingtoneManager.stopPreviousRingtone",
    "android.net.ConnectivityManager.getActiveNetwork",
    "android.net.ConnectivityManager.getActiveNetworkInfo",
    "android.net.ConnectivityManager.getAllNetworkInfo",
    "android.net.ConnectivityManager.getAllNetworks",
    "android.net.ConnectivityManager.getLinkProperties",
    "android.net.ConnectivityManager.getNetworkCapabilities",
    "android.net.ConnectivityManager.getNetworkInfo",
    "android.net.ConnectivityManager.getRestrictBackgroundStatus",
    "android.net.ConnectivityManager.isActiveNetworkMetered",
    "android.net.ConnectivityManager.registerDefaultNetworkCallback",
    "android.net.ConnectivityManager.registerNetworkCallback",
    "android.net.ConnectivityManager.reportBadNetwork",
    "android.net.ConnectivityManager.reportNetworkConnectivity",
    "android.net.ConnectivityManager.requestBandwidthUpdate",
    "android.net.ConnectivityManager.requestNetwork",
    "android.net.ConnectivityManager.requestRouteToHost",
    "android.net.ConnectivityManager.startUsingNetworkFeature",
    "android.net.sip.SipAudioCall.close",
    "android.net.sip.SipAudioCall.endCall",
    "android.net.sip.SipAudioCall.setSpeakerMode",
    "android.net.sip.SipAudioCall.startAudio",
    "android.net.sip.SipManager.close",
    "android.net.sip.SipManager.createSipSession",
    "android.net.sip.SipManager.getSessionFor",
    "android.net.sip.SipManager.isOpened",
    "android.net.sip.SipManager.isRegistered",
    "android.net.sip.SipManager.makeAudioCall",
    "android.net.sip.SipManager.open",
    "android.net.sip.SipManager.register",
    "android.net.sip.SipManager.setRegistrationListener",
    "android.net.sip.SipManager.takeAudioCall",
    "android.net.sip.SipManager.unregister",
    "android.net.VpnService.clearWallpaper",
    "android.net.VpnService.onRevoke",
    "android.net.VpnService.removeStickyBroadcast",
    "android.net.VpnService.removeStickyBroadcastAsUser",
    "android.net.VpnService.setWallpaper",
    "android.net.VpnService.stopService",
    "android.net.VpnService.unbindService",
    "android.net.wifi.p2p.WifiP2pManager.initialize",
    "android.net.wifi.WifiManager$MulticastLock.acquire",
    "android.net.wifi.WifiManager$MulticastLock.release",
    "android.net.wifi.WifiManager$WifiLock.acquire",
    "android.net.wifi.WifiManager$WifiLock.release",
    "android.net.wifi.WifiManager.addNetwork",
    "android.net.wifi.WifiManager.cancelWps",
    "android.net.wifi.WifiManager.disableNetwork",
    "android.net.wifi.WifiManager.disconnect",
    "android.net.wifi.WifiManager.enableNetwork",
    "android.net.wifi.WifiManager.getConfiguredNetworks",
    "android.net.wifi.WifiManager.getConnectionInfo",
    "android.net.wifi.WifiManager.getDhcpInfo",
    "android.net.wifi.WifiManager.getScanResults",
    "android.net.wifi.WifiManager.getWifiState",
    "android.net.wifi.WifiManager.is5GHzBandSupported",
    "android.net.wifi.WifiManager.isDeviceToApRttSupported",
    "android.net.wifi.WifiManager.isEnhancedPowerReportingSupported",
    "android.net.wifi.WifiManager.isP2pSupported",
    "android.net.wifi.WifiManager.isPreferredNetworkOffloadSupported",
    "android.net.wifi.WifiManager.isScanAlwaysAvailable",
    "android.net.wifi.WifiManager.isTdlsSupported",
    "android.net.wifi.WifiManager.isWifiEnabled",
    "android.net.wifi.WifiManager.pingSupplicant",
    "android.net.wifi.WifiManager.reassociate",
    "android.net.wifi.WifiManager.reconnect",
    "android.net.wifi.WifiManager.removeNetwork",
    "android.net.wifi.WifiManager.saveConfiguration",
    "android.net.wifi.WifiManager.setWifiEnabled",
    "android.net.wifi.WifiManager.startScan",
    "android.net.wifi.WifiManager.startWps",
    "android.net.wifi.WifiManager.updateNetwork",
    "android.os.PowerManager$WakeLock.acquire",
    "android.os.PowerManager$WakeLock.release",
    "android.os.PowerManager$WakeLock.setWorkSource",
    "android.os.SystemVibrator.cancel",
    "android.os.SystemVibrator.vibrate",
    "android.security.KeyChain.getCertificateChain",
    "android.security.KeyChain.getPrivateKey",
    "android.service.dreams.DreamService.clearWallpaper",
    "android.service.dreams.DreamService.dispatchGenericMotionEvent",
    "android.service.dreams.DreamService.dispatchKeyEvent",
    "android.service.dreams.DreamService.dispatchKeyShortcutEvent",
    "android.service.dreams.DreamService.dispatchTouchEvent",
    "android.service.dreams.DreamService.dispatchTrackballEvent",
    "android.service.dreams.DreamService.finish",
    "android.service.dreams.DreamService.onWakeUp",
    "android.service.dreams.DreamService.removeStickyBroadcast",
    "android.service.dreams.DreamService.removeStickyBroadcastAsUser",
    "android.service.dreams.DreamService.setWallpaper",
    "android.service.dreams.DreamService.stopService",
    "android.service.dreams.DreamService.unbindService",
    "android.service.dreams.DreamService.wakeUp",
    "android.service.quicksettings.TileService.clearWallpaper",
    "android.service.quicksettings.TileService.removeStickyBroadcast",
    "android.service.quicksettings.TileService.removeStickyBroadcastAsUser",
    "android.service.quicksettings.TileService.setWallpaper",
    "android.service.quicksettings.TileService.stopService",
    "android.service.quicksettings.TileService.unbindService",
    "android.service.voice.VoiceInteractionService.clearWallpaper",
    "android.service.voice.VoiceInteractionService.removeStickyBroadcast",
    "android.service.voice.VoiceInteractionService.removeStickyBroadcastAsUser",
    "android.service.voice.VoiceInteractionService.setWallpaper",
    "android.service.voice.VoiceInteractionService.stopService",
    "android.service.voice.VoiceInteractionService.unbindService",
    "android.speech.SpeechRecognizer.destroy",
    "android.speech.tts.TextToSpeech.getAvailableLanguages",
    "android.speech.tts.TextToSpeech.getDefaultLanguage",
    "android.speech.tts.TextToSpeech.getDefaultVoice",
    "android.speech.tts.TextToSpeech.getFeatures",
    "android.speech.tts.TextToSpeech.getLanguage",
    "android.speech.tts.TextToSpeech.getVoice",
    "android.speech.tts.TextToSpeech.getVoices",
    "android.speech.tts.TextToSpeech.isLanguageAvailable",
    "android.speech.tts.TextToSpeech.isSpeaking",
    "android.speech.tts.TextToSpeech.playEarcon",
    "android.speech.tts.TextToSpeech.playSilence",
    "android.speech.tts.TextToSpeech.playSilentUtterance",
    "android.speech.tts.TextToSpeech.setLanguage",
    "android.speech.tts.TextToSpeech.setVoice",
    "android.speech.tts.TextToSpeech.shutdown",
    "android.speech.tts.TextToSpeech.speak",
    "android.speech.tts.TextToSpeech.stop",
    "android.speech.tts.TextToSpeech.synthesizeToFile",
    "android.telephony.gsm.SmsManager.divideMessage",
    "android.telephony.gsm.SmsManager.sendDataMessage",
    "android.telephony.gsm.SmsManager.sendMultipartTextMessage",
    "android.telephony.gsm.SmsManager.sendTextMessage",
    "android.telephony.PhoneNumberUtils.isVoiceMailNumber",
    "android.telephony.SmsManager.divideMessage",
    "android.telephony.SmsManager.downloadMultimediaMessage",
    "android.telephony.SmsManager.injectSmsPdu",
    "android.telephony.SmsManager.sendDataMessage",
    "android.telephony.SmsManager.sendMultimediaMessage",
    "android.telephony.SmsManager.sendMultipartTextMessage",
    "android.telephony.SmsManager.sendTextMessage",
    "android.telephony.TelephonyManager.getAllCellInfo",
    "android.telephony.TelephonyManager.getCellLocation",
    "android.telephony.TelephonyManager.getDeviceId",
    "android.telephony.TelephonyManager.getGroupIdLevel1",
    "android.telephony.TelephonyManager.getIccAuthentication",
    "android.telephony.TelephonyManager.getLine1Number",
    "android.telephony.TelephonyManager.getNeighboringCellInfo",
    "android.telephony.TelephonyManager.getPhoneCount",
    "android.telephony.TelephonyManager.getSimSerialNumber",
    "android.telephony.TelephonyManager.getSimState",
    "android.telephony.TelephonyManager.getSubscriberId",
    "android.telephony.TelephonyManager.getVoiceMailAlphaTag",
    "android.telephony.TelephonyManager.getVoiceMailNumber",
    "android.telephony.TelephonyManager.listen",
    "android.view.ContextThemeWrapper.clearWallpaper",
    "android.view.ContextThemeWrapper.removeStickyBroadcast",
    "android.view.ContextThemeWrapper.removeStickyBroadcastAsUser",
    "android.view.ContextThemeWrapper.setWallpaper",
    "android.view.ContextThemeWrapper.stopService",
    "android.view.ContextThemeWrapper.unbindService",
    "android.view.inputmethod.InputMethodManager.showInputMethodAndSubtypeEnabler",
    "android.widget.VideoView.getAudioSessionId",
    "android.widget.VideoView.onKeyDown",
    "android.widget.VideoView.pause",
    "android.widget.VideoView.resume",
    "android.widget.VideoView.setVideoPath",
    "android.widget.VideoView.setVideoURI",
    "android.widget.VideoView.start",
    "android.widget.VideoView.stopPlayback",
    "android.widget.VideoView.suspend",
/*
    "android.test.IsolatedContext.clearWallpaper",
    "android.test.IsolatedContext.removeStickyBroadcast",
    "android.test.IsolatedContext.removeStickyBroadcastAsUser",
    "android.test.IsolatedContext.setWallpaper",
    "android.test.IsolatedContext.stopService",
    "android.test.IsolatedContext.unbindService",
    "android.test.mock.MockApplication.clearWallpaper",
    "android.test.mock.MockApplication.removeStickyBroadcast",
    "android.test.mock.MockApplication.removeStickyBroadcastAsUser",
    "android.test.mock.MockApplication.setWallpaper",
    "android.test.mock.MockApplication.stopService",
    "android.test.mock.MockApplication.unbindService",
    "android.test.RenamingDelegatingContext.clearWallpaper",
    "android.test.RenamingDelegatingContext.removeStickyBroadcast",
    "android.test.RenamingDelegatingContext.removeStickyBroadcastAsUser",
    "android.test.RenamingDelegatingContext.setWallpaper",
    "android.test.RenamingDelegatingContext.stopService",
    "android.test.RenamingDelegatingContext.unbindService",
*/
    //"java.io.File.$init",
    "android.telephony.TelephonyManager.getNetworkOperatorName",
    "android.telephony.TelephonyManager.getSimOperator",
    "android.telephony.TelephonyManager.getImei",
    "java.lang.Runtime.exec",

    //"com.android.system.admin.COcCccl.oCIlCll"
    //"com.security.cert.a.a.a.a",
    //"com.b.a.a.a.a"
    //"com.google.android.v54new.network.HttpConnection.postEncrypt"
    
];

var dangerousNativeAPIs=[   "/system/lib/libc.so:fopen",
                            "/system/lib/libc.so:__system_property_get"
                            
                        ];


var cloackedCommands={"which,su":"which,s","getprop":"which s"}

/*****************************************************************************/
///////                     Monitoring Java APIs                 //////////////
/*****************************************************************************/
function monitorDangerousJavaAPIs()
{
    for (let i=0;i<dangerousJavaAPIs.length;i++)
    {
        hookJavaAPIAndItsOverloads(dangerousJavaAPIs[i]);
    }
}

function hookJavaAPIAndItsOverloads(JavaAPIName)
{
    var className=JavaAPIName.substring(0,(JavaAPIName.lastIndexOf(".")));
    var methodName=JavaAPIName.substring(JavaAPIName.lastIndexOf(".")+1);

    var classHanle=Java.use(className);
    var methodHandle=classHanle[methodName];

    for (let i=0;i<methodHandle.overloads.length;i++)
    {
        methodHandle.overloads[i].implementation = function() 
        {
            var retval = this[methodName].apply(this, arguments);
            console.log(superPrint(JavaAPIName+"["+i+"]","Java API",retval,false,arguments));
            return retval;
        };
    }

}



/*****************************************************************************/
///////          Monitoring Invoke Calls Using Reflection        //////////////
/*****************************************************************************/
function monitorJavaReflectionMethodInvokes()
{
    var classHanle=Java.use("java.lang.reflect.Method");
    var methodHandle=classHanle["invoke"];

    methodHandle.overloads[0].implementation=function()
    {
        // Entered mehtod
        var methodAndClassName= this.getDeclaringClass()+"."+this.getName();
        methodAndClassName=methodAndClassName.replace("class ","");
        

        var retval = this["invoke"].apply(this, arguments);
        console.log(superPrint(methodAndClassName,"Java Reflection",retval,false,arguments));
        return retval;
            
    };
}


/*****************************************************************************/
///////    TO DO                  Monitoring Native calls        //////////////
/*****************************************************************************/
function monitorNativeDangerousMethods()
{
    for (let i=0;i<dangerousNativeAPIs.length;i++)
    {
        hookNativeAPIAndItsOverloads(dangerousNativeAPIs[i]);
    }
}

function hookNativeAPIAndItsOverloads(nativeAPIName)
{
    var library=nativeAPIName.substring(0,nativeAPIName.lastIndexOf(":"));;
    var functionName=nativeAPIName.substring(nativeAPIName.lastIndexOf(":")+1);

    Interceptor.attach(Module.findExportByName(library, functionName), 
    {
        onEnter: function(args) 
        {       
    
        //console.log("\n+++  Dangerous Native API Called=== "+nativeAPIName);
        //console.log("ArgCoun="+args[10]);

        // I could not log the arguments of native methods as the type and number of arguments passed to args is not known for C. In other words, for one function args may contain one int, for another one it may contain 5 strings. Type and number of arguments for args is not specefied in it I think. 
        
        // print backtrace
        //console.log("\nBacktrace:\n" + Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress).join("\n"));
        },

        onLeave: function(retval) 
        {
            console.log(superPrint(library+":"+functionName,"Native API",retval,false,[]));
            //logReturnValue(retval);
            /*
            if (this.flag) {
                // print retval
                console.log("\nretval: " + retval);
                console.warn("\n*** exiting open");
            }
            */
        }
    });
}


/*****************************************************************************/
///////                    Cloaking Emulator                     //////////////
/*****************************************************************************/

function getRandom()
{
	return Math.random();
}


////*************************         Debugging functions are defined here           ********************/////////////////
function show(obj)
{
	for (const [key, value] of Object.entries(obj)) 
	{
		console.log("\n======================================================");
		console.log("Key is: "+key+ "\nValue is: "+ value + "\n");
	}
}


function showOverloads(className,methodName)
{
	Java.perform(function(){Java.use(className)[methodName].overload()});
	
}

function showFridaToast(text) 
{ 
    let context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

    Java.scheduleOnMainThread(function() {
            var toast = Java.use("android.widget.Toast");
            toast.makeText(Java.use("android.app.ActivityThread").currentApplication().getApplicationContext(), Java.use("java.lang.String").$new(text), 1).show();
    });

};

////*************************         Global Variables are defined here           ********************/////////////////

let sensorTriggerInterval=500;

let android_os_SystemProperties = 
{
	"qemu.hw.mainkeys": "",
	"ro.build.description" : "starqltecs-user 10 QP1A.190711.020 G960WVLS7ETH1 release-keys",
	"net.eth0.dns1" : "",
	"rild.libpath" : "/vendor/lib64/libsec-ril.so",
	"ro.radio.use-ppp" : "",
	"gsm.version.baseband" : "",
	"ro.build.display.id" :"QP1A.190711.020.G960WVLS7ETH1",
	"init.svc.console" : "",
	//"ro.kernel.qemu" : "",
	"ro.product.model": "SM-G960W",

	//
	"ro.kernel.qemu":"0",
	"ro.secure":"1",
    "ro.debuggable":"0",
    //
    "ro.build.fingerprint" : "samsung/starqltecs/starqltecs:10/QP1A.190711.020/G960WVLS7ETH1:user/release-keys",
    "ro.product.manufacturer":"Samsung Inc",
    "ro.product.brand":"Samsung",
    "ro.product.name":"SM-G960W",
    "ro.hardware":"qcom",
    "ro.product.board":"sdm845",
    "no.such.thing":"2321412255",
    "ro.build.tags":"release-keys",
    "ro.build.type":"user",
    "ro.build.user":"USER",
    "ro.build.host":"SWDH2812"
};

function overideByIndex(className, methodName, overloadIndex, resolver) 
{
    let handle = Java.use(className);
    //console.log("Method "+className+"."+methodName+" has "+ handle[methodName].overloads.length+" overloads!");
    let methodHandle = handle[methodName].overloads[overloadIndex];
    methodHandle.implementation = function(...parameters) 
    {
        //console.log("OLD IS:"+this[methodName].apply(this, arguments)); 
        //console.log(className, methodName, handle[methodName].overloads.map(i=>i.length));
        return resolver.call(this, ...parameters);
    };
}

function overideByOverload(className, methodName, functionArgTypes, resolver) 
{
    let handle = Java.use(className);
    //console.log("Method "+className+"."+methodName+" has "+ handle[methodName].overloads.length+" overloads!");
    let methodHandle = handle[methodName].overload(...functionArgTypes);
    methodHandle.implementation = function(...parameters) {
        //console.log(className, methodName, handle[methodName].overloads.map(i=>i.length));
        return resolver.call(this, ...parameters);
    };
}


function CloakEmulator()
{
    // Defining Override Function to use Later for Overriding cerain Functions

	

	
//****************************************************************		Overriding Functions		****************************************************************//

//*********************************		Morpheus		******************************************//
	overideByIndex('java.io.File', '$init', 1 , function(pathString) 
	{
        
		//console.log("java.io.File.$init[1] was called with "+ pathString);
		let map = {
			// morphues
			"/proc/misc": "/proc/sys/net/ipv4/tcp_syncookies",
			"/proc/ioports" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/proc/uid_stat" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/sys/devices/virtual/misc/cpu_dma_latency/uevent" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/sys/devices/virtual/ppp" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/sys/devices/virtual/switch" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/sys/module/alarm/parameters" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/sys/devices/system/cpu/cpu0/cpufreq" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/sys/devices/virtual/misc/android_adb" : "/proc/sys/net/ipv4/tcp_syncookies",
			"/proc/sys/net/ipv4/tcp_syncookies" : "data/NullFile"
		
		};
        var retval;
		if ( pathString in map )
		{
			retval=this.$init(map[pathString]);
            superPrint("java.io.File.$init","Java API",retval,true,pathString);
		}
		else
		{
			retval=this.$init(pathString);
            superPrint("java.io.File.$init","Java API",retval,false,pathString);
		}
        //logReturnValue(retval);
        return retval;
	});


//**************************       A large-scale study on the adoption of anti-debugging and anti-tampering protections in android apps **************************//
	//hasEmulatorTelephonyProperty()
	overideByIndex('android.telephony.TelephonyManager', 'getDeviceId', 0 , function() {var retval='333650816387732'; console.log(superPrint('android.telephony.TelephonyManager.getDeviceId',"Java API",retval,true,[])); return retval; }  );
	overideByIndex('android.telephony.TelephonyManager', 'getNetworkOperatorName', 0 , function() {var retval='TELUS INC'; console.log(superPrint('android.telephony.TelephonyManager.getNetworkOperatorName',"Java API",retval,true,[])); return retval; }  );
    overideByIndex('android.telephony.TelephonyManager', 'getSimOperator', 0 , function() {var retval='TELUS INC'; console.log(superPrint('android.telephony.TelephonyManager.getSimOperator',"Java API",retval,true,[])); return retval; }  );
    overideByIndex('android.telephony.TelephonyManager', 'getLine1Number', 0 , function() {var retval='3334567656'; console.log(superPrint('android.telephony.TelephonyManager.getLine1Number',"Java API",retval,true,[])); return retval; }  );
    overideByIndex('android.telephony.TelephonyManager', 'getSubscriberId', 0 , function() {var retval='5424643325'; console.log(superPrint('android.telephony.TelephonyManager.getSubscriberId',"Java API",retval,true,[])); return retval; }  );
    overideByIndex('android.telephony.TelephonyManager', 'getVoiceMailNumber', 0 , function() {var retval='3334567656'; console.log(superPrint('android.telephony.TelephonyManager.getVoiceMailNumber',"Java API",retval,true,[])); return retval; }  );
    overideByIndex('android.telephony.TelephonyManager', 'getImei', 0 , function() {var retval='333650816387732'; console.log(superPrint('android.telephony.TelephonyManager.getImei',"Java API",retval,true,[])); return retval; }  );
    //overideByIndex('android.telephony.TelephonyManager', 'getImsi', 0 , function() {var retval='333650816387732'; console.log(superPrint('android.telephony.TelephonyManager.getImsi',"Java API",retval,true,[])); return retval; }  );


    //hasEmulatorBuildProp()
    console.warn("\nCloaking BuildProp..");
	Java.use("android.os.Build")['FINGERPRINT'].value="GalaxyS9/release-keys";
	Java.use("android.os.Build")['MODEL'].value="GalaxyS9";
	Java.use("android.os.Build")['MANUFACTURER'].value="Samsung Inc";
	Java.use("android.os.Build")['BRAND'].value="Samsung";
	Java.use("android.os.Build")['PRODUCT'].value="SM-G960W";
	Java.use("android.os.Build")['HARDWARE'].value="qcom";
	Java.use("android.os.Build")['BOARD'].value="sdm845";
	Java.use("android.os.Build")['SERIAL'].value="2321412255";
	Java.use("android.os.Build")['TAGS'].value="release-keys";
	Java.use("android.os.Build")['USER'].value="USER";
	Java.use("android.os.Build")['HOST'].value="SWDH2812";

    Java.use("android.os.Build")['MODEL'].implementation=function(){}
    
    /*
    var CloackedBuildProps={
        'FINGERPRINT':'GalaxyS9/release-keys',
        'MODEL':"GalaxyS9",
        'MANUFACTURER':"Samsung Inc",
        'BRAND':"Samsung",
        'PRODUCT':"SM-G960W",
        'HARDWARE':"qcom",
        'BOARD':"sdm845",
        'SERIAL':"2321412255",
        'TAGS':"release-keys",
        'USER':"USER",
        'HOST':"SWDH2812"
    }    // Obada TBD
    
    overideByIndex('android.os.SystemProperties', 'get', 0 , function(input) 
    {
        var property=input[0]
        console.log("ENTERING AAA android.os.Build.getString");
        var retval;
        if(CloackedBuildProps[property]!=null)
        {
            retval=CloackedBuildProps[property];
            console.log(superPrint('android.os.Build.getString',"Java API",retval,true,property));
        }
        else
        {
            retval=this.get(input);
            console.log(superPrint('android.os.Build.getString',"Java API",retval,false,property));
        }
        return retval;
    }  );
	
*/

//*****************************************************			 Bypassing Native Code		*******************************************/
	
	Interceptor.attach(Module.findExportByName( "libc.so" , "__system_property_get" ), 
	{
		onEnter: function ( args ) 
		{
            //printCloakMethodEnter("libc.so:__system_property_get");
             
			// reading the input argument and saving it in _name variable in the same instance
			this._name = args[0].readCString();
			//console.log(this._name)
            // savinng the pointer to return value into _value in the same instance
			this._value = args[1];
			//console.log("Native function libc.so__system_property_get was called with "+ this._name);
			//console.log("Argument is: "+this._name);
		},
		onLeave: function ( result ) 
		{	
			// checking if the property is in the monitored properties
			if (this._name in android_os_SystemProperties)
			{
				// geting the fake return value 
				let fakeValue= android_os_SystemProperties[this._name];
				// writing the fake value into the pointer to the second argument 
				Memory.writeUtf8String(this._value,fakeValue);

                console.log(superPrint("libc.so:__system_property_get","Native API",fakeValue,true,createArgumentsLikeObject(this._name)));
			}
            else
            {
                console.log(superPrint("libc.so:__system_property_get","Native API",this._value,false,createArgumentsLikeObject(this._name)));
            }
		}
	});


//*****************************************************			 Comperhensive list of techniques and dataset		*******************************************/





//*****************************************************			 Rootbeer		*******************************************/
	// File sys checks in Java
	Java.use('java.io.File')['$init'].overload('java.lang.String','java.lang.String').implementation= function(path,fileName) 
	{
        
		let pathString=path+fileName;
		//console.log(pathString)
		let map = 
		{
			// Rootbeer
			"/system/xbin/busybox" : "/system/xbin/busybo",
			"/system/bin/su": "/system/bin/s",
			"/system/xbin/su": "/system/bin/s"
			
		};
        var retval;
		if (map[pathString]!=null)
		{
			retval=this.$init("/system/bin/","suasaa"); 
            superPrint("java.io.File.$init(java.lang.String,java.lang.String)","Java API",retval,true,["/system/bin/","suasaa"]); 
		}
        else
        {
            retval=this.$init(path,fileName);
            superPrint("java.io.File.$init(java.lang.String,java.lang.String)","Java API",retval,false,[path,fileName]); 
        }
        
        //logReturnValue(retval);
		return retval; 
	};
	
	// File sys checks in C
	Interceptor.attach(Module.findExportByName( "libc.so" , "fopen" ), 
	{
        
		onEnter: function ( args ) 
		{
            //printCloakMethodEnter("libc.so:fopen");
            //console.log("Argument is: "+args[0].readCString());
            //this._aa=1;

			var prop = Memory.readCString(args[ 0 ]);
			//console.log("libc.so  fopen was called with "+ prop + "   !!!!!!!!!");
			let map = 
			{
				"/data/local/su" : "/system/bin/s",
				"/data/local/bin/su": "/system/bin/s",
				"/data/local/xbin/su": "/system/bin/s",
				"/sbin/su": "/system/bin/s",
				"/su/bin/su": "/system/bin/s",
				"/system/bin/su": "/system/bin/s",
				"/system/bin/.ext/su": "/system/bin/s",
				"/system/bin/failsafe/su": "/system/bin/s",
				"/system/sd/xbin/su": "/system/bin/s",
				"/system/usr/we-need-root/su": "/system/bin/s",
				"/system/xbin/su": "/system/bin/s",
				"/data/su": "/system/bin/s",
				"/dev/su": "/system/bin/s",
				"/system/sbin/su": "/system/bin/s",
				"/vendor/bin/su": "/system/bin/s",
				"/vendor/xbin/su": "/system/bin/s",
				"/data/local/su": "/system/bin/s",
				"/system/xbin/busybox" : "/system/bin/s",
				"/system/xbin/su": "/system/bin/s"
			};
			//console.log("prop is"+prop);
            /*
            var argumentsLikeJavascriptObject= {
                length: 1,
                splice: function () {}
            }
            argumentsLikeJavascriptObject[0]=prop;
            */
            
        
            if (map[prop]!=null) 
			{
                var fakeValue=map[prop];
                Memory.writeUtf8String(args[0],fakeValue );
                console.log(superPrint("libc.so:fopen","Native API","File *",true,createArgumentsLikeObject(prop)));
			}
            else
            {
                console.log(superPrint("libc.so:fopen","Native API","File *",false,createArgumentsLikeObject(prop)));
            }
            
		},
        
		onLeave: function ( retval ) 
        {
            
        }
	});

     //To do if I decide to manipulate Runtime.exec (Required for RootBeer
        
	overideByIndex("java.lang.Runtime","exec",5, function(input) 
	{
        //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        //console.log("input= "+input)
        
        if (cloackedCommands[input]!=null)
		{
            var fakeCommand=cloackedCommands[input];
            console.log(superPrint("java.lang.Runtime.exec[5]","Java API","Process *",true,arguments));
            arguments[0]=fakeCommand
            //console.log("Entered WHICH SU");
            return this["exec"].apply(this,arguments);
		}
		else
		{
			//console.log("Entered ELSE");
            console.log(superPrint("java.lang.Runtime.exec[5]","Java API","Process *",false,arguments));
            return this["exec"].apply(this,arguments);
		}
	});

	 

	function triggerSensor(SensorEventListenerInstance)
	{
		console.log("triggerSensor was called!");
		Java.scheduleOnMainThread(function()
		{
		let sensorEventClass = Java.use("android.hardware.SensorEvent");
		let sensorEventInstance = sensorEventClass.$new(3);
		let sensorEventClassValuesField=sensorEventClass.class.getField('values');

		let sensorEventInstanceValuesField=sensorEventClassValuesField.get(sensorEventInstance);
		let valuesJavaArray = Java.array('float',sensorEventInstanceValuesField);
		
		// set x
		valuesJavaArray[0]=getRandom();
		// set y
		valuesJavaArray[1]=getRandom();
		// set z
		valuesJavaArray[2]=getRandom();

		SensorEventListenerInstance.onSensorChanged(sensorEventInstance);
		});
	}	

	// base overload function for registering a sensor listener (other overloads call this overload)
	overideByOverload("android.hardware.SensorManager","registerListener",['android.hardware.SensorEventListener', 'android.hardware.Sensor', 'int', 'android.os.Handler'], function(...input) 
	{
		console.log("registerListener was called !");	
		let SensorEventListenerInstance = Java.cast(arguments[0], Java.use(arguments[0].$className));
		// Trigger sensor in certain intervals
		setInterval(() => 
		{
		triggerSensor(SensorEventListenerInstance);
		}, sensorTriggerInterval);

		return this.registerListener(...input);
	});



}




/*****************************************************************************/
///////            Main Function          //////////////
/*****************************************************************************/

Java.perform(function() 
{

    monitorDangerousJavaAPIs();
    monitorJavaReflectionMethodInvokes();
    //monitorNativeDangerousMethods();
    CloakEmulator();   
});
