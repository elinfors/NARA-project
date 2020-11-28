import React, { useState, useContext, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, Button,Rect, ScrollView} from "react-native";
import { ProgressCircle } from 'react-native-svg-charts'
import { PieChart } from 'react-native-svg-charts'

export default function Statistics({navigation}) {

    const [regActive, setRegActive] = useState(true)
    const [eatActive, setEatActive] = useState(false)
    const [active, setActive] = useState('REG')
    const regBreakfast = [{
            key: 1,
            amount: 80,
            svg: { fill: '#ABDA9B' },
        },
        {
            key: 2,
            amount: 20,
            svg: { fill: '#E5E5E5' }
        }
    ]
    const regLunch = [{
        key: 1,
        amount: 92,
        svg: { fill: '#ABDA9B' },
    },
    {
        key: 2,
        amount: 8,
        svg: { fill: '#E5E5E5' }
    }
    ]
    const regDinner = [{
        key: 1,
        amount: 78,
        svg: { fill: '#ABDA9B' },
    },
    {
        key: 2,
        amount: 22,
        svg: { fill: '#E5E5E5' }
    }
    ]
    const regSnack = [{
        key: 1,
        amount: 46,
        svg: { fill: '#ABDA9B' },
    },
    {
        key: 2,
        amount: 54,
        svg: { fill: '#E5E5E5' }
    }
    ]

    const onPressReg = (state) =>{
        setActive(state)
        
    }
    const onPressEat = () =>{
        setEatActive(!eatActive)
    }
    const onPressActive = (state) =>{
        setActive(state)
    }

    return(
        <>
            
                <TouchableOpacity activeOpacity={1} style={{flexDirection:'row', marginTop:'2%'}}
                 onPress={()=> navigation.navigate('Overview Stack')}>
                <Image style={{marginHorizontal:'3%'}}source={require('./arrow-back.png')}></Image>
                <Text style={{color:'#c4c4c4'}}>Back</Text>
                </TouchableOpacity>
            
            <View style={{flex:1}}>

            <ScrollView style={styles.scrollview}>

            <View style={styles.overview}> 

            <View style={styles.description}>
                <Text style={styles.headline}>STATISTICS</Text>
                <Text style={styles.descText}>
                    Here you can see your registration-rate, what meals you remember to register and what meals you usually skip.
                    The numbers shown are in relation to your planned meals in your meal plan
                </Text>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity activeOpacity={1} style={styles.regButton} onPress={()=> setActive('REG')}>
                    <Text style={styles.tabText}>REGISTRATIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.eatButton} onPress={()=> setActive('EAT')}>
                    <Text style={{color:'white'}}>EATEN MEALS</Text>
                </TouchableOpacity>
            </View>
            {active === 'REG' ? 
            <View style={{flex:3, flexDirection:'column', backgroundColor:'white'}}>
                <View style={styles.weekmonth1}>
                    <Text style={{fontsize:20,fontWeight:'bold', textDecorationLine: 'underline'}}>
                        WEEK
                    </Text>
                    <Text style={{fontsize:20,fontWeight:'bold'}}>
                        MONTH
                    </Text>
                </View>
            <View style={styles.regContent}>

                <View style={styles.circleRow}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                                <Text style={{fontSize:20}}>Breakfast</Text>
                                <Text>80%</Text>
                        </View>
                        <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./C1.png')}></Image>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                            <Text style={{fontSize:20}}>Dinner</Text>
                            <Text>78%</Text>
                        </View>
                    <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./C2.png')}></Image>
                    </View>
                </View>
                <View style={styles.circleRow}>
                <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                                <Text style={{fontSize:20}}>Lunch</Text>
                                <Text>92%</Text>
                        </View>
                        <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./C3.png')}></Image>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                            <Text style={{fontSize:20}}>Snack</Text>
                            <Text>46%</Text>
                        </View>
                    <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./C4.png')}></Image>
                    </View>
                </View>
               
            </View>
            <View style={styles.regText}>
                    <Text style={{textAlign:'center'}}>
                    Good job with your registration, but your snack rate is a bit low, 
                    you might need to edit your meal plan, talk with your clinican if you have any questions!
                    </Text>
                </View>

            
            </View>
            : 
            <View style={{flex:3, flexDirection:'column', backgroundColor:'white'}}>
                 <View style={styles.weekmonth}>
                    <Text style={{color:'white', fontsize:20,fontWeight:'bold', textDecorationLine: 'underline'}}>
                        WEEK
                    </Text>
                    <Text style={{color:'white', fontsize:20,fontWeight:'bold'}}>
                        MONTH
                    </Text>
                </View>
            <View style={styles.eatContent}>

                <View style={styles.circleRow}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                                <Text style={{color:'white', fontSize:20}}>Breakfast</Text>
                                <Text style={{color:'white'}}>62%</Text>
                        </View>
                        <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./B1.png')}></Image>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                            <Text style={{color:'white', fontSize:20}}>Dinner</Text>
                            <Text style={{color:'white'}}>67%</Text>
                        </View>
                    <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./B3.png')}></Image>
                    </View>
                </View>
                <View style={styles.circleRow}>
                <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                                <Text style={{color:'white', fontSize:20}}>Lunch</Text>
                                <Text style={{color:'white'}}>85%</Text>
                        </View>
                        <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./B2.png')}></Image>
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flexDirection:'column', justifyContent:'space-between'}}>
                            <Text style={{color:'white', fontSize:20}}>Snack</Text>
                            <Text style={{color:'white'}}>42%</Text>
                        </View>
                    <Image style={{marginVertical:'12%', height:100, width:100}} source={require('./B4.png')}></Image>
                    </View>
                </View>
               
            </View>
            <View style={styles.regText2}>
                    <Text style={{textAlign:'center', color:'white'}}>
                    Good job with your eaten meals, but both your dinner rate and your snack rate is a bit low, 
                    maybe you need to discuss with your clinicians on how you can increase your rates on eaten meals. 
                    </Text>
                </View>

            
            </View>
                }
           
                </View>

            </ScrollView>
        </View>
       
        </>
    )
}

