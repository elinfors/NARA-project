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
        <View style={styles.overview}>
            
                <TouchableOpacity activeOpacity={1} style={{flexDirection:'row', marginTop:'2%'}}
                 onPress={()=> navigation.navigate('Overview Stack')}>
                <Image style={{marginHorizontal:'3%'}}source={require('./arrow-back.png')}></Image>
                <Text style={{color:'#c4c4c4'}}>Back</Text>
                </TouchableOpacity>

            <View style={styles.description}>
                <Text style={styles.headline}>STATISTICS</Text>
                <Text style={styles.descText}>
                    Here you can see your registration-rate, what meals you remember to register and what meals you usually skip
                    The numbers shown are in relation to your planned meals in your meal plan
                </Text>
            </View>

            <View style={styles.tabs}>
                <TouchableOpacity activeOpacity={1} style={styles.regButton} onPress={()=> setActive('REG')}>
                    <Text style={styles.tabText}>REGISTRATIONS</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.eatButton} onPress={()=> setActive('EAT')}>
                    <Text style={styles.tabText}>EATEN MEALS</Text>
                </TouchableOpacity>
            </View>
            {active === 'REG' ? 
            <>
            <View style={styles.regContent}>

                    <PieChart
                    style={{ height: 60, marginLeft:'15%', marginTop:'10%' }}
                    valueAccessor={({ item }) => item.amount}
                    data={regBreakfast}
                    spacing={0}
                    outerRadius={'95%'}
                    innerRadius={1}
                ></PieChart>
                                
                
                <PieChart
                    style={{ height: 60, marginRight:'15%', marginTop:'10%' }}
                    valueAccessor={({ item }) => item.amount}
                    data={regLunch}
                    spacing={0}
                    outerRadius={'95%'}
                    innerRadius={1}
                ></PieChart>

            </View>

            
            </>
            : <View style={styles.eatContent}>
                <Text>Hallå</Text>
                
                </View>}
           


        </View>
       
        </>
    )
}

const styles = StyleSheet.create({
    overview:{
        flex:1,
        flexDirection: 'column', 
        //alignItems:'center', 
    },
    headline:{
        fontSize: 30,
        alignSelf:'center'

    },
    description:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        marginBottom:'5%'
    },
    descText:{
        marginTop:50,
        fontSize:15,
        marginHorizontal:'5%',
        textAlign:'center'
    },
    tabs:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'center',
    },
    tabReg:{
        marginHorizontal:'0%'
    },
    tabEat:{
        marginHorizontal:'0%'
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
        flex:3, 
        flexDirection:'row',
        justifyContent:'flex-start',
        backgroundColor:'white',

    },
    eatContent:{
        flex:3,
        backgroundColor:'#7CA179',

    },







})