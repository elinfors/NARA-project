import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    headlineView:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:20
    },
    headlineTextView:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    headlineText:{
        fontSize:25,
        marginBottom:5
    },
    headlineTextSmall:{
        fontSize:15,
        color:'grey'
    },
    headlineTextLink:{
        fontSize:20,
        borderBottomWidth: 0.5,
        fontStyle:'italic',
        marginTop:5,
        color:'#7ca179'
    },

    cardTitle: {
        color: '#404040',
        fontSize: 20,
    },
    cardTitleDone: {
        color: 'white',
        fontSize: 20,
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
 
    scrollView:{
        width:'100%',
        height:'100%'
    },

    headline: {
        fontSize: 30,
        fontWeight:'bold', 
        color:'white'
    }

})
