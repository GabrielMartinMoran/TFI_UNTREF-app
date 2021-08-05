import 'package:app/src/models/device.dart';
import 'package:app/src/models/measure.dart';
import 'package:app/src/providers/app_title_provider.dart';
import 'package:app/src/providers/devices_provider.dart';
import 'package:app/src/widgets/charts/device_current_chart.dart';
import 'package:app/src/widgets/charts/device_power_chart.dart';
import 'package:app/src/widgets/ui/floating_container.dart';
import 'package:app/src/widgets/ui/header.dart';
import 'package:app/src/widgets/ui/time_slider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomeScreen extends StatefulWidget {
  HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Device> devices = [];
  double timeInterval = 30.0;
  double measurementsMaxAge = 120.0;
  late AppTitleProvider _appTitleProvider;

  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback(
        (_) => this._appTitleProvider.appTitle = 'Consumo total');
  }

  @override
  Widget build(BuildContext context) {
    devices = Provider.of<DevicesProvider>(context).devices;
    this._appTitleProvider = Provider.of<AppTitleProvider>(context);
    final filteredMeasures = _getFilteredMeasurementsByAge();
    return ListView(children: [
      Header("Consumo total"),
      FloatingContainer(
        child: Column(
          children: [
            Text('Filtrar por tiempo'),
            TimeSlider(
                onChange: (double value) => setState(() {
                      measurementsMaxAge = value;
                      timeInterval = measurementsMaxAge / 4;
                    })),
          ],
        ),
      ),
      DeviceCurrentChart(
          measures: filteredMeasures, timeInterval: timeInterval),
      DevicePowerChart(
          measurements: filteredMeasures, timeInterval: timeInterval)
    ]);
  }

  List<Measure> _getFilteredMeasurementsByAge() {
    Map<double, Measure> uniqueTimestampMeasurements = {};
    // Evitamos la duplicidad de los measurements que tengan el mismo timestamp
    for (var device in devices) {
      for (var measurement in device.getLasBunchOfTime(measurementsMaxAge)) {
        if (uniqueTimestampMeasurements.containsKey(measurement.timestamp)) {
          uniqueTimestampMeasurements[measurement.timestamp]?.current +=
              measurement.current;
          uniqueTimestampMeasurements[measurement.timestamp]?.power +=
              measurement.power;
        } else {
          uniqueTimestampMeasurements[
                  measurement.datetime.millisecondsSinceEpoch.toDouble()] =
              measurement.clone();
        }
      }
    }
    List<Measure> measurements = uniqueTimestampMeasurements.values.toList();
    measurements.sort((a, b) => a.timestamp.compareTo(b.timestamp));
    return measurements;
  }
}
