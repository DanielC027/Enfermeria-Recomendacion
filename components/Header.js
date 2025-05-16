import React from "react";
import { StyleSheet, View, Text} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function HeaderApp(){
    return(
        <View style={styles.headerTitle}>
            <Text style={styles.headerTxt}>ENFERMERIA PARA TODOS</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    /*
    HEADER TITILE
    */
    headerTitle: {
        height: hp('10%'), // 70% of height device screen
        width: wp('100%'),   // 80% of width device screen
        backgroundColor: '#DEDFDE',
      },
      headerTxt: {
        marginTop: hp('3%'), 
        fontSize: hp('3%'), // End result looks like the provided UI mockup
        textAlign: 'center',
        color: '#004AAD',
      },
});

export default HeaderApp;