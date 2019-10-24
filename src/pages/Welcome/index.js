import React, { Component } from "react";
import api from "../../services/api";
import PropTypes from "prop-types";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import styles from "./styles";

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    }).isRequired
  };
  state = {
    username: "",
    loading: false,
    error: false
  };

  checkUserExists = async username => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  saveUser = async username => {
    await AsyncStorage.setItem("@githuber:username", username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ loading: true });
    try {
      await this.checkUserExists(username);
      await this.saveUser(username);

      navigation.navigate("User");
    } catch (error) {
      this.setState({ loading: false, error: true });
      console.log("Nao encontrado");
    }
  };

  render() {
    const { username, loading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-Vindo</Text>
        <Text style={styles.text}>
          Para continuar, precisamos que você informe seu usuário do Github.
        </Text>

        {error && <Text style={styles.error}>Usuário não encontrado</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite o seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Prosseguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
