import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    label: {
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 5,
    },
    input: {
        height: 30,
        fontSize: 20,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        marginLeft: 20,
        paddingHorizontal: 20,
        width: Dimensions.get('screen').width - 40,
    }
});