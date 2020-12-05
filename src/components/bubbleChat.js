/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {moderateScale} from 'react-native-size-matters';
import moment from 'moment';

class bubbleChat extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.message,
          this.props.sender !== this.props.selfId
            ? styles.mine
            : styles.not_mine,
        ]}>
        <View
          style={[
            styles.cloud,
            {
              backgroundColor:
                this.props.sender !== this.props.selfId ? '#e8e8e8' : '#5E50A1',
            },
          ]}>
          {this.props.image ? (
            <Image
              style={{
                alignSelf:
                  this.props.sender !== this.props.selfId
                    ? 'flex-start'
                    : 'flex-end',
              }}
              borderRadius={10}
              source={this.props.image}
            />
          ) : null}
          {this.props.text ? (
            <Text
              style={[
                styles.text,
                {
                  color:
                    this.props.sender !== this.props.selfId
                      ? '#000000'
                      : '#ffffff',
                },
              ]}>
              {this.props.text}
            </Text>
          ) : null}
          <View
            style={[
              styles.arrow_container,
              this.props.sender !== this.props.selfId
                ? styles.arrow_left_container
                : styles.arrow_right_container,
            ]}>
            <Svg
              style={
                this.props.sender !== this.props.selfId
                  ? styles.arrow_left
                  : styles.arrow_right
              }
              width={moderateScale(15.5, 0.6)}
              height={moderateScale(17.5, 0.6)}
              viewBox="32.484 17.5 15.515 17.5"
              enable-background="new 32.485 17.5 15.515 17.5">
              <Path
                d={
                  this.props.sender !== this.props.selfId
                    ? 'M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z'
                    : 'M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z'
                }
                fill={
                  this.props.sender !== this.props.selfId
                    ? '#e8e8e8'
                    : '#5E50A1'
                }
                x="0"
                y="0"
              />
            </Svg>
          </View>
          {this.props.sender !== this.props.selfId ? (
            <View style={styles.timeNotSelf}>
              <Text style={styles.txtTimeNotSelf}>
                {moment(this.props.time).format('hh.mm A')}
              </Text>
            </View>
          ) : (
            <View style={styles.timeSelf}>
              {this.props.unread ? (
                <Text style={[styles.txtTimeSelf, styles.read]}>R</Text>
              ) : null}
              <Text style={styles.txtTimeSelf}>
                {moment(this.props.time).format('hh.mm A')}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

export default bubbleChat;

const styles = StyleSheet.create({
  read: {
    marginLeft: 5,
  },
  timeSelf: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
  timeNotSelf: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  txtTimeSelf: {
    fontSize: 11,
    color: 'white',
  },
  txtTimeNotSelf: {
    fontSize: 11,
  },
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(7, 2),
  },
  mine: {
    marginLeft: 20,
  },
  not_mine: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  cloud: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
  },
  text: {
    paddingTop: 3,
    fontSize: 17,
    lineHeight: 22,
  },
  arrow_container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    left: moderateScale(-6, 0.5),
  },
});
