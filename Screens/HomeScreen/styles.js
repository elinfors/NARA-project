
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    mealTitle: {
        color: 'white',
        fontSize: 20,
    },
    mealCard: {
        backgroundColor: '#ffffff',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    description: {
        textAlign: 'center',
        margin:20,
        fontSize: 20
    },
    dayBanner:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ABDA9B',
        padding:20
    },
    headline: {
        fontSize: 30,
        fontWeight:'bold'
    }
})
