import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function Test() {
    return (
        <View>
            <Text>
	      Hello World. My first Android App. I am amazed and very happy because now I can launch apps from anywhere. 
	    </Text>
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
