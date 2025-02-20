import React, { useState, useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error obteniendo los datos: ', error);
      });
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}
