import React, {useRef, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import {colors} from '../../constants/colors';
import {styles} from './styles';

const Bar = ({data = [], formatLabel = label => label}) => {
  const scrollview = useRef();
  const isScrolling = useRef(false);

  const Yaxis = data.map(i => Math.floor(i));

  const onUpdate = () => {
    //block autoscrolling when user scrolling so user can look into older metrics
    if (!isScrolling.current) {
      scrollview.current.scrollToEnd({animated: true});
    }
  };

  const onScrollBegin = () => {
    isScrolling.current = true;
  };

  const onScrollEnd = () => {
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  useEffect(() => {
    onUpdate();
  }, [data]);

  return (
    <View style={styles.container}>
      <YAxis
        data={Yaxis}
        contentInset={{top: 0, bottom: 10, left: 10, right: 0}}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        formatLabel={formatLabel}
      />
      <ScrollView
        ref={scrollview}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        onScrollBeginDrag={onScrollBegin}
        onScrollEndDrag={onScrollEnd}
        contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.chartContainer, {width: data.length * 30}]}>
          <BarChart
            style={[styles.barStyle, {width: data.length * 30}]}
            data={data}
            svg={{fill: colors.main}}
            contentInset={{top: 0, left: 4, right: 0}}>
            <Grid />
          </BarChart>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(Bar);
