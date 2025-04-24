import { StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import React, { useState } from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const Calculator = () => {
    const [darkMode, setDarkMode] = useState(false);

    const bgLeft = darkMode ? '#2c2c2c' : '#f2f2f2';
    const colorNumber = darkMode ? '#f5f5f5' : '#222';
    const colorIcon = darkMode ? '#ddd' : '#444';
    const bgColorResult = darkMode ? '#121212' : '#fff';
    const bgRight = darkMode ? '#1f1f1f' : '#e6e6e6';
    const textRight = darkMode ? '#eee' : '#333';
    const numberBtnBg = darkMode ? '#333' : '#e0e0e0';
    const operatorBtnBg = darkMode ? '#ff8c00' : '#ff9500';

    const [lastNumber, setLastNumber] = useState('');
    const [currentNumber, setCurrentNumber] = useState('');

    const tinh = () => {
        let lastChar = currentNumber[currentNumber.length - 1];
        if (["+","-","*","/",":"].includes(lastChar)) {
            setCurrentNumber(currentNumber);
        } else {
            let result = eval(currentNumber).toString();
            setCurrentNumber(result);
        }
    }

    const handleInput = (press) => {
        Vibration.vibrate(35);
        switch (press) {
            case "+": case "-": case "*": case "/":
                setCurrentNumber(currentNumber + press);
                break;
            case "DEL":
                setCurrentNumber(currentNumber.slice(0, -1));
                break;
            case "C":
                setCurrentNumber("");
                setLastNumber("");
                break;
            case "=":
                setLastNumber(currentNumber + "=");
                tinh();
                break;
            default:
                setCurrentNumber(currentNumber + press);
                break;
        }
    }

    const buttonLeft = [
        ["C", "DEL"],
        [7, 8, 9],
        [4, 5, 6],
        [1, 2, 3],
        ["00", 0, "."],
    ];
    const buttonRight = ["/", "*", "-", "+", "="];

    return (
        <View style={[styles.container, { backgroundColor: darkMode ? '#121212' : '#fff' }]}>
            <View style={{ ...styles.header, backgroundColor: bgColorResult }}>
                <View style={styles.darkModeButton}>
                    <TouchableOpacity
                        style={[styles.darkButton, { backgroundColor: colorIcon }]}
                        onPress={() => setDarkMode(!darkMode)}
                    >
                        <Entypo name={darkMode ? "light-up" : "moon"} size={30} color="red" />
                    </TouchableOpacity>
                </View>

                <View style={styles.resultBox}>
                    <Text style={{ fontSize: 30, color: darkMode ? '#ccc' : '#555', textAlign: 'right' }}>
                        {lastNumber}
                    </Text>
                    <Text style={{ fontSize: 48, color: darkMode ? '#fff' : '#000', textAlign: 'right' }}>
                        {currentNumber}
                    </Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={[styles.leftContent, { backgroundColor: bgLeft }]}>
                    {buttonLeft.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.row}>
                            {row.map((item, colIndex) => (
                                <TouchableOpacity
                                    key={`btn-${rowIndex}-${colIndex}`}
                                    style={[styles.btnInput, { backgroundColor: numberBtnBg }]}
                                    onPress={() => handleInput(item)}
                                >
                                    <Text style={{ color: colorNumber, fontSize: 24 }}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>

                <View style={[styles.rightContent, { backgroundColor: bgRight }]}>
                    {buttonRight.map((item, index) => (
                        <TouchableOpacity
                            key={`op-${index}`}
                            style={[styles.btnInputRight, { backgroundColor: operatorBtnBg }]}
                            onPress={() => handleInput(item)}
                        >
                            <Text style={{ color: '#fff', fontSize: 24 }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default Calculator

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: '40%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
    },
    resultBox: {
        width: '100%',
        paddingHorizontal: 20,
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    leftContent: {
        width: '70%',
        paddingTop: 20,
        padding: 10,
        justifyContent: 'space-evenly',
    },
    rightContent: {
        width: '30%',
        padding: 10,
        justifyContent: 'space-evenly',
    },
    darkModeButton: {
        position: 'absolute',
        top: 20,
        right: 30,
        width: 40,
        height: 40,
    },
    darkButton: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 50,
    },
    btnInput: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    btnInputRight: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        paddingVertical: 15,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});
