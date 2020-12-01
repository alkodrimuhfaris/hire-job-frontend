import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Profile = () => {
    return (
        <View style={styles.parent}>
            <Text>Profile Screen</Text>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    parent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
