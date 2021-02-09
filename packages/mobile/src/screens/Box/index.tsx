import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import socket from 'socket.io-client';
// import ImagePicker from 'react-native-image-picker';
// import RNFS from 'react-native-fs';
// import FileViewer from 'react-native-file-viewer';
import { MaterialIcons } from '@expo/vector-icons';
import { formatDistanceToNow, parseISO } from 'date-fns';
import api from '../../services/api';
import { Box, File } from '../../types';
import styles from './styles';

type Params = {
  boxId: string;
};

export default function BoxScreen() {
  const { params } = useRoute();
  const { boxId } = params as Params;
  const [box, setBox] = useState<Box | null>(null);

  useEffect(() => {
    api.get<Box>(`boxes/${boxId}`).then(({ data }) => {
      setBox(data);
    });
  }, [boxId]);

  // async componentDidMount() {
  //   this.subscribeToNewFiles(box);
  // };

  // const subscribeToNewFiles = box => {
  //   const io = socket('https://rocket-box.herokuapp.com');

  //   io.emit('connectRoom', box);

  //   io.on('file', data => {
  //     this.setState({
  //       box: { ...this.state.box, files: [data, ...this.state.box.files] }
  //     });
  //   });
  // };

  const renderItem = ({ item }: { item: File }) => (
    <TouchableOpacity onPress={() => openFile(item)} style={styles.file}>
      <View style={styles.fileInfo}>
        <MaterialIcons name="insert-drive-file" size={24} color="#a5cfff" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        Updated {formatDistanceToNow(parseISO(item.createdAt))} ago
      </Text>
    </TouchableOpacity>
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

  const handleUpload = () => {
    // ImagePicker.launchImageLibrary({}, async upload => {
    //   if (upload.error) {
    //     console.log('ImagePicker error');
    //   } else if (upload.didCancel) {
    //     console.log('Canceled by user');
    //   } else {
    //     const data = new FormData();
    //     const [prefix, suffix] = upload.fileName.split('.');
    //     const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;
    //     data.append('file', {
    //       uri: upload.uri,
    //       type: upload.type,
    //       name: `${prefix}.${ext}`
    //     });
    //     api.post(`boxes/${this.state.box._id}/files`, data);
    //   }
    // });
  };

  if (!box)
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#7159c1" size="large" />
      </View>
    );

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
}
