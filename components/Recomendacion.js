import React, { Component } from 'react'
import { Text, View, StyleSheet, Modal, FlatList, TouchableOpacity, Image, Alert} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import HeaderApp from './Header'
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';
import { count } from 'firebase/firestore';

export default class RecomendationScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        modalVisible: false,
        idsOfertas:[],
        counter:0,
        oferta:[],
        id_oferta:"",
        nombre:"",
        padecimiento:"",
        edad:"",
        peso:"",
        horario:"",
        dias:"",
        ubicacion:"",
        sueldo:"",
        edad_v:"",
        sueldo_v:"",
        horario_v:"",
        peso_v:"",
    };
  } 
  
  render() {
    const obtenerIds = () => {
      _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
          let answer = JSON.parse(xhttp.responseText);

          console.log(answer);
          _this.setState({idsOfertas:answer});
          _this.setState({counter:0});
        }
      };

      let servidor = "https://enfermeria1b.000webhostapp.com/Admin/idsOfertas.php";
      xhttp.open("GET",servidor,true);
      xhttp.send();
    }

    const cambiarOferta = () =>{
      if (this.state.counter < this.state.idsOfertas.length && this.state.counter >= 0){
        let coun = this.state.counter;
        obtenerOferta(coun);
        coun += 1;
        this.setState({counter:coun});
      }
      else if(this.state.counter > this.state.idsOfertas.length){
        console.error("ATENCION, No hay mas ofertas");
      }
    }

    const obtenerOferta = (coun) =>{
      _this = this;
      console.log(coun)
      const id = this.state.idsOfertas[coun];
      console.log("cambiar oferta: id",id);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
          let answer = JSON.parse(xhttp.responseText);

          console.log(answer);
          _this.setState({oferta:answer});
          if('error' in answer){
            cambiarOferta();
          }
          else{
            cargarValores();
          }
        }
      };
      
      let servidor = "https://enfermeria1b.000webhostapp.com/Admin/obtenerOfertas_1.php?id_enfermero=1&id_oferta="+id.id;
      xhttp.open("GET",servidor,true);
      xhttp.send();
    }
    const cargarValores = () =>{
      const objeto = this.state.oferta[0];
      this.setState({id_oferta:objeto.id});
      this.setState({sueldo: objeto.sueldo});
      this.setState({ubicacion: objeto.ubicacion});
      this.setState({horario: objeto.horario});
      this.setState({dias: objeto.dias});
      this.setState({nombre: objeto.nombre});
      this.setState({padecimiento: objeto.padecimiento});
      this.setState({edad: objeto.edad});
      this.setState({peso: objeto.peso});
      this.setState({edad_v: objeto.edad_v});
      this.setState({sueldo_v: objeto.sueldo_v});
      this.setState({horario_v: objeto.horario_v});
      this.setState({peso_v: objeto.peso_v});
    }
    /* HEADER INFORMATION */
    function Offers(){
      return(
        <View style={styles.offerTitle}>
          <View style={styles.offerTitleLine}></View>
          <Text style={styles.offerTitleTxt}>ELEGIR OFERTAS</Text>
        </View>
      );
    }
    /* BOX INFORMATION */
    function BoxInfo({title,listI,x,y,color_b,color_l}){
      return(
        <View style={[styles.informationBox, {marginLeft:x, marginTop:y, backgroundColor: color_b}]}>
          <Text style={[styles.informationBoxTitle, {color:color_l}]}>{title}</Text>
          <FlatList
            data={listI}
            renderItem={({item}) => (
              <Text style={[styles.informationBoxInfo, {color: color_l}]}>{item}</Text>          
            )}
          />
        </View>
      );
    }
    /* BUTTONS */
    const changeOption = () => {
      this.setState({ modalVisible: false });
      setTimeout(() => {
        this.setState({ modalVisible: true });
      }, 200); // Espera 500 milisegundos (0.5 segundos)
    }
    /* guardar info eleccion */
    const guardarEleccion = () =>{
      console.log("guardar eleccion");
      if(this.state.edad_v){
        _this = this;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if(this.readyState == 4 && this.status == 200){
            let answer = xhttp.responseText;

            console.log(answer);
            if(answer =='error'){
              console.error("No se guardo la eleccion.");
            }
          }
        };
        console.log("id of: ",this.state.id_oferta);
        console.log("edad: ",this.state.edad_v);
        console.log("seuldo: ",this.state.sueldo_v);
        console.log("horario: ",this.state.horario_v);
        console.log("peso: ",this.state.peso_v);
        let servidor = "https://enfermeria1b.000webhostapp.com/Admin/guardarEleccion.php?id_enfermero=1&id_oferta="+this.state.id_oferta+"&edad_v="+this.state.edad_v+"&sueldo_v="+this.state.sueldo_v+"&horario_v="+this.state.horario_v+"&peso_v="+this.state.peso_v;
        xhttp.open("GET",servidor,true);
        xhttp.send();
      }

    } 

    const contactar = () => {
      console.log("contactar");
      guardarEleccion();
      changeOption();
      cambiarOferta();

    }

    const omitir = () => {
      console.log("omitir");
      changeOption();
      cambiarOferta();
    }

    const quitModal = () => {
      this.setState({modalVisible:false});
    }
    
    const putModal = () => {
      this.setState({modalVisible:true});
      obtenerIds();
      cambiarOferta();
    }

    function PutModalButton() {
      return(
        <>
        <TouchableOpacity style={styles.putModalContainer} onPress={putModal}>
          <View style={styles.putModalF}>
            <Text style={styles.putModalTxt}>Ver Ofertas</Text>
          </View>
        </TouchableOpacity>
        </>
      );
    }

    function ReturnButton(){
      return(
        <>
          <TouchableOpacity style={styles.returnContainer} onPress={quitModal}>
            <Image source={require('../images/return.png')} style={styles.returnImage}/>
          </TouchableOpacity>
        </>
      );
    }

    function ButtonsElection(){
      return(
        <View style={styles.buttonsBox}>
          <View style={[styles.buttonBox, {marginLeft: wp('5%')}]}>
            <TouchableOpacity style={styles.buttonTouchable} onPress={contactar}>
              <Text style={styles.buttonTxt}>CONTACTAR</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.buttonBox, {marginLeft: wp('55%'), marginTop: hp('-10%')}]}>
            <TouchableOpacity style={styles.buttonTouchable} onPress={omitir}>
              <Text style={styles.buttonTxt}>OMITIR</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    
    return (
        <View style={styles.container}>
            <HeaderApp/>
            <Offers/>
            <PutModalButton />
            <Modal 
              visible={this.state.modalVisible}
              transparent={true}
              animationType='fade'
              >
                <View style={styles.containerModal}>
                  <ReturnButton/>
                  <BoxInfo title="SUELDO" listI={[this.state.sueldo,"SEMANALES"]} x={wp('2.5%')} y={hp('2%')} color_b={"#003366"} color_l={"#FFFFFF"}/>
                  <BoxInfo title="UBICACION" listI={[this.state.ubicacion]} x={wp('52.5%')} y={hp('-20%')} color_b={"#014386"} color_l={"#FFFFFF"}/>
                  <BoxInfo title="HORARIO" listI={[this.state.dias,this.state.horario]} x={wp('2.5%')} y={hp('2%')} color_b={"#0253A5"} color_l={"#FFFFFF"}/>
                  <BoxInfo title="INFORMACION" listI={["Nombre:",this.state.nombre,"Padecimiento:",this.state.padecimiento,"Edad:",this.state.edad,"Peso:",this.state.peso]} x={wp('52.5%')} y={hp('-20%')} color_b={"#0164C7"} color_l={"#FFFFFF"}/>
                  <ButtonsElection/>
                </View>
            </Modal>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    /* TITILE OFFERS */
    offerTitle:{
        marginTop: hp('5%'),
        backgroundColor: '#FFFFFF',
    },
    offerTitleLine: {
      height: hp('0.5%'),
      width: wp('100%'),
      backgroundColor: '#004AAD',
    },
    offerTitleTxt:{
        color: '#004AAD',
        marginTop: hp('2%'),
        textAlign: 'center',
    },
    /* BOX INFORMATION */
    informationBox:{
        color: "black",
        borderWidth: 2,
        borderColor: '#004AAD',
        borderRadius: 20,
        width: wp('45%'),
        height: hp('20%'),
    },
    informationBoxTitle:{
      fontSize: hp('2%'),
      textAlign: "center",
      fontWeight: 'bold',
    },
    informationBoxInfo:{
      fontSize: hp('2%'),
      textAlign: "center",
      fontWeight: "bold",
    },
    /* MODAL */
    containerModal:{
      marginTop: hp('22%'),
    },
    /* BUTTONS */
    buttonsBox:{
      //borderWidth: 3,
      width: wp('100%'),
      height: hp('10%'),
      marginTop: hp('2%'),
    },
    buttonBox:{
      //borderWidth: wp('0.5%'),
      borderRadius: wp('5%'),
      width: wp('40%'),
      height: hp('10%'),
      backgroundColor: "#DEDFDE",
    },
    buttonTouchable:{
      width: wp('40%'),
      height: hp('10%'),
      justifyContent: "center",
    },
    buttonTxt:{
      color: "#004AAD",
      textAlign: "center",
    },
    /* RETURN IMAGE*/
    returnContainer:{
      width: wp('10%'),
      height: wp('10%'),
      marginTop: hp('-5%'),
      marginLeft: wp('79%'),
      //borderWidth: 3,
    },
    returnImage:{
      width: wp('10%'),
      height: wp('10%'),
      marginTop: hp('-0.5%'),
      marginLeft: wp('-0.5%'),
      tintColor: "#004AAD",
      //borderWidth: 3,
    },
    /* PUT MODAL BUTTON */
    putModalContainer:{
      width: wp('23%'),
      height: hp('5.4%'),
      marginTop: hp('-3.2%'),
      marginLeft: wp('8%'),      
      //borderWidth:3,
    },
    putModalF:{
      width: wp('23%'),
      height: hp('5%'),
      marginLeft: wp('-0.7%'),
      marginTop: hp('-0.3%'),
      backgroundColor: "#004AAD",
      borderRadius: wp('10%'),
      //borderWidth:3,
    },
    putModalTxt:{
      width: wp('19%'),
      height: hp('2.5%'),
      fontSize: hp('1.6%'),
      marginTop: hp('1.2%'),
      marginLeft: wp('3.3%'),
      color: "white",
      fontWeight: 'bold',
      //borderWidth: 3,
    },
  });

