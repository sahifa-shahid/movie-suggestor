import React, { useState, useRef } from 'react';
import { Text, View, Dimensions, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AlertMeModal from './alertMeModal';

import spiderman from './assets/spiderman.png'
import trailer from './assets/trailer.png'
import MovieModal from './movieModal'


export default function ActivityScreen({ navigation }) {
    const data = [
        {
            title: "SPIDERMAN: INTO THE SPIDER VERSE",
            rank: 1,
        },
        {
            title: "Item 2",
            rank: 2,
        },
        {
            title: "Item 3",
            rank: 3,
        },
        {
            title: "Item 4",
            rank: 4,
        },
        {
            title: "Item 5",
            rank: 5,
        },
    ]

    function renderItem({ item, setModalVisible }) {
        const ITEM_HEIGHT = Math.round(Dimensions.get('window').height * 0.78);
        return (
            <View style={{
                borderRadius: 5,
                height: ITEM_HEIGHT,
                // padding: 50,
                marginLeft: 10,
                marginRight: 10
            }}>
                <ImageBackground source={spiderman} style={{ width: '100%', height: '100%' }}>
                    <BlurView tint="dark" intensity={Platform.OS === 'ios' ? 70 : 160} style={styles.notBlurred}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.rank} >{item.rank}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <MaterialIcons name='more-vert' color='white' size={41} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={trailer} style={{ marginVertical: 30 }} />
                            <AdjustLabel fontSize={40} text={item.title} style={styles.titleText} numberOfLines={3} />
                        </View>
                    </BlurView>
                </ImageBackground>
            </View>

        )
    }

    const AdjustLabel = ({ fontSize, text, style, numberOfLines }) => {
        const [currentFont, setCurrentFont] = useState(fontSize);

        return (
            <Text
                numberOfLines={numberOfLines}
                adjustsFontSizeToFit
                style={[style, { fontSize: currentFont }]}
                onTextLayout={(e) => {
                    const { lines } = e.nativeEvent;
                    if (lines.length > numberOfLines) {
                        setCurrentFont(currentFont - 1);
                    }
                }}>
                {text}
            </Text>
        );
    };

    const [activeIndex, setActiveIndex] = useState(0)
    const carousel = useRef(null);
    const SLIDER_WIDTH = Dimensions.get('window').width;
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.95);
    const [modalVisible, setModalVisible] = useState(false)
    const [alertVisible, setAlertVisible] = useState(true)
    return (
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
            <AlertMeModal alertVisible={alertVisible} setAlertVisible={setAlertVisible} navigation={navigation} />
            <MovieModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Carousel
                        layout={"default"}
                        ref={carousel}
                        data={data}
                        sliderWidth={SLIDER_WIDTH}
                        itemWidth={ITEM_WIDTH}
                        renderItem={({ item }) => renderItem({ item, setModalVisible })}
                        onSnapToItem={index => setActiveIndex(index)} />
                </View>
                <Pagination
                    dotsLength={5}
                    activeDotIndex={activeIndex}
                    containerStyle={styles.paginationContainer}
                    dotColor={'#DD1515'}
                    dotStyle={styles.paginationDot}
                    inactiveDotColor={'white'}
                    inactiveDotOpacity={1}
                    inactiveDotScale={0.6}
                    carouselRef={carousel}
                    tappableDots={!!carousel}
                    animatedDuration={100}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    paginationContainer: {
        paddingVertical: 10,
        marginTop: 20
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 4
    },
    notBlurred: {
        ...StyleSheet.absoluteFill,
        paddingHorizontal: 14,
        paddingVertical: 20
    },
    titleText: {
        fontFamily: 'Raleway-Bold',
        color: 'white',
        // width: '90%'
    },
    rank: {
        fontFamily: 'ReemKufi-Regular',
        color: 'white',
        fontSize: 130,
        paddingVertical: 0,
        height: 137,
        marginTop: -35
    },
})