class DateConverter {
  static DateTime fromTimestamp(double timestamp) =>
      DateTime.fromMillisecondsSinceEpoch(timestamp.toInt());

  static double toTimestamp(DateTime dateTime) =>
      dateTime.millisecondsSinceEpoch.toDouble();

  static DateTime fromISOString(String date) => DateTime.parse(date);
}
