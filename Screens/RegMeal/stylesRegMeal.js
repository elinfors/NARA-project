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
        alignItems:'center',
        marginBottom:5
        //height:'10%'
      },
      constumContentView:{
        //alignItems:'center',
        flex: 10,
        justifyContent:'center',
        height: '80%',
      },
      regMealView:{
        flex:5,
        flexDirection: 'column',
        justifyContent:'flex-start'
      },
      scrollView:{
        width: '100%',
        //height:'100%',
        marginBottom:'20%'
    },
      nextBtnView:{
        justifyContent:'flex-end',
        alignItems: 'center',
        flex: 0.01,
        marginBottom:10,
        marginTop:7
      },
      nextBtn:{
        backgroundColor: '#7CA179',
        borderRadius: 5,
        height: 40,
        width:170,
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
        fontWeight:'400'
      },

      listHeadlineView:{
        flex:1,
        flexDirection:'row'
      },

      listView:{
        flex:1,
        flexDirection:'column',
        height: 'auto'
    },
    listViewItem:{
        flex:1,
        flexDirection:'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: '100%',
        paddingVertical:10,
        height: 'auto'
    },

    questionView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical:15
    },
    questionHeadline:{
        fontSize: 16,
        fontWeight: '400',
        alignContent:'center',
        justifyContent:'center'
    },
    questionText:{
        //borderWidth: 1,
        //borderColor: '#EFEFEF',
        //paddingHorizontal: 12,
        //paddingVertical: 5,
        //borderRadius: 10,
        fontStyle: 'italic'
    },
    commentText:{
        //backgroundColor:'#EFEFEF',
        padding: 15,
        borderRadius: 10,
        color: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        borderColor: '#EFEFEF'
    }
    })