import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Text} from 'native-base';
import {API_URL} from '@env';

import Avatar from '../assets/img/profile.png';

export default function HomeCardRecruiter({item}) {
  return (
    <View style={styles.card}>
      <Image
        source={item.photo ? {uri: `${API_URL}${item.photo}`} : Avatar}
        style={styles.avatar}
      />
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
        {item.name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.position}>
        {item.jobTitle}
      </Text>
      {item.SkillAmount > 0 && (
        <View style={styles.skillList}>
          {item.WorkerSkills.slice(0, 3).map((skill) => {
            return (
              <View style={styles.skill} key={skill.id}>
                <Text style={styles.skillText}>{skill.Skill.name}</Text>
              </View>
            );
          })}
          {item.SkillAmount > 3 && (
            <Text style={styles.skillMore}>{item.SkillAmount - 3}+</Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    width: 160,
    height: 220,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 14,
    lineHeight: 19,
    color: '#1F2A36',
    fontWeight: '600',
  },
  position: {
    color: '#9EA0A5',
    fontSize: 12,
    fontWeight: '400',
  },
  avatar: {
    marginBottom: 12,
    resizeMode: 'cover',
    width: 72,
    height: 72,
    borderRadius: 8,
  },
  skill: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    backgroundColor: '#FBB017',
    borderRadius: 4,
    marginHorizontal: 2,
  },
  skillText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '600',
  },
  skillList: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 39,
  },
  skillMore: {
    fontSize: 10,
    color: '#9EA0A5',
    fontWeight: '400',
    marginHorizontal: 2,
  },
});
