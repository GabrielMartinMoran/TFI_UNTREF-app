import 'dart:async';

import 'package:app/src/models/device.dart';
import 'package:app/src/models/measure.dart';
import 'package:app/src/providers/app_title_provider.dart';
import 'package:app/src/providers/devices_provider.dart';
import 'package:app/src/services/devices_service.dart';
import 'package:app/src/utils/date_converter.dart';
import 'package:app/src/widgets/charts/device_current_chart.dart';
import 'package:app/src/widgets/charts/device_power_chart.dart';
import 'package:app/src/widgets/ui/header.dart';
import 'package:app/src/widgets/ui/time_slider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ViewDeviceScreen extends StatefulWidget {
  final String deviceBleId;
  ViewDeviceScreen({Key? key, required this.deviceBleId}) : super(key: key);

  @override
  _ViewDeviceScreenState createState() => _ViewDeviceScreenState();
}

class _ViewDeviceScreenState extends State<ViewDeviceScreen> {
  double timeInterval = 30.0;
  double measurementsMaxAge = 60.0;
  late Timer measuresTimer;
  late AppTitleProvider _appTitleProvider;
  late Device _device;

  List<Measure> _measures = [
    new Measure(
        current: 0,
        power: 0,
        timestamp: DateTime.now().toIso8601String(),
        voltage: 0)
  ];
  final DevicesService _devicesService = new DevicesService();

  void initState() {
    super.initState();
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      this._appTitleProvider.appTitle = this._device.name;
      this._getMeasures(context);
      this.measuresTimer = Timer.periodic(
          const Duration(seconds: 1), (Timer t) => this._getMeasures(context));
    });
  }

  @protected
  @mustCallSuper
  void dispose() {
    this.measuresTimer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    this._appTitleProvider = Provider.of<AppTitleProvider>(context);
    this._device = _getDevice(context);
    return ListView(children: [
      Header(this._device.id),
      TimeSlider(
          onChange: (double value) => setState(() {
                measurementsMaxAge = value;
                this._getMeasures(context);
              })),
      DeviceCurrentChart(
          measures:
              this._measures, //device.getLasBunchOfTime(measurementsMaxAge),
          timeInterval: timeInterval),
      DevicePowerChart(
          measurements:
              this._measures, //device.getLasBunchOfTime(measurementsMaxAge),
          timeInterval: timeInterval)
    ]);
  }

  Device _getDevice(BuildContext context) {
    final devicesProvider = Provider.of<DevicesProvider>(context);
    return devicesProvider.devices
        .firstWhere((x) => x.id == widget.deviceBleId);
  }

  void _calculateTimeInterval() {
    final screenWidth = MediaQuery.of(context).size.width;
    double scaleFactor = 50.0;
    // TODO: Refactorizar con algun escalador global
    if (screenWidth < 1000) scaleFactor = 200.0;
    timeInterval = measurementsMaxAge.toDouble() * scaleFactor; // / 4;
    print('Time interval: $timeInterval');
  }

  void _getMeasures(BuildContext context) {
    this
        ._devicesService
        .getMeasures(widget.deviceBleId, measurementsMaxAge ~/ 60.0)
        .then((measures) {
      setState(() {
        this._measures = measures;
        this._calculateTimeInterval();
        print('Measures obtenidas: ${this._measures.length}');
      });
    }).catchError((error) =>
            print('Ha ocurrido un error al obtener las measures: $error'));
  }
}
