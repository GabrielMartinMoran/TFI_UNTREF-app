import 'package:app/src/models/device.dart';
import 'package:app/src/models/measure.dart';
import 'package:app/src/services/base_service.dart';
import 'dart:convert';

class DevicesService extends BaseService {
  Future<List<Device>> getDevices() async {
    final response = await get('/devices/get_all', authRequired: true);
    return _devicesFromJson(response.body);
  }

  Future<List<Measure>> getMeasures(String deviceId, int timeInterval) async {
    final response = await get(
        '/devices/get_measures/${deviceId}/${timeInterval}',
        authRequired: true);
    return _measuresFromJson(response.body);
  }

  List<Device> _devicesFromJson(String str) =>
      List<Device>.from(json.decode(str).map((x) => Device.fromJson(x)));

  List<Measure> _measuresFromJson(String str) =>
      List<Measure>.from(json.decode(str).map((x) => Measure.fromJson(x)));
}
