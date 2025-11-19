import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';

const App = () => {
  const [prize, setPrize] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Dados dos prêmios - cada número de 1 a 5 tem um prêmio diferente
  const prizes = {
    1: {
      name: "Fone de Ouvido Bluetooth",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      number: 1
    },
    2: {
      name: "Smartwatch",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      number: 2
    },
    3: {
      name: "Tablet",
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      number: 3
    },
    4: {
      name: "Câmera Digital",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      number: 4
    },
    5: {
      name: "Smartphone",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      number: 5
    }
  };

  const drawPrize = () => {
    setIsAnimating(true);
    setPrize(null);

    let counter = 0;
    const interval = setInterval(() => {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      setPrize(prizes[randomNumber]);
      counter++;

      if (counter > 15) {
        clearInterval(interval);
        const finalPrizeNumber = Math.floor(Math.random() * 5) + 1;
        const finalPrize = prizes[finalPrizeNumber];
        setPrize(finalPrize);
        setIsAnimating(false);

        Alert.alert(
          "Parabéns!",
          `Você ganhou: ${finalPrize.name}`,
          [{ text: "OK" }]
        );
      }
    }, 150);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>App de Sorteio</Text>
      </View>

      <View style={styles.prizeContainer}>
        {prize ? (
          <View style={styles.prizeCard}>
            <Image
              source={{ uri: prize.image }}
              style={styles.prizeImage}
              resizeMode="cover"
            />
            <Text style={styles.prizeName}>{prize.name}</Text>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {isAnimating ? "Playstation, Playstation, playstation..." : "O prêmio que você vai ganhar é"}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.button, isAnimating && styles.buttonDisabled]}
        onPress={drawPrize}
        disabled={isAnimating}
      >
        <Text style={styles.buttonText}>
          {isAnimating ? "Playstation, Playstation..." : "Sortear Prêmio"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  prizeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  prizeCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  prizeImage: {
    width: 200,
    height: 200,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
  prizeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;