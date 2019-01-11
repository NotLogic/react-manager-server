import React, {Component} from 'react'
import {InputNumber} from 'antd'

function BoilingVerdict(props){
  return props.celsius >=100 ? (<p>水会烧开</p>) : (<p>水不会烧开</p>);
}
const scaleNames = {
  c: '摄氏度',
  f: '华氏度'
}
// 华氏度转摄氏度
function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5 / 9).toFixed(3);
}
// 摄氏度转华氏度
function toFahrenheit(celsius) {
  return ((celsius * 9 / 5) + 32).toFixed(3);
}
class TemperatureInput extends Component {
  constructor (props) {
    super(props)
    this.updateTemperature = this.updateTemperature.bind(this)
  }

  updateTemperature(value){
    this.props.updateTemperature(value)
  }

  render () {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <div>
        <InputNumber value={temperature} defaultValue={0} onChange={this.updateTemperature}></InputNumber>  {scaleNames[scale]}
      </div>
    );
  }
}

class Calculator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 默认摄氏度
      temperature: 0,
      // scale: 'c'
    }
    this.updateCelsius = this.updateCelsius.bind(this)
    this.updateFahrenheit = this.updateFahrenheit.bind(this)
  }

  updateCelsius (value) {
    this.setState({
      // scale: 'c',
      temperature: value
    })
  }

  updateFahrenheit (value) {
    const celsius = toCelsius(value)
    this.setState({
      // scale: 'f',
      temperature: celsius
    })
  }

  render () {
    const temperature = this.state.temperature
    const fahrenheit = toFahrenheit(temperature)
    const updateCelsius = this.updateCelsius
    const updateFahrenheit = this.updateFahrenheit
    return (
      <div>
        <TemperatureInput scale="c" updateTemperature={updateCelsius} temperature={temperature}></TemperatureInput>
        <TemperatureInput scale="f" updateTemperature={updateFahrenheit} temperature={fahrenheit}></TemperatureInput>
        <BoilingVerdict celsius={temperature}></BoilingVerdict>
      </div>
    );
  }
}

export default class Test extends Component {
  // constructor (props) {
  //   super(props)
  // }

  render () {

    return (
      <Calculator></Calculator>
    );
  }
}