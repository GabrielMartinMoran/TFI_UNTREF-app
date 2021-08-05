import 'package:app/src/utils/date_converter.dart';

class Measure {
  Measure({
    required this.current,
    required this.power,
    required this.timestamp,
    required this.voltage,
  });

  double current;
  double power;
  String timestamp;
  double voltage;

  factory Measure.fromJson(Map<String, dynamic> json) => Measure(
        current: json["current"].toDouble(),
        power: json["power"].toDouble(),
        timestamp: json["timestamp"],
        voltage: json["voltage"].toDouble(),
      );

  DateTime get datetime {
    return DateConverter.fromISOString(this.timestamp);
  }

  double get doubleTimestamp {
    return DateConverter.toTimestamp(this.datetime);
  }

  Measure clone() {
    return new Measure(
        current: current, power: power, timestamp: timestamp, voltage: voltage);
  }
}
