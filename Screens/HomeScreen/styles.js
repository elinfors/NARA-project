
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
    cardTitle: {
        color: '#404040',
        fontSize: 20,
    },
    mealCard: {
        backgroundColor: '#ffffff',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        height: 60,
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
        fontWeight:'bold', 
        color:'white'
    }
})
