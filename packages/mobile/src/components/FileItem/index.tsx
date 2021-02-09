import { MaterialIcons } from '@expo/vector-icons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { File } from '../../types';
import styles from './styles';

export default function FileItem({ item }: { item: File }) {
  const distanceToNow = useMemo(
    () => formatDistanceToNow(parseISO(item.createdAt)),
    [item.createdAt]
  );

  const openFile = async (file) => {
    //   try {
    //     const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;
    //     await RNFS.downloadFile({
    //       fromUrl: file.url,
    //       toFile: filePath
    //     })
    //     await FileViewer.open(filePath);
    //   } catch (err) {
    //     console.log('File not supported.');
    //     console.log(err)
    //   }
  };

  return (
    <TouchableOpacity onPress={openFile} style={styles.container}>
      <View style={styles.info}>
        <MaterialIcons name="insert-drive-file" size={24} color="#a5cfff" />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.date}>Updated {distanceToNow} ago</Text>
    </TouchableOpacity>
  );
}
