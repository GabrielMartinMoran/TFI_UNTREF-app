import 'package:app/src/configs/pallete.dart';
import 'package:app/src/models/measure.dart';
import 'package:app/src/widgets/charts/gradient_line_chart.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class DeviceCurrentChart extends StatelessWidget {
  final List<Measure> measures;
  final double timeInterval;
  final String? title;
  List<FlSpot>? _spots;
  DeviceCurrentChart(
      {Key? key,
      required this.measures,
      required this.timeInterval,
      this.title})
      : super(key: key) {
    _generateChartData();
  }

  @override
  Widget build(BuildContext context) {
    return GradientLineChart(
      _spots ?? [],
      timeInterval,
      Pallete.currentGradient,
      title: title ?? 'Consumo de corriente',
      unit: 'A',
    );
  }

  void _generateChartData() {
    _spots = [];
    for (var measurement in measures) {
      _spots?.add(FlSpot(measurement.doubleTimestamp, measurement.current));
    }
  }
}
