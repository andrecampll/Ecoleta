import React, { useCallback, useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { Feather as Icon } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

import api from '../../services/api';

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Point {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

interface Params {
  uf: string;
  city: string;
}

const Points: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const [itens, setItens] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItens, setSelectedItens] = useState<number[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
    
      if (status !== 'granted') {
        Alert.alert('Ooooops...', 'Precisamos da sua permissão para obter a localização');
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      
      const { latitude, longitude } = location.coords;
    
      setInitialPosition([
        latitude,
        longitude,
      ]);
    };

    loadPosition();
  }, []);

  useEffect(() => {
    api.get('itens').then(response => {
      setItens(response.data);
    });
  }, []);

  useEffect(() => {
    api.get('points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        itens: selectedItens,
      },
    }).then(response => {
      setPoints(response.data);
    });
  }, [selectedItens]);

  console.log(points);


  const handleSelectItem = useCallback((id: number) => {
    const alreadySelected = selectedItens.findIndex(item => item === id);

    if (alreadySelected >= 0) {
      const filteredItens = selectedItens.filter(item => item !== id);

      setSelectedItens(filteredItens);
    } else {
      setSelectedItens([...selectedItens, id]);
    }
  }, [selectedItens]);


  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const handleNavigateToDetail = useCallback((id: number) => {
    navigation.navigate('Detail', { pointId: id });
  }, []);

  return (
    <>
      <View style={styles.container} >
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" color="#ec135a" size={24} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem-vindo(a)</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer} >
          { initialPosition[0] !== 0 && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map(point => {
                <Marker
                  key={String(point.id)}
                  style={ styles.mapMarker }
                  onPress={() => handleNavigateToDetail(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                >
                  <View style={styles.mapMarkerContainer} >
                    <Image style={ styles.mapMarkerImage } source={{ uri: point.image }} />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker>
              })}
            </MapView>
          ) }
        </View>
      </View>

      <View style={styles.itemsContainer} >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          { itens.map(item => (
            <TouchableOpacity
              key={String(item.id)}
              style={[
                styles.item,
                selectedItens.includes(item.id) ? styles.selectedItem : {}
              ]}
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={0.6}
            >
              <SvgUri width={42} height={42} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          )) }
        </ScrollView>
      </View>
    </>
  )
}

export default Points;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    color: '#ddd',
  },

  description: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#333',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#ec135a',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
    color: '#ddd',
  },
});