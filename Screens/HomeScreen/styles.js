
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
    cardTitleDone: {
        color: 'white',
        fontSize: 20,
    },
    mealCard: {
        backgroundColor: '#ffffff',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
    },
    mealCardDone: {
        backgroundColor: '#7ca179',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        
    },
    mealCardComp: {
        backgroundColor: '#404040',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        height: 50,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center',
        
    },
    description: {
        textAlign: 'center',
        margin:10,
        fontSize: 15,
        color: '#000000'
    },
    headlineBackground:{
        backgroundColor:'#7ca179'

    },
    scrollView:{
        width:'100%',
        height:'100%'
    },
    sectionCard:{
        width:'70%'
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
