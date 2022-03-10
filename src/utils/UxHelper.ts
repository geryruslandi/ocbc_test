import { Alert, Platform, ToastAndroid } from "react-native";


class UxHelper {
    showToast(message: string) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.LONG)
        } else {
            Alert.alert(message);
        }
    }
}

export default new UxHelper();
