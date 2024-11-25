import React, {Component} from 'react';
import {SafeAreaView, View, Text, TextInput, FlatList} from 'react-native'
import {db} from '../firebase/Config';

 class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
          usuarios: [],
          filtrado: [],
          buscado: '',
        };
      }
     
     
      componentDidMount() {
        db.collection('users').onSnapshot((docs) => {
          const users = [];
          docs.forEach((doc) => {
            users.push({
              data: doc.data(),
            });
          });
          this.setState({
            usuarios: users,
            filtrado: users,
          });
        });
      }
     
     
      handleSearch = (text) => {
        this.setState({
          buscado: text,
          filtrado: this.state.usuarios.filter((user) =>
            user.data.user?.toLowerCase().includes(text.toLowerCase())
          ),
        });
      };
     
     
      render() {
        return (
           
          <SafeAreaView >
            <Text >Usuarios de la plataforma</Text>
            <TextInput
              
              placeholder="Buscar por nombre de usuario"
              value={this.state.buscado}
              onChangeText={this.handleSearch}
            />
     
     
            {this.state.filtrado.length === 0 ? (
              <Text >No se encontraron usuarios</Text>
            ) : (
              <FlatList
                data={this.state.filtrado}
               
                renderItem={({ item }) => (
                  <View >
                    <Text >{item.data.user}</Text>
                    <Text >{item.data.mail}</Text>
                  </View>
                )}
                
              />
            )}
          </SafeAreaView>
        );
      }
     }
export default Users     