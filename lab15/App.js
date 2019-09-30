import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: "X",
      arr: [["", "", ""], ["", "", ""], ["", "", ""]],
      result: "",
      step: 0
    }
  }
  evaluatePosition(position) {
    for (let i = 0; i < position.length; i++) {
      if (position[i][0] === position[i][1] &&
        position[i][1] === position[i][2] &&
        position[i][0] !== "") {
        return position[i][0];
      }
      if (position[0][i] === position[1][i] &&
        position[1][i] === position[2][i] &&
        position[0][i] !== "") {
        return position[0][i];
      }

    }
    if (position[0][0] === position[1][1] &&
      position[1][1] === position[2][2] &&
      position[0][0] !== "") {
      return position[0][0];
    }
    if (position[0][2] === position[1][1] &&
      position[1][1] === position[2][0] &&
      position[0][2] !== "") {
      return position[0][2];
    }
    return "";
  }

  onClick(i, j) {
    if (!this.state.result) {
      let arr = this.state.arr;
      if (!arr[i][j]) {
        arr[i][j] = this.state.current;
        let step = ++this.state.step;
        let result = this.evaluatePosition(arr);
        this.setState({
          current: this.state.current === "X" ? "O" : "X",
          result: result,
          arr: arr,
          step: step
        })
      }
    }
  }
  reload() {
    this.setState({
      arr: [["", "", ""], ["", "", ""], ["", "", ""]],
      result: "",
      step: 0
    })
  }

  render() {
    let buttons = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        buttons.push(
          <TouchableOpacity activeOpacity={1}
            key={"" + i + j}
            onPress={() => this.onClick(i, j)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {this.state.arr[i][j]}
            </Text>
          </TouchableOpacity>
        );
      }
    }
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Tic Tac Toe</Text>
        <View style={styles.buttons}>
          {buttons}
        </View>
        <Text style={styles.currentPlayer}>{"current payer: " + this.state.current}</Text>
        {this.state.result ? <Text style={styles.winner}>{"Winner player: " + this.state.result + "!!!"}</Text> : null}
        {this.state.step === 9 || this.state.result ? <Button onPress={() => this.reload()} title="Reload"></Button> : null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    color: 'white',
    fontSize: 30,
    padding: 10,
    backgroundColor: 'orange',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 300,
    width: 300,
    marginTop: 60,
    marginLeft: 'auto',
    marginRight: 'auto'

  },
  button: {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 40
  },
  currentPlayer: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20
  },
  winner: {
    fontSize: 40,
    textAlign: 'center'
  }

});
