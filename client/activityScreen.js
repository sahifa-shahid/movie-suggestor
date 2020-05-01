import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Dimensions, SafeAreaView, StyleSheet, ImageBackground, Image, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import AlertMeModal from './alertMeModal';

import spiderman from './assets/spiderman.png'
import trailer from './assets/trailer.png'
import MovieModal from './movieModal'

import {Video} from 'expo-av';


export default function ActivityScreen({ navigation, route }) {
    const [datafromapi, changeData] = useState()
    const [currentItem, setCurrentItem] = useState()

    useEffect(() => {
        async function getMoviesFromApi() {
            try {
                let response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=bd7527de69fe3480678236d07c155147&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=2019-11-01&release_date.lte=2020-04-28');
                let responseJson = await response.json();
                let trendingList = responseJson.results.slice(0, 5)
                changeData(trendingList)
                setCurrentItem(trendingList[0])
            } catch (error) {
                console.error(error);
            }
        }
        getMoviesFromApi()
    }, [])

    function renderItem({ item, index }) {
        const ITEM_HEIGHT = Math.round(Dimensions.get('window').height * 0.78);
        return (
            <View style={{
                borderRadius: 5,
                height: ITEM_HEIGHT,
                // padding: 50,
                marginLeft: 10,
                marginRight: 10
            }}>
                <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }} style={{ width: '100%', height: '100%' }}>
                    <BlurView tint="dark" intensity={Platform.OS === 'ios' ? 70 : 160} style={styles.notBlurred}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.rank} >{index + 1}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <MaterialIcons name='more-vert' color='white' size={41} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            {/* <Image source={trailer} style={{ marginVertical: 30 }} /> */}
                            <Video
                                source={{ uri: 'https://skyfire.vimeocdn.com/1588369094-0xd676a8c4ab637a6a16f2b79bfebac02864bd87bc/240781008/sep/video/862730389,862730388,862730359,862730358/master.m3u8' }}
                                rate={1.0}
                                volume={1.0}
                                isMuted={false}
                                shouldPlay={true}
                                isLooping={true}
                                resizeMode="cover"
                                style={{ width: 328, height: 200, marginVertical: 30 }}
                            />

                            <AdjustLabel fontSize={40} text={item.title} style={styles.titleText} numberOfLines={3} />
                        </View>
                    </BlurView>
                </ImageBackground>
            </View >
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
    const [alertVisible, setAlertVisible] = useState(!route.params.recentlyActivated)
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <LinearGradient colors={["rgba(0,0,0,0.98)", "#4e4e4e", "rgba(0,0,0,0.98)"]} style={styles.background}>
            {/* <AlertMeModal alertVisible={alertVisible} setAlertVisible={setAlertVisible} navigation={navigation} /> */}
            {datafromapi === undefined || currentItem === undefined ? <Text>Loading</Text> :
                <SafeAreaView>
                    <MovieModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={currentItem} />
                    {/* {console.log(datafromapi)} */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Carousel
                            layout={"default"}
                            ref={carousel}
                            data={datafromapi}
                            sliderWidth={SLIDER_WIDTH}
                            itemWidth={ITEM_WIDTH}
                            renderItem={({ item, index }) => renderItem({ item, index, setModalVisible })}
                            onSnapToItem={index => { setActiveIndex(index); setCurrentItem(datafromapi[index]) }} />
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
                        animatedDuration={50} />
                </SafeAreaView>
            }
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
        textTransform: 'uppercase'
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