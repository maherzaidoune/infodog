import React, { useRef, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart, Grid, YAxis } from 'react-native-svg-charts';
import { colors } from '../../constants/colors';
import { styles } from './styles';

/**
 * Generic Bar chart component
 * @module
 */
const Bar = ({ data = [], formatLabel = (label) => label }) => {
  const scrollview = useRef();
  const isScrolling = useRef(false);

  const Yaxis = data.map((i) => Math.floor(i));

  /** @callback
 * @name onUpdate
 * autoscroll to last visible bar on new data rendred
 * */
  const onUpdate = () => {
    // block autoscrolling when user scrolling so user can look into older metrics
    if (!isScrolling.current) {
      scrollview.current.scrollToEnd({ animated: true });
    }
  };

  /** @callback
 * @name onScrollBegin
 * Block autoscrolling if user is manually scrolling
 * */
  const onScrollBegin = () => {
    isScrolling.current = true;
  };

  /** @callback
 * @name onScrollEnd
 * enable autoscrolling again, wait for 1000ms before enabling autoscroll again
 * */
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
        contentInset={{
          top: 10, bottom: 10, left: 10, right: 0,
        }}
        svg={{
          fill: 'grey',
          fontSize: 10,
        }}
        formatLabel={formatLabel}
      />
      <ScrollView
        ref={scrollview}
        horizontal
        showsHorizontalScrollIndicator
        onScrollBeginDrag={onScrollBegin}
        onScrollEndDrag={onScrollEnd}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.chartContainer, { width: data.length * 30 }]}>
          <BarChart
            style={[styles.barStyle, { width: data.length * 30 }]}
            data={data}
            svg={{ fill: colors.main }}
            contentInset={{ top: 10, left: 4, right: 0 }}
          >
            <Grid />
          </BarChart>
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(Bar);
