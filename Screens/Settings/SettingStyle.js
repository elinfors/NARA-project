import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    button: {
        backgroundColor: '#7CA179',
        borderRadius: 5,
        height: 45,
        width:200,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 15 ,
        shadowOffset : { width: 1, height: 13},
        marginHorizontal: 10,
        alignSelf: 'center',
        marginTop:20
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})