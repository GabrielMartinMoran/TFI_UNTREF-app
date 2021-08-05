import 'dart:async';

import 'package:app/src/models/device.dart';
import 'package:app/src/services/devices_service.dart';
import 'package:flutter/material.dart';

class DevicesProvider with ChangeNotifier {
  List<Device> _devices = [];
  late DevicesService service;
  late Timer timer;

  DevicesProvider() {
    service = new DevicesService();
    _getUserDevices();
    _setupPeriodicDataGetter();
  }

  List<Device> get devices => _devices;

  set devices(List<Device> value) {
    _devices = value;
    notifyListeners();
  }

  void _setupPeriodicDataGetter() {
    const delay = const Duration(seconds: 20);
    timer = Timer.periodic(delay, (Timer t) => _getUserDevices());
  }

  void _getUserDevices() {
    service.getDevices().then((res) => devices = res).catchError((error) {
      print(
          'Ha ocurrido un error al tratar de obtener los dispositivos del usuario: $error');
    });
  }
}
