import React, { useState, useContext} from 'react';
import { StyleSheet, View, Button, Text, TouchableOpacity, Image, Switch, ScrollView } from "react-native";
import {firebase} from '../Firebase/config'
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconFeather from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {CurrentUserContext} from '../../App'

export default function OverviewScreen({navigation}) {

    return(
        <View style={styles.overview}>
            <Text style={styles.headline}>CURRENT STREAK</Text>
            <View style={styles.streakRow}>
                <View style={styles.card}>
                <Text>3 DAYS</Text>
                </View>
                <View style={styles.bigCard}>
                <Text>3 DAYS</Text>
                </View>
                <View style={styles.card}>
                <Text>3 DAYS</Text>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.descText}>
                You have registered 3 meals in a row, keep on going!
                </Text>
            </View>
            <View style={styles.sevenDays}>
                <Text style={styles.calText}>
                    Latest 7 days
                </Text>
                <Text style={styles.calText}>
                    Calendar
                </Text>

            </View>
            <View style={styles.calendarSum}>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>
                <View style={styles.circle}>
                    <Text>4</Text>
                </View>

            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity style={styles.buttonCard}>
                    <IconFeather name={'pie-chart'} size={20} color={'gray'} style={styles.buttonItem}></IconFeather>
                    <Text style={styles.buttonItem}>Statistics</Text>
                    <MaterialIcon name={'arrow-forward-ios'} size={20} color={'gray'} style={styles.buttonItem}></MaterialIcon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCard}>
                    <MaterialCommunityIcons name={'page-previous-outline'} size={20} color={'gray'} style={styles.buttonItem}></MaterialCommunityIcons>
                    <Text style={styles.buttonItem}>
                        Previous registrations
                    </Text>
                    <MaterialIcon name={'arrow-forward-ios'} size={20} color={'gray'} style={styles.buttonItem}></MaterialIcon>
                </TouchableOpacity>

            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    overview:{
        flex:1,
        flexDirection: 'column', 
        //alignItems:'center', 
    },
    headline:{
        flex:1,
        padding:30,
        fontSize: 30,
        flexDirection:'row',
        alignSelf:'center'
    },
    streakRow:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    bigCard:{
        backgroundColor: '#ffffff',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        height: 134,
        width:134,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        alignSelf:'flex-end'
        
    },
    card:{
        backgroundColor: '#ffffff',
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        height: 75,
        width:75,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        alignSelf:'flex-end'
        
    },
    description:{
        flex:1.5,
        flexDirection:'row',
        justifyContent:'center'
    },
    descText:{
        marginTop:50,
        fontSize:15,
    },
    calText:{
        //padding:30,
        marginHorizontal:30,
        fontSize:15,
    },
    sevenDays:{
        flex:0.5, 
        flexDirection:'row',
        justifyContent:'space-between',
    },
    calendarSum:{
        flex:0.5,
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:30
    },
    circle:{
        width: 35,
        height: 35,
        borderRadius: 35/2,
        borderWidth:4,
        borderColor:'#ABDA9B',
        //backgroundColor: '#ABDA9B',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonView:{
        flex:3,
        flexDirection:'column',
        alignItems:'center'
    },
    buttonCard:{
        backgroundColor: '#ffffff',
        borderRadius: 5,
        height: 60,
        width:'90%',
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 0.4,
        elevation: 4,
        shadowRadius: 5 ,
        shadowOffset : { width: 1, height: 10},
        marginHorizontal: 10,
        marginTop:50,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    buttonItem:{
        marginHorizontal:10,
    }
})