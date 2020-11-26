import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    ModalView: {
      backgroundColor: 'white',
      padding: 22,
      //justifyContent: 'center',
      alignItems: 'stretch',
      borderTopRightRadius: 17,
      borderTopLeftRadius: 17,
      height: '90%',
      //flex:1
    },
    modalHeadline:{
      color:'grey',
      fontSize:15
    },
    headlineView:{
      flex: 1,
      flexDirection: 'row',
      justifyContent:'space-between',
      //height:'10%'
    },
    constumContentView:{
      //alignItems:'center',
      flex: 10,
      justifyContent:'center',
      height: '80%',
    },
    contentTitle: {
      fontSize: 20,
      marginBottom: 12,
    },
    contentView: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    nextBtnView:{
      justifyContent:'flex-end',
      alignItems: 'center',
      flex: 1,
      marginBottom:10
    },
    nextBtn:{
      backgroundColor: '#7CA179',
      borderRadius: 5,
      height: 40,
      width:150,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
      marginHorizontal: 10,
    },
    nextBtnTitle:{
      color:'white',
      fontSize:15,
      fontWeight:'600'
    },

    NextbuttonTitle: {
      color: 'white',
      fontSize: 16,
      fontWeight: "bold"
    },

    textStyle:{
    },
    input: {
        height: 48,
        width: 300,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#EFEFEF',
        borderColor: 'grey',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    // STAGE 1 - did you eat..?
    stage1BtnView:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding:20,
        alignContent:'center'
    },
    didEatView:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginTop:120
    },
    buttonStyleDidEat: {
      backgroundColor: '#7CA179',
      borderRadius: 5,
      height: 40,
      width:80,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
      marginHorizontal: 10,
      color: 'white'
  },
  buttonStyleInactiveDidEat: {
      backgroundColor: 'white',
      borderRadius: 5,
      height: 40,
      width:80,
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      elevation: 6,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
      marginHorizontal: 10
    },
  buttonTitleDidEat:{color:'white'},
  buttonTitleInactiveDidEat:{color:'#000000'},

    // STAGE 2 - add food
    addFoodView:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'flex-start'
    },
    scrollView:{
        width: '100%',
        //height:'100%',
        marginBottom:'20%'

    },
    foodInput:{
        height: 40,
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#EFEFEF',
        borderColor: 'grey',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 16,
        marginBottom:10
        
    },
    listView:{
        flex:1,
        flexDirection:'column',
    },
    listViewItem:{
        flex:1,
        flexDirection:'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical:10
    },
    listIcons:{
        marginHorizontal:5,
    },

    // STAGE 3 - WHAT DID YOU FEEL....
    section:{
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        padding:10,
        width: '100%',
        flex:1,
        paddingVertical:15
    },
    sectionHeadline:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
        paddingBottom:5
    },
    sectionContent:{
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
       // width:'100%'
        
    },
    buttonStyle: {
      backgroundColor: '#7CA179',
      borderRadius: 5,
      height: 40,
      width:'auto',
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
      marginHorizontal: 5,
      paddingHorizontal:10,
      flexWrap:'wrap',
      textAlign:'center',
      flex:1,
      alignContent:'center'
  },
  buttonStyleInactive: {
      backgroundColor: 'white',
      borderRadius: 5,
      height: 40,
      width:'auto',
      alignItems: "center",
      justifyContent: 'center',
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOpacity: 0.8,
      shadowRadius: 15 ,
      shadowOffset : { width: 1, height: 13},
      marginHorizontal: 5,
      paddingHorizontal:10,
      flexWrap:'wrap',
      textAlign:'center',
      flex:1,
      alignContent:'center'
    },
  buttonTitle:{
    color:'white',
    textAlign:'center',
    fontSize:12

  },
  buttonTitleInactive:{
    color:'#000000',
    textAlign:'center',
    fontSize:12

  },
    /*
    buttonStyle3:{
        height: 50,
        backgroundColor: '#FFFFFF',
        shadowRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width:0, height:2},
        borderColor: 'grey',
        borderWidth: 1,
        padding:5,
        borderRadius: 20
    },
    buttonStyle3Active:{
        height: 50,
        backgroundColor: '#7CA179',
        shadowRadius: 10,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: {width:0, height:2},
        borderColor: 'grey',
        borderWidth: 1,
        padding:5,
        borderRadius: 20
    }
    */
   //STAGE 4 - add comment
   inputComment: {
    height: 150,
    width: 300,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#EFEFEF',
    borderColor: 'grey',
    padding:20,
    marginTop:15,
    paddingTop:20
  },
  commentView:{
    justifyContent:'center',
    alignItems:'center'
  },

  // STAGE 5 - submit
  submitView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
    
  });