import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";
import api from "../../services/api";
import OrganizationItem from "./OrganizationItem";

const TabIcon = ({ tintColor }) => (
  <Icon name="building" size={20} color={tintColor} />
);

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};

class Organizations extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon
  };
  state = {
    data: [],
    loading: true,
    refreshing: false
  };

  async componentDidMount() {
    this.loadOrganization();
  }

  loadOrganization = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem("@githuber:username");
    const { data } = await api.get(`/users/${username}/orgs`);

    this.setState({ data, loading: false, refreshing: false });
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;

    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganization}
        refreshing={refreshing}
      />
    );
  };
  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderList()
        )}
      </View>
    );
  }
}

export default Organizations;
