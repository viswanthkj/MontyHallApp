import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Switch,
  Button,
  Text,
} from 'react-native';
import {sendData} from './src/function';
import Header from './src/components/Header';
import Loading from './src/components/Loading';

const App = () => {
  const [text, onChangeText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [resultValue, setResultValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onTextChange = value => {
    // code to remove non-numeric characters from text
    onChangeText(value.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = () => {
    console.log(isEnabled, text);
    setLoading(true);
    // eslint-disable-next-line radix
    const numericValue = parseInt(text);
    const data = {
      number: numericValue,
      toSwitch: isEnabled,
    };
    sendData(data)
      .then(res => {
        setLoading(false);
        setResultValue(res.data);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        setErrorMsg('Something wrong!');
      });
  };
  console.log(errorMsg);
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Header />
        <Text style={styles.titleStyle}>Enter the number of simulations</Text>
        <TextInput
          style={styles.input}
          onChangeText={value => onTextChange(value)}
          value={text}
          placeholder="Enter the value"
          keyboardType="numeric"
        />
        <View style={styles.switchContainer}>
          <Text style={styles.titleStyle}>
            Decide to switch the door or not
          </Text>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={text === '' || null}
        />
        <View style={styles.solutionContainer}>
          {loading ? <Loading /> : null}
          {errorMsg ? <Text style={styles.loading}>{errorMsg}</Text> : null}
          {resultValue > -1 ? (
            <View style={styles.resultContainer}>
              <Text style={styles.titleStyle}>The result is : </Text>
              <Text style={styles.resultTitleStyle}>{resultValue}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  titleStyle: {fontSize: 16, color: '#000'},
  switchContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  loading: {fontSize: 16, color: 'red'},
  solutionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  resultTitleStyle: {
    fontSize: 20,
    color: 'blue',
  },
});

export default App;