const styles = StyleSheet.create({
    overview:{
        flex:1,
        flexDirection:'column',
        height:'100%'
    },

    scrollview:{
        flex:1,
        height:'100%',
        width:'100%',

    },
    headline:{
        fontSize: 25,
        alignSelf:'center'

    },
    description:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        marginBottom:'5%'
    },
    descText:{
        marginTop:'2%',
        fontSize:15,
        marginHorizontal:'5%',
        textAlign:'center'
    },
    tabs:{
        height:'10%',
        flexDirection:'row',
        justifyContent:'center',
    },
    tabReg:{
        marginHorizontal:'0%'
    },
    tabEat:{
        marginHorizontal:'0%',
        color:'white'
    },
    regButton:{
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        width:'50%',
    },
    eatButton:{
        flexDirection:'row',
        backgroundColor:'#7CA179',
        alignItems:'center',
        justifyContent:'center',
        width:'50%',
    },
    regContent:{ 
        paddingVertical:'11%',
        flex:3,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'white',

    },
    circleRow:{
        marginTop:'0%',
        justifyContent:'center'

    },
    regText:{
        flex:1,
        paddingHorizontal:'10%',
        paddingBottom:'15%',
        justifyContent:'center',
        backgroundColor:'white'

    },
    regText2:{
        flex:1,
        paddingHorizontal:'10%',
        paddingBottom:'15%',
        justifyContent:'center',
        backgroundColor:'#7CA179',

    },
    eatContent:{
        paddingVertical:'11%',
        flex:3,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor:'#7CA179',

    },
    weekmonth:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:'5%',
        backgroundColor:'#7ca179'
    },
    weekmonth1:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        paddingTop:'5%',
        backgroundColor:'white'
    }







})