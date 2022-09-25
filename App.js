import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  
  //state
  const[weight,setWeight] = useState()
  const[height,setHeight] = useState()
  const[bmi,setBmi] = useState('')
  const[msg,setMsg] = useState('')
  const[ansMsg,setAnsMsg] = useState('')
  const[isEnabled,setIsEnabled] = useState(false)
  const[text,setText] = useState('SI')
  const[weiUnit,setWeiUnit] = useState('kg')
  const[heiUnit,setHeiUnit] = useState('cm')

  const toggleSwitch = () => {
    if(isEnabled){
      setText('SI')
      setWeiUnit('kg')
      setHeiUnit('cm')
    }else{
      setText('Imperial')
      setWeiUnit('lbs')
      setHeiUnit('inches')
    }

    setIsEnabled(previousState => !previousState)
  }

  const calcBmi = () => {
    if(isNaN(weight) || isNaN(height)){
      alert("Weight/Height must be a number")
    }
    else if(weight == 0 || height == 0){
      setMsg("Your weight and height can't be zero!!!")
    }
    else{
      let h1 = height / 100
      let bmi
      if(text == 'SI'){
        bmi = weight/(h1 * h1);}
      else{
        bmi = (weight / (height * height)) * 703
      }

      setBmi(bmi.toFixed(2))
      setAnsMsg('Your bmi is ')

      if(bmi < 18.5) {
        setMsg('You are Underweight')
      }
      else if (bmi >= 18.5 && bmi < 25) {
        setMsg('You are of Normal Weight')
      }
      else if (bmi >= 18.5 && bmi < 25) {
        setMsg('You are Overweight')
      }
      else{
        setMsg('You are Obese')
      }
    }

    setWeight()
    setHeight()

  }

  return (

    <View style={styles.container}>

      <Text style={styles.header}>BMI Calculator</Text>

      <View style={styles.switch}>
        <Text style={styles.text1}>{text}</Text>
        <Switch
        trackColor={{false: 'grey',true:'tomato'}}
        thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        >

        </Switch>
      </View>


      <Text style={styles.textView}>Weight</Text>
      <Text style={styles.unit}>({weiUnit})</Text>
      <TextInput value={weight} style={styles.edit} onChangeText={weight => setWeight(weight)} />

      <Text style={styles.textView}>Height</Text>
      <Text style={styles.unit}>({heiUnit})</Text>
      <TextInput value={height} style={styles.edit} onChangeText={height => setHeight(height)} />

      <View style={styles.btn}>
        <Button title="Compute" onPress={calcBmi}></Button>      
      </View>


      <Text style={styles.textView}>{ansMsg}{bmi}</Text>
      <Text style={styles.textView}>{msg}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent: 'center'
  },

  header:{
    fontSize: "32",
    color: "teal",
    marginLeft: 10,
    marginBottom: 40,

  },

  edit:{
    borderWidth: 0.5,
    borderColor: 'black',
    width: '80%',
    marginLeft:20,
    marginBottom:15
  },

  textView: {
    fontSize: 20,
    color: 'teal',
    alignItems: "baseline",
    marginLeft20
  },

  btn: {
    marginTop:5,
    alignItems:'center',
  },

  switch:{
    alignItems:'flex-end',
    marginRight:10,
    marginBottom:15
  },

  text1:{
    fontSize:12,
    marginRight:7
  },

  unit:{
    marginLeft:20,
    marginBottom:15
  }

  
});

