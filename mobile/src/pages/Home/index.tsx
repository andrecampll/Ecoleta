import React, { useCallback, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, StyleSheet, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const [uf, setUF] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();

  const handleNavigationToPoints = useCallback(() => {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }, []);


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-backgrounddark.png')}
        style={styles.container}
        resizeMode="cover"
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logodarkalternative.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de colea de forma eficiente</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TextInput style={styles.input}
            placeholder="Selecione a UF"
            value={uf}
            onChangeText={setUF}
            maxLength={2}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          <TextInput style={styles.input}
            placeholder="Selecione a cidade"
            value={city}
            onChangeText={setCity}
            autoCorrect={false}
          />

          <RectButton style={styles.button} onPress={handleNavigationToPoints} >
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>

            <Text style={styles.buttonText} >
              Entrar
            </Text>
          </RectButton>
        </View> 
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#eee',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#ddd',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#333',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    color: '#aaa',
  },

  button: {
    backgroundColor: '#ec135a',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});