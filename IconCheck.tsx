import { StyleSheet, Text, TouchableOpacity, View, Animated, ViewProps } from 'react-native'
import React, { useRef, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
type Props = {
    valueInit: boolean,
    onChange: (e: boolean) => void,
    backgroundColor?: string
    icon?: string
    iconColor?: string
    borderColorInactive?: string
    size?: number
    borderWidth?: number,
    style: ViewProps['style']
}
const IconCheck = React.forwardRef((props: Props, ref) => {
    const {
        valueInit = false,
        onChange,
        icon = "checkmark",
        size = 35,
        backgroundColor = "#0b84e3",
        iconColor = 'white',
        borderColorInactive = "#b4b4b4",
        style
    } = props
    React.useImperativeHandle(ref, () => ({ get: () => value, set: (e) => setValue(e) }))
    const SIZE = size
    const [value, setValue] = useState(valueInit)
    const animateValue = useRef(new Animated.Value(value ? 1 : 0)).current
    const onPresItem = () => {
        if (value) {
            setValue(!value)
            onChange && onChange(!value)
            Animated.spring(animateValue, { toValue: 0, useNativeDriver: false }).start()
        } else {
            setValue(!value)
            onChange && onChange(!value)
            Animated.spring(animateValue, { toValue: 1, useNativeDriver: false }).start()
        }
    }
    const rotate = animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
    });
    const color = animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [borderColorInactive, backgroundColor],
    });
    const translateY = animateValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-SIZE, 0],
    });
    // console.debug('value', value)
    return (
        <TouchableOpacity onPress={onPresItem}  >
            <Animated.View style={[styles.container, { transform: [{ rotate },] }, { borderColor: color, width: SIZE, height: SIZE }, style]} >
                <Animated.View style={[{ transform: [{ translateY }] }, { backgroundColor, width: SIZE, height: SIZE, }]} >
                    <Icon name={icon} size={SIZE * 0.8} color={iconColor} style={{ transform: [{ rotate: '-90deg' }] }} />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    )
})
const areEqual = (prevProps: Props, nextProps: Props) => {
    return prevProps.valueInit === nextProps.valueInit;
};
export default IconCheck// React.memo(IconCheck, areEqual);
const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 3,
    },
})