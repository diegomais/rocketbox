import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDistance, parseISO } from 'date-fns';
import { documentDirectory, downloadAsync } from 'expo-file-system';
import { launchImageLibraryAsync } from 'expo-image-picker';
import { shareAsync } from 'expo-sharing';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as storage from '../../constants/storage';
import api from '../../services/api';
import socket from '../../services/socket';
import { BoxType, FileType } from '../../types';
import styles from './styles';

export const BoxScreen = () => {
  const [box, setBox] = useState({} as BoxType);

  useEffect(() => {
    AsyncStorage.getItem(storage.BOX_KEY).then((boxId) => {
      api.get(`boxes/${boxId}`).then(({ data }) => {
        setBox(data);
      });

      socket.connect();
      socket.emit('connectRoom', boxId);
      socket.on('file', (data) => {
        setBox((prevState) => ({
          ...prevState,
          files: [data, ...prevState.files],
        }));
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const renderItem = ({ item }: { item: FileType }) => (
    <TouchableOpacity onPress={() => openFile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <MaterialIcons name="insert-drive-file" size={24} color="#a5cfff" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        Updated {formatDistance(parseISO(item.createdAt), new Date())} ago
      </Text>
    </TouchableOpacity>
  );

  const openFile = useCallback(async (file: FileType) => {
    try {
      const { uri } = await downloadAsync(
        file.url,
        documentDirectory + file.title
      );

      await shareAsync(uri);
    } catch (err) {
      console.log('File not supported.');
      console.log(err);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    const result = await launchImageLibraryAsync();

    if (!result.cancelled) {
      const filename = result.uri.split('/').pop();
      const [prefix, suffix] = filename.split('.');
      const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

      const formData = new FormData();

      formData.append('file', {
        uri: result.uri,
        type: result.type,
        name: `${prefix}.${ext}`,
      });

      api.post(`boxes/${box._id}/files`, formData);
    }
  }, [box]);

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{box.title}</Text>
      <FlatList
        style={styles.list}
        data={box.files}
        keyExtractor={(file) => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />
      <TouchableOpacity style={styles.fab} onPress={handleUpload}>
        <MaterialIcons name="cloud-upload" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};
