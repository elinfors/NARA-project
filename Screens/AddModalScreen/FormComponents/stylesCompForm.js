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

      // active and inactive buttons 
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

    // STAGE 1 - how did you compensate?
    stage1BtnView:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding:20,
        alignContent:'center',
        marginBottom:5
    },
    typeView:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        marginTop:120
    },
    
    // STAGE 2 - WHAT DID YOU FEEL....
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