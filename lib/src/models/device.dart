import 'package:app/src/models/measure.dart';

class Device {
  String id;
  List<Measure> measures;
  String name;
  bool active;
  bool turnedOn;

  Device({
    required this.id,
    required this.measures,
    required this.name,
    required this.active,
    required this.turnedOn,
  });

  factory Device.fromJson(Map<String, dynamic> json) => Device(
        id: json["id"],
        measures: List<Measure>.from(
            json["measures"].map((x) => Measure.fromJson(x))),
        name: json["name"],
        active: json["active"],
        turnedOn: json["turned_on"],
      );

  List<Measure> getLasBunchOfTime(double lastSeconds) {
    final filtered = measures
        .where((x) =>
            DateTime.now().difference(x.datetime).inSeconds <= lastSeconds)
        .toList();
    return filtered;
  }
}
