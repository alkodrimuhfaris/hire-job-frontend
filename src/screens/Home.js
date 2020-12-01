import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Home = () => {
    return (
        <View style={styles.parent}>
            <Text>Home Screen</Text>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    parent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
