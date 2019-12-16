import React, { Component } from 'react';
import { FlatList, Text, Alert, Button, TextInput, View, StyleSheet, Linking, Image, SafeAreaView,ToolbarAndroid, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Constants from 'expo-constants';
import { Icon } from 'react-native-elements'

const remote = 'https://i.pinimg.com/originals/c1/0e/a6/c10ea6f8e1ae5f6aee2e6fe8df255677.png';
const remoteAutumn = 'https://mobilehd.blob.core.windows.net/main/2017/03/november-autumn-season-yellow-leaves-fall-leaf-tree-design-maple.jpg'

function Item({ uri }) {
  console.log("Apelat, inside function");
  return (
    <View style={styles.item}>
      <Image style={styles.imageItem} source={{ uri: uri }} />
    </View>
  );
 }

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    // Alert.alert('Credentials', `${username} + ${password}`);
	
	// var params = {
	// 	client_id: 'digix',
	// 	username: this.state.username,
	// 	password: this.state.password,
	// 	grant_type: 'password'
	// };
	
	// var formBody = [];
	// for (var property in params) {
	//   var encodedKey = encodeURIComponent(property);
	//   var encodedValue = encodeURIComponent(params[property]);
	//   formBody.push(encodedKey + "=" + encodedValue);
	// }
	// formBody = formBody.join("&");
  
  var bodyPayload = {
    "firstName": "",
	  "lastName": "",
	  "username": this.state.username,
	  "email": "",
	  "password": this.state.password,
	  "familyMembersIds": null,
	  "friendsIds": null
  }

    fetch("http://192.168.100.61:8180/users/login", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyPayload)
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      if(responseJson.access_token)
        this.props.navigation.navigate('Details');
    }).catch(function(error){
      console.log('error: ' + error);
    });
  }

  render() {
    const resizeMode = 'stretch'; //contain
    return (
      <View style={styles.container}>
        <Image
            style={{
              flex: 1,
              resizeMode,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            source={{ uri: remoteAutumn }}
          />
        <Text style={{color: 'white', fontSize: 60, top: -150}}>
          DiGiX
        </Text>
        
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />

        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.loginBtn}
          onPress={this.onLogin.bind(this)}
        />

        <Text style={{color: 'blue', top: 30}}
              onPress={() => this.props.navigation.navigate('Register')}>
          Don't have an account? Register here
        </Text>
      </View>
    );
  }
}

export class DetailsScreen extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password } = this.state;
  }

  render() {

    console.log("before DATA");

    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        uri:
          'http://localhost:8580/kogaion-bootstrap/img/vintage-car.jpeg',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        uri:
          'https://3.bp.blogspot.com/-n6NP-2wtQYA/XH6BxFUAhwI/AAAAAAAAJBE/QA65yqpUbvM-tqpdboBC5Zhor8bSUvU3wCHMYCw/s1600/summer-wallpaper-hd-free-download.jpg',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        uri:
          'http://quotesideas.com/wp-content/uploads/2015/05/Summer-sunset-02-Galaxy-Note-3-Wallpapers.jpg',
      },
     ]; 

      return (
        <SafeAreaView style={styles.containerDetails}>
          <Text style={styles.title}>Box: Greece 2018</Text>
          <FlatList
            data={DATA}
            renderItem={({ item }) => <Item uri={item.uri} />}
            keyExtractor={item => item.id}
          />
          <View style={{ height: 50 }}>
            <Icon
              name='plus'
              type='evilicon'
              color='#517fa4'
              size={40}
            />
          </View>
        </SafeAreaView>
      );
  }
}

export class RegisterScreen extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }

  onLogin() {
    const { username, password, firstName, lastName, email } = this.state;

    // Alert.alert('Credentials', `${username} + ${password}`);
	
	// var params = {
	// 	client_id: 'digix',
	// 	username: this.state.username,
	// 	password: this.state.password,
	// 	grant_type: 'password'
	// };
	
	// var formBody = [];
	// for (var property in params) {
	//   var encodedKey = encodeURIComponent(property);
	//   var encodedValue = encodeURIComponent(params[property]);
	//   formBody.push(encodedKey + "=" + encodedValue);
	// }
	// formBody = formBody.join("&");
  
  var bodyPayload = {
    "firstName": this.state.firstName,
	  "lastName": this.state.lastName,
	  "username": this.state.username,
	  "email": this.state.email,
	  "password": this.state.password,
	  "familyMembersIds": null,
	  "friendsIds": null
  }

    fetch("http://192.168.100.61:8180/users", {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyPayload)
    }).then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      console.log(responseJson.status);
      if(responseJson.message=="created")
        this.props.navigation.navigate('Home');
    }).catch(function(error){
      console.log('error: ' + error);
    });
  }

  render() {
    const resizeMode = 'stretch';
    return (
      <View style={styles.container}>
        <Image
            style={{
              flex: 1,
              resizeMode,
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
            }}
            source={{ uri: remoteAutumn }}
          />
        <Text style={{color: 'white', fontSize: 60, top: -150}}>
          DiGiX
        </Text>
        
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />

        <TextInput
          value={this.state.firstName}
          onChangeText={(firstName) => this.setState({ firstName })}
          placeholder={'First name'}
          style={styles.input}
        />

        <TextInput
          value={this.state.lastName}
          onChangeText={(lastName) => this.setState({ lastName })}
          placeholder={'Last name'}
          style={styles.input}
        />
        
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />

        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Register'}
          style={styles.loginBtn}
          onPress={this.onLogin.bind(this)}
        />
        </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: LoginScreen,
    Details: DetailsScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
  loginBtn: {
    width: 500,
    height: 144,
    padding: 10,
    borderWidth: 0,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
  },
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    marginHorizontal: 16,
  },
  imageItem: {
    aspectRatio: 1,
    flex: 1,
    width: undefined,
    height: undefined,
  },
  containerDetails: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
 
  }
});
