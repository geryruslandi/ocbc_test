import React, { useState } from 'react';
import { Text, View } from 'react-native';


export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <Text>Test</Text>
        </View>
    );
}
