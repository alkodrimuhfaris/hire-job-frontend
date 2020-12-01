import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Search = () => {
    return (
        <View style={styles.parent}>
            <Text>Search Screen</Text>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    parent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
