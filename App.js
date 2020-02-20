/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {StyleSheet} from 'react-native';
import {
  accelerometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Toast,
  Root,
  Col,
  Grid,
} from 'native-base';
var Sound = require('react-native-sound');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      soundFile: '',
    };
  }

  render() {
    const {soundFile} = this.state;
    const whoosh = new Sound('muha_1.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    const whoosh2 = new Sound('muha_2.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    setUpdateIntervalForType(SensorTypes.accelerometer, 1);

    return (
      <Root>
        <Container>
          <Header style={styles.header}>
            <Text style={styles.headerText}>
              Slam the desk and see what happens
            </Text>
          </Header>
          <Grid>
            <Col
              style={{
                backgroundColor: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                style={{
                  margin: 'auto',
                  height: 200,
                  width: 200,
                  alignSelf: 'center',
                  borderRadius: 500,
                }}
                full
                success
                onPress={() => {
                  accelerometer.subscribe(({x, y, z}) => {
                    if (z > 13 && z <= 18) {
                      whoosh.setVolume(0.1);
                      whoosh.play();
                    } else if (z > 18) {
                      whoosh2.setVolume(0.5);
                      whoosh.pause();
                      whoosh2.play();
                    }
                  });
                }}>
                <Text>Start Accelerometer</Text>
              </Button>
            </Col>
          </Grid>
        </Container>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  red: {
    color: 'red',
  },
});
