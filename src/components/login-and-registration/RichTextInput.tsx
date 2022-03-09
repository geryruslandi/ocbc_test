import { View, StyleSheet, TextStyle, StyleProp } from 'react-native'
import React from 'react'
import { Text, TextInput } from 'react-native-paper';

export default function RichTextInput(props: Props) {

    const style = (props.style || {}) as object
    const error = props.error || '';

    return (
        <View style={style}>
            <TextInput
                label={props.placeholder}
                value={props.value}
                onChangeText={props.onChange}
                secureTextEntry={!!props.secureTextEntry}
                selectionColor="#EF393B"
                theme={{ colors: { primary: '#EF393B' } }}
                style={styles.input} />
            { error != '' &&
                <Text style={styles.errorText}>{error}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 5 },
        shadowOpacity: 0.2,
        elevation: 1,
        backgroundColor: 'white',
    },
    errorText: {
        fontFamily: 'Ubuntu-Medium',
        color: 'red'
    }
});

type Props = {
    value: string,
    secureTextEntry?: boolean,
    error?: string,
    placeholder: string,
    style?: StyleProp<TextStyle>,
    onChange: ((text: string) => void)
}
