import { StyleSheet, TouchableOpacity, Animated, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const IconCheck = React.forwardRef((props, ref) => {
    const {
        valueInit = false,
        onChange,
        icon = "checkmark",
        size = 35,
        backgroundColor = "#0b84e3",
        iconColor = 'white',
        borderColorInactive = "#b4b4b4",
        style,
        title
    } = props;

    // useImperativeHandle để định nghĩa các phương thức tùy chỉnh khi sử dụng `ref`
    React.useImperativeHandle(ref, () => ({
        get: () => value,
        set: (e) => setValue(e),
    }));

    const SIZE = size;
    const [value, setValue] = useState(valueInit);
    const animateValue = useRef(new Animated.Value(value ? 1 : 0)).current;

    // Hàm xử lý khi nhấn vào icon
    const onPresItem = () => {
        const newValue = !value;
        setValue(newValue);
        onChange && onChange(newValue);

        Animated.spring(animateValue, {
            toValue: newValue ? 1 : 0,
            useNativeDriver: false,
        }).start();
    };

    // Các giá trị chuyển động của rotate, color, và translateY
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

    return (

        <TouchableOpacity onPress={onPresItem}>
            <Animated.View
                style={[
                    styles.checkbox,
                    { transform: [{ rotate }] },
                    { borderColor: color, width: SIZE, height: SIZE },
                    style
                ]}
            >
                <Animated.View
                    style={[
                        { transform: [{ translateY }] },
                        { backgroundColor, width: SIZE, height: SIZE }
                    ]}
                >
                    <Icon
                        name={icon}
                        size={SIZE * 0.8}
                        color={iconColor}
                        style={{ transform: [{ rotate: '-90deg' }] }}
                    />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>

    );
});

// Hàm `areEqual` để tối ưu hóa hiệu suất render
const areEqual = (prevProps, nextProps) => {
    return prevProps.valueInit === nextProps.valueInit;
};

// Tùy chọn thêm `React.memo` nếu cần tối ưu hóa
React.memo(IconCheck, areEqual);

export default function ButtonCheck({ title }) {
    return (
        <View style={styles.body}>
            <IconCheck size={30} style={styles.iconcheck} />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}
const styles = StyleSheet.create({

    checkbox: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        // marginBottom: 10,
    },
    body: {
        flexDirection: 'row', // Sắp xếp theo chiều ngang
        alignItems: 'center', // Căn giữa theo chiều dọc
        // marginHorizontal: 10,
        // marginTop: 10,
        // justifyContent: "space-between"
    },

    iconcheck: {
        //   left: 10,
        margin: 5,

    }
});
