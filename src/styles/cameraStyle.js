import {
    StyleSheet,
} from 'react-native';

export const styles = StyleSheet.create({
    bottom: {
        flex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000000'
    },
    informations: {
        fontSize: 14,
        color: '#FFFFFF'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});